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
  .tw .key span{display:inline-block;width:18px;height:18px;border-radius:4px;margin:0 6px 0 14px;vertical-align:-2px}`;
  document.head.appendChild(h("style", {}, css));
  const blurAfter = el => el.addEventListener("pointerup", () => setTimeout(() => el.blur(), 0));   // keys go back to the deck
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
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); draw();
  };

  /* ---------- 2. QC scroller: SynthSeg labels on a public stroke scan ---------- */
  W.qc = box => {
    const D = TRY.qc, n = D.w * D.h, T1 = D.t1.map(dec), SG = D.seg.map(dec), LE = D.lesion.map(dec);
    const cv = h("canvas", { width: D.w, height: D.h }); cv.style.height = "620px"; const x = cv.getContext("2d"), img = x.createImageData(D.w, D.h);
    const rows = Object.entries(D.qc).map(([k, v]) => `<tr><td>${k}</td><td style="color:${v >= .65 ? C.ok : C.bad}">${v.toFixed(2)} ${v >= .65 ? "✓" : "✗"}</td></tr>`).join("");
    const side = h("div", { className: "side" });
    side.innerHTML = `<div class="row"><button class="on" id="ql">labels on</button><button class="on" id="qe">stroke outline</button><span class="dim" id="qs"></span></div>
      <input type="range" min="0" max="${D.n - 1}" value="${D.start}"><div class="dim" id="qh">move the mouse over the image: label name</div>
      <table>${rows}</table><div style="color:${C.fp}">All QC values pass (≥ 0.65). Now look at the stroke (red outline, ${D.lesion_ml} ml).</div>
      <div class="dim">SynthSeg robust: ${D.seconds} s on a processor · ${D.source}</div>`;
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
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); draw();
  };

  /* ---------- 3. Dice: shift the mask, a big and a small lesion ---------- */
  W.dice = box => {
    const N = 24, S = 25, cv = h("canvas", { width: N * S, height: N * S }); cv.style.height = "600px"; const x = cv.getContext("2d");
    const ref = new Set();
    for (let r = 4; r < 14; r++) for (let c = 3; c < 13; c++) ref.add(r * N + c);                 // big lesion 10 x 10
    for (let r = 17; r < 19; r++) for (let c = 17; c < 19; c++) ref.add(r * N + c);               // small lesion 2 x 2
    const big = p => Math.floor(p / N) < 15; let dx = 0, dy = 0;
    const side = h("div", { className: "side" });
    side.innerHTML = `<div class="row"><button data-d="-1,0">◀</button><button data-d="0,-1">▲</button><button data-d="0,1">▼</button><button data-d="1,0">▶</button><button data-d="0,0">reset</button></div>
      <div class="dim" id="dsh"></div><div>big lesion (10 × 10): <b class="big" id="db">1.00</b></div><div>small lesion (2 × 2): <b class="big" id="ds">1.00</b></div>
      ${legend([[C.tp, "hit"], [C.fp, "extra"], [C.fn, "missed"]])}`;
    function draw() {
      const prog = new Set([...ref].map(p => { const r = Math.floor(p / N) + dy, c = p % N + dx; return r >= 0 && r < N && c >= 0 && c < N ? r * N + c : -1; }).filter(p => p >= 0));
      x.fillStyle = "#0b0d12"; x.fillRect(0, 0, N * S, N * S); x.strokeStyle = "#1f2430";
      for (let i = 0; i <= N; i++) { x.beginPath(); x.moveTo(i * S, 0); x.lineTo(i * S, N * S); x.moveTo(0, i * S); x.lineTo(N * S, i * S); x.stroke(); }
      const score = sel => { let tp = 0, fp = 0, fn = 0; for (let p = 0; p < N * N; p++) { if (!sel(p)) continue; const a = ref.has(p), b = prog.has(p); if (a && b) tp++; else if (b) fp++; else if (a) fn++; }
        return 2 * tp / (2 * tp + fp + fn); };
      for (let p = 0; p < N * N; p++) { const a = ref.has(p), b = prog.has(p); if (!a && !b) continue;
        x.fillStyle = a && b ? C.tp : b ? C.fp : C.fn; x.fillRect((p % N) * S + 1, Math.floor(p / N) * S + 1, S - 2, S - 2); }
      const db = score(big), ds = score(p => !big(p));
      side.querySelector("#db").textContent = db.toFixed(2); side.querySelector("#ds").textContent = ds.toFixed(2);
      side.querySelector("#ds").style.color = ds >= .8 ? C.ok : ds >= .5 ? C.fp : C.bad; side.querySelector("#db").style.color = db >= .8 ? C.ok : db >= .5 ? C.fp : C.bad;
      side.querySelector("#dsh").textContent = `mask shifted by ${Math.abs(dx) + Math.abs(dy)} voxel(s)`;
    }
    side.querySelectorAll("button").forEach(b => { blurAfter(b); b.onclick = () => { const [a, c] = b.dataset.d.split(",").map(Number); if (!a && !c) { dx = dy = 0 } else { dx += a; dy += c } draw(); }; });
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); draw();
  };

  /* ---------- 4. 26 neighbours: click voxels on three slices, count clusters ---------- */
  W.n26 = box => {
    const N = 5, S = 70, G = 40, cv = h("canvas", { width: 3 * N * S + 2 * G, height: N * S + 50 }); cv.style.width = "880px"; const x = cv.getContext("2d");
    const on = new Set(["1,1,1", "1,2,2", "0,2,3", "1,4,0", "2,4,1", "1,0,4"]); let conn = 26;   // a start example: k(slice), r, c
    const pal = ["#83C167", "#58C4DD", "#FC8B3C", "#9A72AC", "#FFE14D", "#5CD0B3", "#FC6255"];
    const side = h("div", { className: "side" });
    side.innerHTML = `<div class="row"><button id="n6">6 neighbours</button><button class="on" id="n26">26 neighbours</button></div>
      <div>clusters = microbleeds: <b class="big" id="nc">0</b></div><div class="row"><button id="nclr">clear</button></div>
      <div class="dim">Click voxels to mark or unmark. Same colour = same cluster. Try two voxels that touch only at a corner.</div>`;
    function clusters() {
      const ids = {}, list = [...on]; let k = 0;
      const nb = (a, b) => { const p = a.split(",").map(Number), q = b.split(",").map(Number), d = p.map((v, i) => Math.abs(v - q[i]));
        if (Math.max(...d) > 1) return false; return conn === 26 ? true : d[0] + d[1] + d[2] === 1; };
      for (const v of list) { if (ids[v] !== undefined) continue; const st = [v]; ids[v] = k;
        while (st.length) { const u = st.pop(); for (const w of list) if (ids[w] === undefined && nb(u, w)) { ids[w] = k; st.push(w); } } k++; }
      return [ids, k];
    }
    function draw() {
      const [ids, k] = clusters(); x.fillStyle = "#0b0d12"; x.fillRect(0, 0, cv.width, cv.height); x.font = "30px Source Sans 3, sans-serif"; x.fillStyle = C.dim;
      ["slice above", "this slice", "slice below"].forEach((t, s) => x.fillText(t, s * (N * S + G) + 8, 34));
      for (let s = 0; s < 3; s++) for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
        const X = s * (N * S + G) + c * S, Y = 50 + r * S, key = `${s},${r},${c}`;
        x.fillStyle = on.has(key) ? pal[ids[key] % pal.length] : "#151922"; x.fillRect(X + 2, Y + 2, S - 4, S - 4);
        x.strokeStyle = "#2a2f3a"; x.strokeRect(X + 1, Y + 1, S - 2, S - 2); }
      side.querySelector("#nc").textContent = k;
    }
    cv.onclick = e => { const r = cv.getBoundingClientRect(), X = (e.clientX - r.left) / r.width * cv.width, Y = (e.clientY - r.top) / r.height * cv.height - 50;
      const s = Math.floor(X / (N * S + G)), c = Math.floor((X - s * (N * S + G)) / S), rr = Math.floor(Y / S);
      if (s < 0 || s > 2 || c < 0 || c >= N || rr < 0 || rr >= N) return; const key = `${s},${rr},${c}`; on.has(key) ? on.delete(key) : on.add(key); draw(); };
    const set = v => { conn = v; side.querySelector("#n6").classList.toggle("on", v === 6); side.querySelector("#n26").classList.toggle("on", v === 26); draw(); };
    side.querySelector("#n6").onclick = () => set(6); side.querySelector("#n26").onclick = () => set(26); side.querySelector("#nclr").onclick = () => { on.clear(); draw(); };
    side.querySelectorAll("button").forEach(blurAfter);
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); draw();
  };

  /* ---------- 5. F1: click the microbleeds on a real VALDO slice ---------- */
  W.f1 = box => {
    const D = TRY.f1, im = new Image(); im.src = D.img; const cv = h("canvas", { width: 720, height: 720 }); cv.style.height = "620px"; const x = cv.getContext("2d");
    let marks = [], show = false;
    const side = h("div", { className: "side" });
    side.innerHTML = `<div class="row"><span>TP <b id="ft">0</b></span><span>FP <b id="ff">0</b></span><span>FN <b id="fn">0</b></span></div>
      <div>precision <b id="fp">–</b> · recall <b id="fr">–</b></div><div>F1 <b class="big" id="f1v">–</b></div>
      <div class="row"><button id="fs">show answer</button><button id="fc">clear</button></div>
      <div class="dim">Click where you see a microbleed (small dark dot); click a mark again to remove it. Then press "show answer".</div><div class="dim" id="fm">0 marks</div>${legend([[C.ok, "hit"], [C.bad, "false alarm"], [C.tp, "missed (after answer)"]])}
      <div class="dim">${D.source}</div>`;
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
    const wrap = h("div", { className: "tw" }); wrap.append(cv, side); box.appendChild(wrap); im.onload = draw;
  };
})();
