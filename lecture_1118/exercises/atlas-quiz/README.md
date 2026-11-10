# MRT Atlas Quiz (lecture 18.11.2026, brain segmentation)

A quiz-only version of the public brain-anatomy game
[mrt-atlas-trainer](https://mendeltem.github.io/mrt-atlas-trainer/)
([repo](https://github.com/mendeltem/mrt-atlas-trainer)).
After the lecture part on grey-matter segmentation (FreeSurfer, SynthSeg) every student opens
`index.html` and answers 10 fixed questions: a structure is marked on the MNI152 MRI,
"Which structure is this?", four options.

## Use

- Open `index.html` (double click, `file://`) or serve the folder as a static site (GitHub Pages).
  The folder needs `index.html` and `data/`. No server code, no build step for the students.
- Start screen -> 10 questions -> end screen with score, total time, review list, "Try again" and
  "Practise more" (link to the full trainer).
- Each question has a countdown (large seconds + shrinking bar, red in the last 10 s). At zero the
  question is closed, the correct answer is shown and the question counts as not answered (= wrong;
  review text "No answer (time ran out)"). The countdown stops when an answer is given.
- The total time runs in the header from "Start" to the last answer and is shown on the end screen.
- Progress is kept in `localStorage` (key `mrtAtlasQuiz.v1`), so a reload resumes at the same question.
  A reload does not give time back: the countdown runs from the moment the question was first shown.
  Without storage (private mode) the quiz still works, only the resume is lost.
- The student can change the view (axial / coronal / sagittal) and scroll through the slices;
  "Back to marked slice" returns to the marker.

## Edit the questions and the timer

Everything a lecturer needs is in ONE block at the top of `index.html` ("QUIZ CONFIG"):

- `const SECONDS_PER_QUESTION = 40;`  countdown per question in seconds, `0` switches it off.
- `const QUIZ = [ ... ]`  one line per question, in the order shown:
  `atlas` (`'aal'` or `'ho'`), `region` (label number, see `build/label_list.txt`), `view`,
  `answer` (must be one of the options), `options` (4 texts, shown in this order).
- `const TRAINER_URL`  target of "Practise more".

A typing mistake in the block gives a readable error card instead of a dead page.
After an edit, saved progress of the old list is dropped automatically.

The 10 questions as delivered (easy -> hard):

| No | Structure | Atlas / label | View | Options (in display order) |
|---|---|---|---|---|
| 1 | Cerebellum | AAL 99 | sagittal | Cerebral cortex, Cerebellum, Brain stem, Thalamus |
| 2 | Brain stem | HO 63 | sagittal | Thalamus, Cerebellum, Brain stem, Corpus callosum |
| 3 | Thalamus | HO 49 | axial | Thalamus, Caudate, Putamen, Lateral ventricle |
| 4 | Caudate | HO 51 | axial | Lateral ventricle, Thalamus, Putamen, Caudate |
| 5 | Hippocampus | HO 57 | coronal | Amygdala, Putamen, Hippocampus, Thalamus |
| 6 | Putamen | HO 53 | axial | Pallidum (globus pallidus), Putamen, Caudate, Insular cortex |
| 7 | Insular cortex | HO 2 | axial | Insular cortex, Putamen, Superior temporal gyrus, Caudate |
| 8 | Pallidum (globus pallidus) | HO 55 | axial | Putamen, Thalamus, Caudate, Pallidum (globus pallidus) |
| 9 | Amygdala | HO 59 | coronal | Hippocampus, Amygdala, Putamen, Nucleus accumbens |
| 10 | Nucleus accumbens | HO 61 | coronal | Caudate, Pallidum (globus pallidus), Nucleus accumbens, Putamen |

All ten are structures that FreeSurfer (aseg / aparc) and SynthSeg both segment. The trainer's atlas
data has no label for lateral ventricle, cerebral white matter or the whole cortex, so these could
not be asked; insular cortex stands in for the cortex. Left / right is not asked.

## How it was derived

Source: `mrt-atlas-trainer`, commit `7a3f3c55f74360d1ffca2abff7aa4c99377a917e` (2026-11-05),
`index.html` sha256 `cd4002a726fd88cc63b62e65eef7b0fcc3791990090a908e4387dfbe8c65d400`.
The source was only read, never changed.

- `build/01_extract_from_trainer.js` reads the trainer's single `index.html` and writes
  - `data/atlas-data.js`: the pre-rendered MRI slices and label maps of the atlases AAL and
    Harvard-Oxford (unchanged image data), plus the English names and one-line fact texts,
    evaluated from the trainer's own tables;
  - `data/viewer-core.js`: the trainer's rendering code (slice drawing, atlas colours, marker
    ring, slice slider, wheel / swipe, view switch, phone layout), functions copied by name;
  - `build/label_list.txt`: all label numbers with names, for editing the QUIZ block.
- `index.html` is written by hand: the trainer's CSS (reduced), the config block and the quiz logic.
- Kept: MRI rendering, the quiz marker (`placeQuizMarker`), hidden atlas colours during the
  question and reveal after the answer, feedback wording, fact line, visual style, fonts.
- Removed: explore / collect / study modes, card deck, German language, atlas chooser, opacity
  slider, random questions, the atlases JHU (labels and tracts) and Schaefer-200, norms page.
- Added: fixed question list, countdown and total time, end screen with review, own storage key,
  config check, "Back to marked slice".

Rebuild the data after a trainer update: `node build/01_extract_from_trainer.js [path/to/trainer/index.html]`.

## External resources

One only: the Google Fonts stylesheet (and the font files it names), copied from the trainer.
Without network the page falls back to system fonts and works unchanged (the tests run that way).

## Tests

`node build/02_test_quiz.js` drives the page in headless Chromium (Playwright), writes
`build/test_output/test_log.txt` and screenshots. Last run 2026-11-10: 201 checks, all passed.

- (a) loads from `file://` and from a plain static http server, no console errors;
- (b) all correct -> 10 / 10, all wrong -> 0 / 10, mix -> 7 / 10, review marks exactly the wrong ones;
- (c) per question: the atlas label under the marker (read from the label map) is the region of the
  question, in all three views; 4 options as configured; screenshots `qNN_question.png` and
  `qNN_answered.png` were also checked by eye;
- (d) reload in the middle resumes at the same question; works with storage blocked;
- (e) phone viewport 390 x 844: image and all 4 options on one screen, no sideways scrolling;
- (f) a broken QUIZ block gives an error card;
- (g) timers: countdown runs and stops after an answer; time-out closes the question, reveals the
  answer, counts as wrong and is marked in the review (tested with a moved browser clock on the
  real page and with real waiting on a 3-second copy); a reload does not reset the countdown;
  total time identical in header and end screen; with `SECONDS_PER_QUESTION = 0` there is no
  countdown and nothing times out.

Not tested: real phones, Safari, Firefox; the page with the web fonts loaded.

## Licence and third-party material

Carried over from the trainer's `LICENSE` and `THIRD-PARTY.md`.

- **Code** (trainer and this quiz): MIT License. The trainer's `LICENSE` file still carries the
  placeholder "Copyright (c) 2026 [Dein Name]"; the author name has to be filled in there by the
  owner. The MIT licence covers the code only, not the atlas and image data.
- **AAL atlas** (Automated Anatomical Labeling): Tzourio-Mazoyer et al., NeuroImage 2002.
  Research freeware, non-commercial use.
- **Harvard-Oxford cortical and subcortical atlases**: part of FSL (FMRIB Software Library,
  fsl.fmrib.ox.ac.uk), FSL licence, non-commercial use. Desikan et al. 2006; Makris et al. 2006.
- **MNI152 template** (FSL MNI152_T1_2mm, distributed with FSL under the FSL licence,
  non-commercial): Fonov et al., NeuroImage 54(1):313-327, 2011.
- **Image data** taken from the NiiVue demo data (BSD-2-Clause), pre-rendered to slices.
- **Fonts**: Google Fonts, SIL Open Font License 1.1, loaded at runtime.

Because of the atlas licences the work as a whole may only be used free of charge and
non-commercially (teaching). Keep the source line in the page footer.
