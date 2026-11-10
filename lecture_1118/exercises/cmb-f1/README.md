# Find the microbleeds - F1 exercise

A single static web page for the lecture on brain segmentation (18.11.2026).
Students scroll through three public T2*-weighted MRI stacks, click on every
cerebral microbleed they see and get precision, recall and F1 against the
expert reference.

Open `index.html` in a browser. No server, no internet, no installation.
It works from `file://` and from a static host such as GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | the whole page (markup, style, script; no framework, no CDN) |
| `data/manifest.js` | list of the three subjects, software versions |
| `data/easy.js`, `medium.js`, `hard.js` | image slices (8-bit PNG, lossless) and reference microbleeds; loaded with a script tag when the subject is opened |
| `build/00_survey_subjects.py` | measures all 72 subjects, applies the selection rules, writes `build/survey.tsv` (about 10 minutes) |
| `build/01_prepare_cases.py` | writes the `data/*.js` files |
| `build/02_check_clusters.py` | independent recount of the microbleeds, writes `build/test_points.json` |
| `build/03_test_page.mjs` | headless browser test, writes `build/test_results.txt` and `build/screenshots/` |

## Two settings at the top of the script in `index.html`

- `const SECONDS_PER_CASE = 180;` - countdown per subject in the header. `0` switches the clock off.
  The clock starts when the subject opens, turns red at zero and counts up as overtime. It never blocks
  marking or scoring. It pauses while the tab is hidden and stops when the subject is scored.
- `const CLINICAL_NOTE = null;` - put a text here to show a note in the final summary. Nothing is shown while it is `null`.

## Subjects and how they were chosen

Only subjects with at most 50 slices were considered (file size). Rules, applied by `00_survey_subjects.py`:

- **Easy**: 1-2 microbleeds, all larger than 5 mm, all clearly dark (mean inside / mean of a 3 mm ring of brain <= 0.5); the darkest one is taken.
- **Medium**: 3-6 microbleeds, same count with 26- and 6-connectivity, all >= 2.5 mm, median contrast <= 0.6; the one with the most microbleeds is taken.
- **Hard**: 8-20 microbleeds, at least half of them smaller than 3 mm, at least three with weak contrast (> 0.6).

| Level | Subject | Matrix | Voxel (mm) | Microbleeds (26-conn.) | 6-conn. | Size classes | File |
|---|---|---|---|---|---|---|---|
| Easy | sub-311 | 256 x 256 x 39 | 1.00 x 1.00 x 3.00 | 1 (5.5 mm) | 1 | 0 / 0 / 1 | 0.87 MB |
| Medium | sub-103 | 512 x 512 x 35 | 0.45 x 0.45 x 4.00 | 6 (2.7-4.6 mm) | 6 | 0 / 6 / 0 | 1.17 MB |
| Hard | sub-101 | 512 x 512 x 35 | 0.45 x 0.45 x 4.00 | 12 (one of 5.2 mm, the rest 2-5 mm) | 14 | 0 / 11 / 1 | 1.51 MB |

Size classes are `< 2 mm / 2-5 mm / > 5 mm`. **No microbleed in these three subjects is smaller than 2 mm**, so
that row of the summary table says so. sub-207 has three microbleeds below 2 mm but 192 slices; to use it,
change one line in `CASES` in `01_prepare_cases.py` and run steps 01 to 03 again.

## Definitions used

- **One microbleed** = one group of reference voxels that touch by a face, an edge or a corner
  (26-connectivity, `scipy.ndimage.label` with a 3 x 3 x 3 structure of ones).
- **Diameter** = diameter of the sphere with the same volume, d = (6 V / pi)^(1/3), V = voxels x voxel volume.
- **Hit**: a marker is a hit if it lies inside a reference microbleed, or at most 2.0 mm away from one of its
  voxels within the slice and at most N slices above or below that voxel, with N = max(1, floor(2.0 mm / slice
  thickness)) = 1 slice for all three subjects. Markers and microbleeds are paired one to one, nearest first.
  A second marker on a microbleed that is already found is a duplicate: reported, not counted.
  Every other marker is a false alarm.
- **F1** = 2 TP / (2 TP + FP + FN). The pooled F1 adds up TP, FP and FN over the three subjects first.
- **Picture**: no resampling, no cropping. Grey window = 0.5th to 99.5th percentile of the non-zero voxels.
  The files are stored as LAS; the page shows the radiological view (patient's left on the right side of the
  picture, front of the head at the top, slice 1 = lowest slice). Checked with nibabel and by eye.

## What was tested (10.11.2026)

`build/03_test_page.mjs`, headless Chromium 151 through Playwright 1.62.1, Node 22.22.2, page opened from
`file://`. 45 checks, all passed; the lines with numbers are in `build/test_results.txt`.

- loads without console errors; no native `alert` / `confirm`
- slice by arrow keys, wheel, slider, buttons; zoom by buttons and Ctrl + wheel; drag moves and places no marker
- marker placed by click, removed by a second click and from the list
- every centroid marked: TP = n, FP = 0, F1 = 1.000 (n = 1, 6, 12); no marker: F1 = 0.000
- half of the centroids plus two markers in empty brain: F1 = 0.500, 0.545, 0.600 as worked out by hand; pooled 20 / 35 = 0.571
- a duplicate marker leaves the score unchanged and is reported as 1 duplicate
- number of microbleeds in the page = independent flood fill in pure Python (`02_check_clusters.py`), same voxels:
  1 / 6 / 12 with 26-connectivity, 1 / 6 / 14 with 6-connectivity
- reload in the middle (markers, slice, clock) and on the summary; start over; locked after scoring
- clock: counts down, red after zero, counts up, scoring still works, time shown in the result and the summary
- page with `localStorage` blocked; widths 1000, 820 (tap) and 390 px (tap) without sideways scrolling

Not tested: Firefox, Safari, a real touch device, a real trackpad pinch, GitHub Pages itself.

Teaching example: in sub-101 two reference microbleeds contain voxels that touch only by an edge or a corner,
so 6-connectivity counts 14 pieces and 26-connectivity 12. In the whole challenge set this also happens in
sub-108 (6 vs 11) and sub-110 (73 vs 83).

## Data credit

Where is VALDO? challenge, MICCAI 2021, Task 2 (microbleeds) - Sudre et al., Medical Image Analysis 2024,
https://doi.org/10.1016/j.media.2023.103029; https://valdo.grand-challenge.org

The terms of use of the challenge data were not checked while building this page. Please check them before
the page with the image slices is put on a public host.

Built with Python 3.11.16, nibabel 5.4.2, NumPy 2.4.6, SciPy 1.17.1, Pillow 12.3.0.
