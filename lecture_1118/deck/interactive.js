/* Interactive slides of the lecture deck (10.11.2026). Public data only, no internet needed.
   Each widget: WIDGETS.<name>(container) builds its own controls. Mouse / touch only: the arrow keys and Space stay with the deck. */
(function () {
  const C = { tp: "#FC8B3C", fp: "#FFE14D", fn: "#FC6255", ok: "#83C167", bad: "#FC6255", ink: "#ece9e1", dim: "#8d929a", blue: "#58C4DD", line: "#262b36" };
  const dec = b64 => Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const h = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); Object.assign(e, attrs); if (html) e.innerHTML = html; return e; };
  const css = `
  .tw{display:flex;gap:40px;align-items:center;width:100%;height:100%}
  .tw canvas{background:#000;border-radius:10px;image-rendering:pixelated;cursor:crosshair;max-height:640px}
  .tw .side{flex:1;min-width:0;display:flex;flex-direction:column;gap:18px;font-size:28px}
  .tw .big{font-family:"Source Serif 4",Georgia,serif;font-size:56px;font-variant-numeric:tabular-nums}
  .tw .row{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
  .tw button{font:inherit;font-size:24px;background:#141821;color:${C.ink};border:2px solid ${C.line};border-radius:10px;padding:8px 16px;cursor:pointer}
  .tw button.on{border-color:${C.blue};background:#1b2733}
  .tw input[type=range]{width:100%;height:34px;accent-color:${C.fp}}
  .tw .dim{color:${C.dim};font-size:22px}
  .tw table{border-collapse:collapse;font-size:22px}.tw td{padding:4px 10px;border-bottom:1px solid ${C.line}}
  .tw .two{display:flex;gap:36px}.tw .two table{flex:1}
  .tw ol.steps{margin:0;padding-left:1.3em;font-size:25px;line-height:1.4;display:flex;flex-direction:column;gap:8px}
  .tw ol.steps li::marker{color:${C.blue};font-weight:600}
  .tw.col{flex-direction:column;justify-content:center;gap:14px}
  .tw .cards{display:flex;gap:24px}
  .tw .card{flex:1;min-width:0;background:#141821;border:2px solid ${C.line};border-radius:14px;padding:20px 24px;display:flex;flex-direction:column;gap:14px}
  .tw .card .t{font-size:26px;color:${C.dim}}.tw .card .big{font-size:104px;line-height:1;margin-left:10px}
  .tw .bar{display:flex;height:34px;border-radius:8px;overflow:hidden;background:#0b0d12}.tw .bar i{display:block;height:100%;transition:width .35s}
  .tw .card .f{font-size:23px;color:${C.dim};font-variant-numeric:tabular-nums}
  .tw .key span{display:inline-block;width:18px;height:18px;border-radius:4px;margin:0 6px 0 14px;vertical-align:-2px}`;
  document.head.appendChild(h("style", {}, css));
  const blurAfter = el => el.addEventListener("pointerup", () => setTimeout(() => el.blur(), 0));   // keys go back to the deck
  /* A browser may drop the picture of a canvas while the deck waits in a background tab (the canvas is then black).
     So: every widget is built again when its slide is entered, all pictures are drawn again when the deck comes back,
     and a canvas that has lost its drawing context is replaced by a fresh one. Key R rebuilds the widget by hand. */
  const LIVE = new Map(); let NOW = null;                       // widget box -> { name, items: [{ cv, draw }], stop: [] }
  const keep = (cv, draw) => { NOW.items.push({ cv, draw }); cv.addEventListener("contextrestored", draw); };
  const onLeave = f => NOW.stop.push(f);
  const build = (name, box, shown) => {
    const old = LIVE.get(box); if (old) old.stop.forEach(f => { try { f(); } catch (e) {} });
    box.textContent = ""; NOW = { name, items: [], stop: [], shown: !!shown }; LIVE.set(box, NOW);
    try { W[name](box, !!shown); } catch (e) { box.textContent = "widget error: " + e.message; }
  };
  const lost = cv => { try { const x = cv.getContext("2d"); return !x || (x.isContextLost && x.isContextLost()); } catch (e) { return true; } };
  const again = () => LIVE.forEach((w, box) => { if (!box.isConnected) return;
    if (w.items.some(i => lost(i.cv))) build(w.name, box, w.shown); else w.items.forEach(i => { try { i.draw(); } catch (e) {} }); });
  window.BUILD_WIDGET = build; window.REDRAW_WIDGETS = again;
  document.addEventListener("visibilitychange", () => { if (!document.hidden) again(); });
  window.addEventListener("focus", again); window.addEventListener("pageshow", again);
  const legend = items => `<div class="key dim">${items.map(([c, t]) => `<span style="background:${c}"></span>${t}`).join("")}</div>`;

  const W = window.WIDGETS = {};

  /* ---------- 1. cut-off slider on the real BIANCA probability map ---------- */
  W.cutoff = box => {
    const D = TRY.cutoff, n = D.w * D.h, F = dec(D.flair), P = dec(D.prob), G = dec(D.gt), K = dec(D.keep);
    const cv = h("canvas", { width: D.w, height: D.h }); cv.style.height = "620px"; const x = cv.getContext("2d"), img = x.createImageData(D.w, D.h);
    const side = h("div", { className: "side" });
    side.innerHTML = `<div>cut-off <b class="big" id="ct">0.50</b></div><input type="range" min="5" max="99" value="50">
      <div>Dice vs expert <b class="big" id="cd">–</b></div><div class="dim" id="cn"></div>
      <div class="row"><button class="on" id="cg">expert outline</button></div>
      ${legend([[C.fp, "program mask (prob ≥ cut-off)"], [C.fn, "expert outline"]])}<div class="dim">${D.source}</div>`;
    const sl = side.querySelector("input"); blurAfter(sl); let outline = true;
    const edge = new Uint8Array(n);
    for (let y = 0; y < D.h; y++) for (let i = 0; i < D.w; i++) { const p = y * D.w + i; if (!G[p]) continue;
      if (i == 0 || y == 0 || i == D.w - 1 || y == D.h - 1 || !G[p - 1] || !G[p + 1] || !G[p - D.w] || !G[p + D.w]) edge[p] = 1; }
    function draw() {
      const t = sl.value / 100, tb = Math.round(t * 255); let tp = 0, fp = 0, fn = 0, m = 0;
      for (let p = 0; p < n; p++) {
        const seg = K[p] && P[p] >= tb, g = G[p], v = F[p], q = p * 4;
        if (seg) { m++; if (g) tp++; else fp++; } else if (g) fn++;
        let r = v, gg = v, b = v;
        if (seg) { r = .35 * v + .65 * 255; gg = .35 * v + .65 * 225; b = .35 * v + .65 * 77; }
        if (outline && edge[p]) { r = 252; gg = 98; b = 85; }
        img.data[q] = r; img.data[q + 1] = gg; img.data[q + 2] = b; img.data[q + 3] = 255;
      }
      x.putImageData(img, 0, 0);
      side.querySelector("#ct").textContent = t.toFixed(2);
      const d = 2 * tp + fp + fn ? 2 * tp / (2 * tp + fp + fn) : 1; side.querySelector("#cd").textContent = d.toFixed(2);
      side.querySelector("#cd").style.color = d >= .8 ? C.ok : d >= .6 ? C.fp : C.bad;
      side.querySelector("#cn").textContent = `${m} voxels marked · TP ${tp} · FP ${fp} · FN ${fn}`;
    }
    sl.oninput = draw; side.querySelector("#cg").onclick = e => { outline = !outline; e.target.classList.toggle("on", outline); draw(); };
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); draw(); keep(cv, draw);
  };

  /* ---------- 2. QC scroller: SynthSeg labels on a public stroke scan ---------- */
  W.qc = box => {
    const D = TRY.qc, n = D.w * D.h, T1 = D.t1.map(dec), SG = D.seg.map(dec), LE = D.lesion.map(dec);
    const cv = h("canvas", { width: D.w, height: D.h }); cv.style.height = "620px"; const x = cv.getContext("2d"), img = x.createImageData(D.w, D.h);
    const rows = Object.entries(D.qc).map(([k, v]) => `<tr><td>${k}</td><td style="color:${v >= .65 ? C.ok : C.bad}">${v.toFixed(2)} ${v >= .65 ? "✓" : "✗"}</td></tr>`);
    const half = Math.ceil(rows.length / 2), passed = Object.values(D.qc).every(v => v >= .65);
    const side = h("div", { className: "side" });
    side.innerHTML = `<div class="row"><button class="on" id="ql">labels on</button><button class="on" id="qe">stroke outline</button><span class="dim" id="qs"></span></div>
      <input type="range" min="0" max="${D.n - 1}" value="${D.start}"><div class="dim" id="qh">move the mouse over the image: label name</div>
      <div class="two"><table>${rows.slice(0, half).join("")}</table><table>${rows.slice(half).join("")}</table></div>
      <div style="color:${C.fp}">${passed ? `All ${rows.length} QC scores pass (≥ 0.65).` : "Not every QC score passes (≥ 0.65)."}</div>
      <ol class="steps"><li>Scroll to the stroke: red outline, ${D.lesion_ml} ml.</li>
        <li>Switch the labels off and on. Compare them with the picture inside the outline.</li>
        <li>The QC network sees only the label map, not the scan. A pass does not prove that the labels are right.</li></ol>
      <div class="dim">SynthSeg robust · ${D.seconds} s on a normal processor</div>`;
    const sl = side.querySelector("input"); blurAfter(sl); let on = true, les = true;
    function draw() {
      const k = +sl.value, t = T1[k], s = SG[k], le = LE[k];
      for (let p = 0; p < n; p++) { const q = p * 4, v = t[p], l = s[p]; let r = v, g = v, b = v;
        if (on && l) { const c = D.colors[l]; r = .45 * v + .55 * c[0]; g = .45 * v + .55 * c[1]; b = .45 * v + .55 * c[2]; }
        if (les && le[p]) { r = 252; g = 60; b = 60; }
        img.data[q] = r; img.data[q + 1] = g; img.data[q + 2] = b; img.data[q + 3] = 255; }
      x.putImageData(img, 0, 0); side.querySelector("#qs").textContent = `slice ${k + 1} / ${D.n} · drag the slider`;
    }
    cv.onmousemove = e => { const r = cv.getBoundingClientRect(), i = Math.floor((e.clientX - r.left) / r.width * D.w), j = Math.floor((e.clientY - r.top) / r.height * D.h);
      const l = SG[+sl.value][j * D.w + i]; side.querySelector("#qh").textContent = l ? D.names[l] : "(outside the labels)"; };
    cv.onwheel = e => { e.preventDefault(); sl.value = Math.max(0, Math.min(D.n - 1, +sl.value + (e.deltaY < 0 ? 1 : -1))); draw(); };
    side.querySelector("#qe").onclick = e => { les = !les; e.target.classList.toggle("on", les); draw(); }; side.querySelectorAll("button").forEach(blurAfter);
    sl.oninput = draw; side.querySelector("#ql").onclick = e => { on = !on; e.target.classList.toggle("on", on); e.target.textContent = on ? "labels on" : "labels off"; draw(); };
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); draw(); keep(cv, draw);
  };

  /* ---------- 3. Dice: shift the mask, a big and a small lesion ---------- */
  W.dice = (box, shown) => {
    const N = 24, S = 30, cv = h("canvas", { width: N * S, height: N * S }); cv.style.height = "640px"; cv.style.cursor = "default"; const x = cv.getContext("2d");
    const ref = new Set();
    for (let r = 4; r < 14; r++) for (let c = 3; c < 13; c++) ref.add(r * N + c);                 // big lesion 10 x 10
    for (let r = 17; r < 19; r++) for (let c = 17; c < 19; c++) ref.add(r * N + c);               // small lesion 2 x 2
    const big = p => Math.floor(p / N) < 15; let dx = 0, dy = 0, fx = 0, fy = 0, raf = 0, timers = [];
    const shown2 = { b: 1, s: 1 }, col = v => v >= .8 ? C.ok : v >= .5 ? C.fp : C.bad;
    const card = (id, title) => `<div class="card"><div class="t">${title}</div><div>Dice <b class="big" id="${id}v">1.00</b></div>
      <div class="bar"><i id="${id}t" style="background:${C.tp}"></i><i id="${id}p" style="background:${C.fp}"></i><i id="${id}n" style="background:${C.fn}"></i></div>
      <div class="f" id="${id}c"></div><div class="f" id="${id}f"></div></div>`;
    const side = h("div", { className: "side" });
    side.innerHTML = `<div class="row"><button id="dplay">▶ demo</button><button data-d="-1,0">◀</button><button data-d="0,-1">▲</button><button data-d="0,1">▼</button><button data-d="1,0">▶</button><button data-d="0,0">reset</button>
      <span class="dim" id="dsh"></span></div>
      <div class="cards">${card("db", "Big lesion · 100 voxels")}${card("ds", "Small lesion · 4 voxels")}</div>
      <div class="key dim"><span style="background:none;border:2px solid ${C.ink}"></span>expert<span style="background:none;border:2px dashed ${C.blue}"></span>program${[[C.tp, "hit"], [C.fp, "extra"], [C.fn, "missed"]].map(([c, t]) => `<span style="background:${c}"></span>${t}`).join("")}</div>
      <div class="dim">Move the program's mask one voxel to the side and compare the two numbers.</div>`;
    const count = sel => { let tp = 0, fp = 0, fn = 0;
      for (const p of ref) { if (!sel(p)) continue; const r = Math.floor(p / N) + dy, c = p % N + dx; if (ref.has(r * N + c) && sel(r * N + c)) tp++; }
      const n = [...ref].filter(sel).length; fp = n - tp; fn = n - tp; return { tp, fp, fn, d: 2 * tp / (2 * tp + fp + fn) }; };
    const fill = (id, k, v) => { const q = s => side.querySelector("#" + id + s), all = k.tp + k.fp + k.fn;
      q("v").textContent = v.toFixed(2); q("v").style.color = col(v);
      q("t").style.width = 100 * k.tp / all + "%"; q("p").style.width = 100 * k.fp / all + "%"; q("n").style.width = 100 * k.fn / all + "%";
      q("c").textContent = `hit ${k.tp} · extra ${k.fp} · missed ${k.fn}`;
      q("f").textContent = `2·${k.tp} / (2·${k.tp} + ${k.fp} + ${k.fn}) = ${k.d.toFixed(2)}`; };
    function draw() {
      const prog = new Set([...ref].map(p => (Math.floor(p / N) + dy) * N + p % N + dx));
      x.setLineDash([]); x.fillStyle = "#0b0d12"; x.fillRect(0, 0, N * S, N * S); x.strokeStyle = "#1f2430"; x.lineWidth = 1;
      for (let i = 0; i <= N; i++) { x.beginPath(); x.moveTo(i * S, 0); x.lineTo(i * S, N * S); x.moveTo(0, i * S); x.lineTo(N * S, i * S); x.stroke(); }
      for (let p = 0; p < N * N; p++) { const a = ref.has(p), b = prog.has(p); if (!a && !b) continue;
        x.fillStyle = a && b ? C.tp : b ? C.fp : C.fn; x.fillRect((p % N) * S + 1, Math.floor(p / N) * S + 1, S - 2, S - 2); }
      x.lineWidth = 4; x.strokeStyle = C.ink; x.strokeRect(3 * S, 4 * S, 10 * S, 10 * S); x.strokeRect(17 * S, 17 * S, 2 * S, 2 * S);        // expert
      x.strokeStyle = C.blue; x.setLineDash([10, 7]);                                                                                    // program, sliding
      x.strokeRect((3 + fx) * S, (4 + fy) * S, 10 * S, 10 * S); x.strokeRect((17 + fx) * S, (17 + fy) * S, 2 * S, 2 * S); x.setLineDash([]);
      const kb = count(big), ks = count(p => !big(p)); fill("db", kb, shown2.b); fill("ds", ks, shown2.s);
      const n = Math.abs(dx) + Math.abs(dy); side.querySelector("#dsh").textContent = `shifted by ${n} voxel${n === 1 ? "" : "s"}`;
    }
    function glide() {            // the outline slides to the new place, the numbers count to the new value
      const near = (a, b) => Math.abs(a - b) < .004;
      const step = () => { const tb = count(big).d, ts = count(p => !big(p)).d; fx += (dx - fx) * .22; fy += (dy - fy) * .22; shown2.b += (tb - shown2.b) * .22; shown2.s += (ts - shown2.s) * .22;
        if (near(fx, dx) && near(fy, dy) && near(shown2.b, tb) && near(shown2.s, ts)) { fx = dx; fy = dy; shown2.b = tb; shown2.s = ts; raf = 0; draw(); return; }
        draw(); raf = requestAnimationFrame(step); };
      if (!raf) raf = requestAnimationFrame(step);
    }
    const move = (a, c) => { if (!a && !c) { dx = dy = 0 } else { dx = Math.max(-3, Math.min(5, dx + a)); dy = Math.max(-4, Math.min(5, dy + c)); } glide(); };
    const stop = () => { timers.forEach(clearTimeout); timers = []; side.querySelector("#dplay").classList.remove("on"); };
    const demo = () => { stop(); side.querySelector("#dplay").classList.add("on"); dx = dy = 0; glide();
      [[1, 0], [1, 0], [1, 0], [0, 0]].forEach((m, i) => timers.push(setTimeout(() => { move(m[0], m[1]); if (i === 3) stop(); }, 1000 + i * 1500))); };
    side.querySelectorAll("button").forEach(b => { blurAfter(b); b.onclick = () => { if (b.id === "dplay") return demo(); stop(); const [a, c] = b.dataset.d.split(",").map(Number); move(a, c); }; });
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); draw(); keep(cv, draw);
    onLeave(() => { stop(); cancelAnimationFrame(raf); }); if (shown) timers.push(setTimeout(demo, 900));
  };

  /* ---------- 4. 26 neighbours: click voxels on three slices, count clusters ---------- */
  W.n26 = (box, shown) => {
    const N = 5, S = 66, G = 60, cv = h("canvas", { width: 3 * N * S + 2 * G, height: N * S }); cv.style.width = cv.width + "px"; cv.style.maxHeight = "none"; const x = cv.getContext("2d");
    // example: a bleed that touches only by an edge and a corner, plus one separate bleed -> 26 neighbours: 2 clusters, 6 neighbours: 4
    const EXAMPLE = ["1,1,1", "1,2,2", "0,3,3", "2,1,4", "2,2,4"];
    const on = new Set(EXAMPLE); let conn = 26, hover = null, lit = null, timers = [];
    const pal = ["#83C167", "#58C4DD", "#FC8B3C", "#9A72AC", "#FFE14D", "#5CD0B3", "#FC6255"], KIND = [null, C.blue, "#5CD0B3", "#9A72AC"];
    const HINT = "Click voxels to mark or unmark. Point at a voxel: the blue frames are the places that count as touching it.";
    const ctl = h("div", { className: "row" });
    ctl.innerHTML = `<button id="nshow">▶ show the 26 neighbours</button><button id="n6">rule 6: faces only</button><button class="on" id="n26">rule 26: faces, edges, corners</button>
      <span style="margin:0 22px">microbleeds: <b class="big" id="nc">0</b></span><button id="nex">example</button><button id="nclr">clear</button>`;
    const rule = h("div", {}, `Marked voxels that touch each other form one cluster = <b>one microbleed</b>. The number 6 or 26 is only the rule for “touching”, not the size of a cluster.`);
    rule.style.cssText = "font-size:27px;text-align:center"; const both = h("div"); both.style.cssText = "font-size:27px;text-align:center;min-height:38px;color:" + C.fp;
    ctl.style.justifyContent = "center"; ctl.style.fontSize = "28px";
    const cap = h("div", { className: "dim" }, HINT); cap.style.cssText = "font-size:26px;min-height:36px;text-align:center";
    const kind = (a, b) => { const p = a.split(",").map(Number), q = b.split(",").map(Number), d = p.map((v, i) => Math.abs(v - q[i]));
      return Math.max(...d) > 1 ? 0 : d[0] + d[1] + d[2]; };                       // 1 = shares a face, 2 = an edge, 3 = only a corner, 0 = no neighbour
    const nb = (a, b) => { const k = kind(a, b); return conn === 26 ? k > 0 : k === 1; };
    function clusters(rule = conn) {
      const ids = {}, list = [...on], touch = (a, b) => { const k = kind(a, b); return rule === 26 ? k > 0 : k === 1; }; let k = 0;
      for (const v of list) { if (ids[v] !== undefined) continue; const st = [v]; ids[v] = k;
        while (st.length) { const u = st.pop(); for (const w of list) if (ids[w] === undefined && touch(u, w)) { ids[w] = k; st.push(w); } } k++; }
      return [ids, k];
    }
    const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
    function draw() {
      const [ids, k] = clusters(); x.fillStyle = "#0b0d12"; x.fillRect(0, 0, cv.width, cv.height);
      for (let s = 0; s < 3; s++) for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
        const X = s * (N * S + G) + c * S, Y = r * S, key = `${s},${r},${c}`;
        x.lineWidth = 1; x.strokeStyle = "#2a2f3a"; x.strokeRect(X + 1, Y + 1, S - 2, S - 2);
        if (lit) { x.fillStyle = key === lit.centre ? C.ink : lit.on.has(key) ? KIND[kind(lit.centre, key)] : "#151922"; x.fillRect(X + 3, Y + 3, S - 6, S - 6); continue; }
        x.fillStyle = on.has(key) ? pal[ids[key] % pal.length] : "#151922"; x.fillRect(X + 3, Y + 3, S - 6, S - 6);
        if (hover && key !== hover && nb(hover, key)) { x.lineWidth = 3; x.strokeStyle = C.blue; x.strokeRect(X + 5, Y + 5, S - 10, S - 10); }
        if (key === hover) { x.lineWidth = 3; x.strokeStyle = C.ink; x.strokeRect(X + 5, Y + 5, S - 10, S - 10); } }
      ctl.querySelector("#nc").textContent = k; const k6 = clusters(6)[1], k26 = clusters(26)[1];
      both.textContent = !on.size ? "Nothing marked: 0 microbleeds." : on.size === 1 ? "1 marked voxel with no marked neighbour = 1 cluster of size 1 = 1 microbleed (with both rules)."
        : `${plural(on.size, "marked voxel")}  →  rule 26: ${plural(k26, "microbleed")}  ·  rule 6: ${plural(k6, "microbleed")}` + (k6 > k26 ? "  (rule 6 splits what touches only by an edge or a corner)" : "");
    }
    const cell = e => { const r = cv.getBoundingClientRect(), X = (e.clientX - r.left) / r.width * cv.width, Y = (e.clientY - r.top) / r.height * cv.height;
      const s = Math.floor(X / (N * S + G)), c = Math.floor((X - s * (N * S + G)) / S), rr = Math.floor(Y / S);
      return s < 0 || s > 2 || c < 0 || c >= N || rr < 0 || rr >= N ? null : `${s},${rr},${c}`; };
    const stop = () => { timers.forEach(clearTimeout); timers = []; lit = null; cap.textContent = HINT; cap.style.color = ""; ctl.querySelector("#nshow").classList.remove("on"); draw(); };
    function demo() {            // one voxel, then its neighbours light up: 6 by a face, 12 more by an edge, 8 more by a corner
      stop(); ctl.querySelector("#nshow").classList.add("on"); const centre = "1,2,2"; lit = { centre, on: new Set() }; cap.style.color = C.ink;
      const all = []; for (let s = 0; s < 3; s++) for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { const k = `${s},${r},${c}`; if (kind(centre, k)) all.push(k); }
      const say = ["", "share a face", "share a face or an edge", "share a face, an edge or only a corner"]; let t = 900;
      cap.textContent = "One voxel of a microbleed. Which voxels around it count as neighbours?"; draw();
      [1, 2, 3].forEach(g => { all.filter(k => kind(centre, k) === g).forEach(k => { t += g === 1 ? 260 : 130;
          timers.push(setTimeout(() => { lit.on.add(k); cap.textContent = `${lit.on.size} neighbour${lit.on.size === 1 ? "" : "s"}`; draw(); }, t)); });
        t += 300; timers.push(setTimeout(() => { cap.textContent = `${lit.on.size} neighbours ${say[g]}` + (g === 1 ? " = rule 6" : g === 3 ? " = rule 26: the 3 × 3 × 3 block around the voxel, minus the voxel itself" : ""); }, t)); t += 1700; });
      timers.push(setTimeout(stop, t + 2500));
    }
    cv.onclick = e => { if (lit) return stop(); const key = cell(e); if (!key) return; on.has(key) ? on.delete(key) : on.add(key); draw(); };
    cv.onmousemove = e => { const k = cell(e); if (k !== hover) { hover = k; if (!lit) draw(); } }; cv.onmouseleave = () => { hover = null; if (!lit) draw(); };
    const set = v => { stop(); conn = v; ctl.querySelector("#n6").classList.toggle("on", v === 6); ctl.querySelector("#n26").classList.toggle("on", v === 26); draw(); };
    ctl.querySelector("#n6").onclick = () => set(6); ctl.querySelector("#n26").onclick = () => set(26); ctl.querySelector("#nclr").onclick = () => { stop(); on.clear(); draw(); };
    ctl.querySelector("#nex").onclick = () => { stop(); on.clear(); EXAMPLE.forEach(k => on.add(k)); draw(); }; ctl.querySelector("#nshow").onclick = demo;
    ctl.querySelectorAll("button").forEach(blurAfter);
    const names = h("div", {}, ["slice above", "this slice", "slice below"].map(t => `<span>${t}</span>`).join(""));
    names.style.cssText = "display:flex;justify-content:space-around;width:" + cv.width + "px;font-size:26px;color:" + C.dim;
    const wrap = h("div", { className: "tw col" }); wrap.append(rule, names, cv, ctl, both, cap); box.appendChild(wrap); draw(); keep(cv, draw);
    onLeave(() => { timers.forEach(clearTimeout); }); if (shown) timers.push(setTimeout(demo, 900));
  };

  /* ---------- 5. F1: click the microbleeds on a real VALDO slice ---------- */
  W.f1 = box => {
    const D = TRY.f1, im = new Image(); im.src = D.img; const cv = h("canvas", { width: 720, height: 720 }); cv.style.height = "620px"; const x = cv.getContext("2d");
    let marks = [], show = false;
    const side = h("div", { className: "side" });
    side.innerHTML = `<div class="row"><span>TP <b id="ft">0</b></span><span>FP <b id="ff">0</b></span><span>FN <b id="fn">0</b></span></div>
      <div>precision <b id="fp">–</b> · recall <b id="fr">–</b></div><div>F1 <b class="big" id="f1v">–</b></div>
      <div class="row"><button id="fs">show answer</button><button id="fc">clear</button></div>
      <div class="dim">Click where you see a microbleed (small dark dot); click a mark again to remove it. Then press "show answer".</div><div class="dim" id="fm">0 marks</div>${legend([[C.ok, "hit"], [C.bad, "false alarm"], [C.tp, "missed (after answer)"]])}`;
    function match() { const used = new Set(), hit = new Set();
      marks.forEach((m, i) => { let best = -1, bd = D.radius;
        D.refs.forEach((r, j) => { if (used.has(j)) return; const d = Math.hypot(m[0] - r[0], m[1] - r[1]); if (d < bd) { bd = d; best = j; } });
        if (best >= 0) { used.add(best); hit.add(i); } });
      return [hit, used]; }
    function draw() {
      x.drawImage(im, 0, 0, 720, 720); const [hit, used] = match(), tp = hit.size, fp = marks.length - tp, fn = D.refs.length - used.size;
      marks.forEach((m, i) => { x.strokeStyle = !show ? C.fp : hit.has(i) ? C.ok : C.bad; x.lineWidth = 4; x.beginPath(); x.arc(m[0] * 720, m[1] * 720, 13, 0, 7); x.stroke(); });
      if (show) D.refs.forEach((r, j) => { x.strokeStyle = used.has(j) ? C.ok : C.tp; x.setLineDash([5, 4]); x.lineWidth = 3; x.beginPath(); x.arc(r[0] * 720, r[1] * 720, 20, 0, 7); x.stroke(); x.setLineDash([]); });
      const P = marks.length ? tp / marks.length : NaN, R = tp / D.refs.length, F = P + R ? 2 * P * R / (P + R) : 0;
      side.querySelector("#ft").textContent = show ? tp : "?"; side.querySelector("#ff").textContent = show ? fp : "?"; side.querySelector("#fn").textContent = show ? fn : "?";
      side.querySelector("#fp").textContent = !show ? "?" : isNaN(P) ? "–" : P.toFixed(2); side.querySelector("#fr").textContent = show ? R.toFixed(2) : "?";
      side.querySelector("#fm").textContent = `${marks.length} mark(s)`;
      side.querySelector("#f1v").textContent = show && marks.length ? F.toFixed(2) : "?";
    }
    cv.onclick = e => { const r = cv.getBoundingClientRect(), p = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
      const i = marks.findIndex(m => Math.hypot(m[0] - p[0], m[1] - p[1]) < .02); if (i >= 0) marks.splice(i, 1); else marks.push(p); draw(); };
    side.querySelector("#fs").onclick = e => { show = !show; e.target.textContent = show ? "hide answer" : "show answer"; draw(); };
    side.querySelector("#fc").onclick = () => { marks = []; draw(); }; side.querySelectorAll("button").forEach(blurAfter);
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); im.onload = draw; keep(cv, draw);
  };
})();
