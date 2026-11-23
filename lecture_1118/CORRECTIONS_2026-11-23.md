# Corrections of 23.11.2026 (fact check of lecture 18.11.2026)

A fact check of all 42 slides (spoken text, key points, quiz, sources, Q&A, presenter notes) against the cited sources. The corrections below were applied directly to the built deck files (`deck/slides.js`, `deck/steps.js`, `deck/media.js`, `deck/qa.js`). 116 changes in total.

**Not yet updated** (they are made by the film pipeline, `film/code`, which is not in this repository):

- the voice recordings: 6 changes to the spoken text (slides 4, 15, 18, 26, 29; each listed twice below, for `slides.js` and `steps.js`), marked *voice*;
- the rendered clips: 6 key-point boxes (slides 4, 15, 18, 26, 29, 40), marked *clip* below;
- `deck/lecture_1118_slides.pdf`: it still shows the old spoken text, key points and source list.

To make the change permanent, carry it into the pipeline's source data (e.g. `slides_data.py`, `film/qa/*.json`) before the next build; otherwise the next build overwrites these files. The same list as JSON: `CORRECTIONS_2026-11-23.json`.


## Slide 1 (`title`)

**QA 7 answer**
- old: No patient data.
- new: No data from our own clinic: all three are public, de-identified research scans.


## Slide 2 (`plan`)

**QA 4 answer**
- old: generally 2 to 5 millimetres wide, sometimes up to 10. There is no strict size limit.
- new: generally 2 to 5 millimetres wide, at most about 10. How big it looks also depends on the scanner and the sequence.


## Slide 3 (`intro`)

**QA 8 answer**
- old: 4 percent less hippocampus per decade of age.
- new: 4 percent less hippocampus per decade of age. That compares people of different ages; following the same people over time usually shows more change.


## Slide 4 (`gm_use`)

**TEXT (spoken, slides.js text+notes)** · *voice*
- old: shrinking of the brain is one of three markers of the disease, the N in the A, T, N scheme.
- new: shrinking of the brain is a marker of N, nerve cell loss, in the A, T, N research scheme. It shows that nerve cells are lost, but not why.

**STEP 2 (spoken, steps.js)** · *voice*
- old: shrinking of the brain is one of three markers of the disease, the N in the A-T-N scheme.
- new: shrinking of the brain is a marker of N, nerve cell loss, in the A-T-N research scheme. It shows that nerve cells are lost, but not why.

**KEYPOINT (media.js)** · *clip*
- old: Alzheimer: atrophy is the "N"//N = nerve cell damage in the A, T, N scheme
- new: Alzheimer: atrophy is one "N" marker//N = nerve cell damage, not specific to Alzheimer's

**QA 1 answer**
- old: It is a scheme for research. Its authors say it is too early to use it in general practice.
- new: It was published in 2018 as a scheme for research; its authors said it was too early for general practice. A 2024 revision aims to bridge research and clinical care, but atrophy on MRI is still only a non-specific sign of nerve cell damage there.

**SOURCE added**
- new: Jack et al. 2024, Alzheimers Dement (revised criteria) | https://doi.org/10.1002/alz.13859 | Revised criteria of the Alzheimer's Association Workgroup, meant as a bridge between research and clinical care; atrophy on MRI stays a non-specific sign of neurodegeneration.

**BACKGROUND (presenter only)**
- old: in anti-amyloid trials the ventricles grew faster
- new: in trials of ARIA-inducing anti-amyloid antibodies the ventricles grew faster


## Slide 6 (`fs_thick`)

**QA 7 answer**
- old: No. SynthSeg gives a label for every voxel, and from that volumes. Thickness needs surfaces.
- new: No. SynthSeg gives a label for every voxel, and from that volumes, but no thickness. FreeSurfer measures thickness between two surfaces; voxel-based methods such as ANTs DiReCT can also estimate it from a segmentation.

**SOURCE added**
- new: Das et al. 2009, NeuroImage (DiReCT) | https://doi.org/10.1016/j.neuroimage.2008.12.016 | Cortical thickness measured from a voxel segmentation by registration, without surfaces (DiReCT, used in the ANTs cortical thickness pipeline).

**QA 1 answer**
- old: FreeSurfer takes the closest distance from the white surface to the pial surface.
- new: FreeSurfer takes the shortest distance from the white to the pial surface and the shortest distance back from the pial to the white surface, and averages the two.

**SOURCE description**
- old: from the two surfaces, with submillimetre accuracy; the spread
- new: from the two surfaces; the spread


## Slide 7 (`fs_atlas`)

**SOURCE description**
- old: the cortex inflated and mapped to a sphere; folding patterns aligned between brains.
- new: the cortex inflated and mapped to a sphere.

**SOURCE added**
- new: Fischl, Sereno, Tootell, Dale 1999, Hum Brain Mapp | https://doi.org/10.1002/(SICI)1097-0193(1999)8:4<272::AID-HBM10>3.0.CO;2-4 | An average folding pattern on the sphere; the folds of each brain are aligned to it, which gives a common coordinate system.


## Slide 8 (`ss_idea`)

**QA 6 answer**
- old: The authors then tested the network on 5,000 real scans of six image types and ten resolutions.
- new: The authors then evaluated it on about 5,000 real scans of six kinds of image (including CT) and ten resolutions; about 1,000 of them gave the training label maps, the rest were used for testing.

**QA 7 answer**
- old: to make it more robust against such lesions.
- new: to make it more robust against such lesions. This holds for the segmentation network; the QC network of slide 11 was trained on segmentations of deliberately degraded real scans.


## Slide 9 (`ss_fast`)

**SOURCE added**
- new: Billot et al. 2023, PNAS (robust SynthSeg, QC) | https://doi.org/10.1073/pnas.2216399120 | SynthSeg+ (robust version) with automatic QC scores per region; below 0.65 a region counts as failed.

**QA 5 answer**
- old: The authors tested it on 5,000 scans of six kinds of image and ten resolutions, also with thick slices.
- new: The authors evaluated it on about 5,000 scans of six kinds of image (including CT) and ten resolutions, also with thick slices; about 1,000 of them gave the training label maps.

**QA 3 answer**
- old: The authors name surfaces for cortical thickness as future work.
- new: In 2023 the authors named surfaces for cortical thickness as future work; the same group has since added recon-all-clinical to FreeSurfer, which estimates thickness on clinical scans of any contrast, less accurately with thick slices.

**BACKGROUND (presenter only)**
- old: Free Surfer expects a T one scan with good resolution.
- new: Free Surfer recon-all expects a T one scan with good resolution.

**SOURCE added**
- new: Gopinath et al. 2025, Med Image Anal (recon-all-clinical) | https://doi.org/10.1016/j.media.2025.103608 | recon-all-clinical: cortical surfaces and thickness on clinical scans of any contrast and resolution; less accurate with thick slices.


## Slide 10 (`classic_tissue`)

**SOURCE added**
- new: Patenaude et al. 2011, NeuroImage (FSL FIRST) | https://doi.org/10.1016/j.neuroimage.2011.02.046 | FSL FIRST: a shape and appearance model for 15 subcortical structures, learned from 336 hand-labelled T1 scans; median Dice 0.7 to 0.9.


## Slide 13 (`qc_test`)

**QA 3 answer**
- old: A program can hardly be shown to be better than that.
- new: In that challenge the best programs reached about the same Dice as these observers; above that level, differences against the reference are hard to interpret.

**SOURCE added**
- new: Kuijf et al. 2019, IEEE TMI (WMH Challenge) | https://doi.org/10.1109/TMI.2019.2905770 | WMH Segmentation Challenge: 60 training and 110 test scans, 5 scanners; best method Dice 0.80 (test scans); two other trained observers 0.77 and 0.79 against the reference (training scans).

**QA 6 answer**
- old: between two visits of the same people,
- new: between two visits of the same people, several years apart,


## Slide 14 (`fail_lesion`)

**CHECK why**
- old: Structures the lesion does not touch changed by less than 1 % in our test.
- new: Structures far from the lesion, such as the right thalamus, changed by less than 1 % in our test. Even untouched neighbours of the lesion, such as the left pallidum, could shift by a few percent.

**QA 3 answer**
- old: The healthy scan gives the right volume, so we can measure the error.
- new: The result on the same scan without the lesion is the reference, so the difference shows how much the lesion alone changes the volume.

**SOURCE added**
- new: Billot et al. 2023, Med Image Anal (SynthSeg) | https://doi.org/10.1016/j.media.2023.102789 | SynthSeg: a network trained only on synthetic images; segments scans of any contrast and resolution.


## Slide 15 (`fail_fix`)

**QA 5 answer**
- old: Every change is caused by the lesion, because the healthy scan is the truth.
- new: The run on the scan without the lesion is the reference, so the differences come from the lesion; beyond about 15 mm they are as small as the tool's own scatter.

**QA 7 answer**
- old: With 5 mm, 85 % of the structures on the stroke side stayed within 5 % of their true volume, as many as with mirror filling (82 %); untreated, only 67 %.
- new: With 5 mm, 85 % of the remaining structure parts on the stroke side stayed within 5 % of the volume measured without the lesion. With mirror filling 82 % of the whole structures did, untreated only 67 %. With a margin you measure only the part outside it.

**TEXT (spoken, slides.js text+notes)** · *voice*
- old: eighty five percent of the structures on the stroke side stayed within five percent, as good as mirror filling.
- new: eighty five percent of the remaining structure parts on the stroke side stayed within five percent; but then you measure only the part outside the margin.

**STEP 5 (spoken, steps.js)** · *voice*
- old: eighty five percent of the structures on the stroke side stayed within five percent, as good as mirror filling.
- new: eighty five percent of the remaining structure parts on the stroke side stayed within five percent; but then you measure only the part outside the margin.

**KEYPOINT (media.js)** · *clip*
- old: 5 mm margin: 85 % within 5 %//mirror filling 82 %, nothing done 67 %
- new: 5 mm margin: 85 % of the remaining parts within 5 %//whole structures: mirror filling 82 %, nothing done 67 %

**SOURCE added**
- new: Billot et al. 2023, PNAS (robust SynthSeg, QC) | https://doi.org/10.1073/pnas.2216399120 | SynthSeg+ (robust version) with automatic QC scores per region; below 0.65 a region counts as failed.


## Slide 16 (`ex1`)

**QA 4 answer**
- old: All of them are structures that FreeSurfer and SynthSeg label.
- new: FreeSurfer labels all seven; SynthSeg labels the six deep structures by default and the insula when you switch on its cortical parcellation (--parc).


## Slide 17 (`wmh_what`)

**CHECK question**
- old: On which image are these lesions bright?
- new: On which image do we see and segment these lesions best?


## Slide 18 (`wmh_use`)

**TEXT (spoken, slides.js text+notes)** · *voice*
- old: A grade by eye cannot reliably show such a small change.
- new: A standard grade by eye, such as the Fazekas scale, cannot reliably show such a small change.

**STEP 3 (spoken, steps.js)** · *voice*
- old: A grade by eye cannot reliably show such a small change.
- new: A standard grade by eye, such as the Fazekas scale, cannot reliably show such a small change.

**KEYPOINT (media.js)** · *clip*
- old: Small changes need a volume//a grade by eye is not reliable for small changes; a program gives millilitres
- new: Small changes need a volume//a standard grade by eye (Fazekas) is not reliable for small changes; a program gives millilitres

**QA 2 answer**
- old: That is where "almost three times" comes from: 29.5 divided by 10.5.
- new: That is where "almost three times" comes from: 29.5 divided by 10.5. After adjusting for age and other factors, the risk was still about 2.4 times higher. The people were older outpatients who had seen a doctor for minor complaints.

**QA 3 answer**
- old: about two and a half to three times the risk of stroke
- new: about two and a half (2019 meta-analysis) to three times (2010 meta-analysis) the risk of stroke

**QA 8 answer**
- old: severe white matter disease seen on CT means a higher bleeding risk, but the authors say this does not justify withholding the therapy.
- new: severe white matter disease seen on CT or MRI means a higher bleeding risk, but the authors of a meta-analysis say this does not justify withholding the therapy.

**QA 9 answer**
- old: The agreed list for MRI has six signs:
- new: The 2013 consensus (STRIVE) lists six core signs on MRI:

**QA 9 answer**
- old: Part 3 of this lecture
- new: The 2023 update (STRIVE-2) adds newer ones, such as tiny infarcts in the cortex. Part 3 of this lecture

**SOURCE description**
- old: US appropriate use recommendations for lecanemab: no treatment with more than 4 microhaemorrhages (taken from the trial exclusion criteria).
- new: US appropriate use recommendations for lecanemab (expert group, not the drug label): no treatment with severe white matter hyperintensities (Fazekas 3) or more than 4 microhaemorrhages, following the trial exclusion criteria.

**SOURCE added**
- new: Debette et al. 2019, JAMA Neurol (MRI markers, meta-analysis) | https://doi.org/10.1001/jamaneurol.2018.3122 | Meta-analysis: white matter hyperintensities go with a higher risk of stroke (HR 2.45), dementia (HR 1.84) and death (HR 2.00).

**SOURCE added**
- new: Valdés Hernández et al. 2013, Neuroepidemiology (visual score vs volume) | https://doi.org/10.1159/000341859 | 672 people of the Lothian Birth Cohort 1936: Fazekas score and lesion volume ranked them almost the same way (Spearman 0.78).

**SOURCE added**
- new: Charidimou et al. 2016, Stroke (leukoaraiosis and thrombolysis) | https://doi.org/10.1161/STROKEAHA.116.014096 | Meta-analysis on CT and MRI: white matter disease goes with more bleeding after thrombolysis, but this does not justify withholding the therapy.

**SOURCE added**
- new: Duering et al. 2023, Lancet Neurol (STRIVE-2) | https://doi.org/10.1016/S1474-4422(23)00131-X | Update of STRIVE: newer imaging features of small vessel disease; microbleeds are rated visually, computer methods still need validation.


## Slide 19 (`wmh_manual`)

**SOURCE description**
- old: two other experts 0.77 and 0.79
- new: two other trained observers 0.77 and 0.79


## Slide 22 (`bianca_small`)

**QA 2 answer**
- old: so roughly 2 to 5 cubic millimetres. A lesion under 10 cubic millimetres is only about 2 to 6 voxels.
- new: so roughly 3 to 4.5 cubic millimetres. A lesion under 10 cubic millimetres is only 1 to 3 voxels.

**SOURCE added**
- new: Kuijf et al. 2019, IEEE TMI (WMH Challenge) | https://doi.org/10.1109/TMI.2019.2905770 | WMH Segmentation Challenge: 60 training and 110 test scans, 5 scanners; best method Dice 0.80 (test scans); two other trained observers 0.77 and 0.79 against the reference (training scans).

**SOURCE added**
- new: Griffanti et al. 2016, NeuroImage (BIANCA) | https://doi.org/10.1016/j.neuroimage.2016.07.018 | BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another.


## Slide 23 (`unet`)

**SOURCE description**
- old: two other experts 0.77 and 0.79
- new: two other trained observers 0.77 and 0.79

**QA 6 answer**
- old: it won a competition on outlining nerve cell structures in electron microscopy.
- new: it set the best score on an open benchmark for outlining nerve cell structures in electron microscopy, and won a 2015 cell tracking challenge.

**SOURCE added**
- new: Isensee et al. 2021, Nat Methods (nnU-Net) | https://doi.org/10.1038/s41592-020-01008-z | nnU-Net configures preprocessing, network and training by itself; without manual tuning it beat most methods on 23 public data sets.


## Slide 24 (`bianca_vs_unet`)

**SOURCE description**
- old: two other experts 0.77 and 0.79
- new: two other trained observers 0.77 and 0.79

**QA 3 answer**
- old: The network also found more single lesions: 84 percent of them. Remember where BIANCA stood with the small ones.
- new: The network also found on average 84 percent of the single lesions per scan: 94 percent of the larger and 76 percent of the smaller half. The challenge counts lesions a little differently from us, so compare with BIANCA's small-lesion numbers only roughly.

**BACKGROUND (presenter only)**
- old: (in the challenge both were trained on the same 60 scans)
- new: (both were trained on the same 60 challenge training scans: the U-Net by its authors in the challenge, BIANCA by us)


## Slide 25 (`dice`)

**QA 7 answer**
- old: how well a second expert agrees with the reference
- new: how well a second rater agrees with the reference

**QA 6 answer**
- old: This slice was picked because it shows large, clear lesions. Over the whole scan of this same patient, Dice is about 0.70. And about 0.70 is also the mean over all 110 test scans.
- new: This slice was picked because it shows large, clear lesions. It comes from our reference BIANCA setup, whose mean over all 110 test scans is 0.67; our best setup reached 0.70, the number on the slide.


## Slide 26 (`raters`)

**SOURCE description**
- old: two other experts 0.77 and 0.79
- new: two other trained observers 0.77 and 0.79

**TEXT (spoken, slides.js text+notes)** · *voice*
- old: Two other experts reached only
- new: Two other trained observers reached only

**TEXT (spoken, slides.js text+notes)** · *voice*
- old: So that is the ceiling.
- new: So that is the level of a second rater: a useful yardstick, not a hard ceiling.

**STEP 1 (spoken, steps.js)** · *voice*
- old: Two other experts reached only
- new: Two other trained observers reached only

**STEP 2 (spoken, steps.js)** · *voice*
- old: So that is the ceiling.
- new: So that is the level of a second rater: a useful yardstick, not a hard ceiling.

**QA 3 question**
- old: Why is about 0.8 a ceiling? Why can a program not reach 1.0?
- new: Why can a program not reach 1.0?

**QA 3 answer**
- old: Because the reference is itself one expert opinion. A program that marked every lesion truly correctly would still differ from this reference, as much as a second careful expert does. So a score near the expert level is the best we can expect to measure.
- new: Because the reference is itself a human judgement: one expert's masks, checked by a second. A second careful rater agrees with it only to about 0.8. A program can score higher, but then it mostly imitates the habits of the reference rater, so differences above this level are hard to interpret.

**BACKGROUND (presenter only)**
- old: the disagreement between experts sets the ceiling
- new: the disagreement between experts sets a yardstick, not a hard ceiling

**KEYPOINT (media.js)** · *clip*
- old: two other experts vs reference: 0.77 and 0.79//on the 60 training scans
- new: two other trained observers vs reference: 0.77 and 0.79//on the 60 training scans


## Slide 27 (`dice_small`)

**SOURCE added**
- new: Maier-Hein et al. 2024, Nat Methods (Metrics Reloaded) | https://doi.org/10.1038/s41592-023-02151-z | Recommendations for choosing validation metrics in image analysis, including for small structures and for counting objects.

**SOURCE added**
- new: Reinke et al. 2024, Nat Methods (metric pitfalls) | https://doi.org/10.1038/s41592-023-02150-0 | Common pitfalls of metrics such as Dice, for example with small structures.

**SOURCE added**
- new: Griffanti et al. 2016, NeuroImage (BIANCA) | https://doi.org/10.1016/j.neuroimage.2016.07.018 | BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another.


## Slide 28 (`ex2`)

**SOURCE added**
- new: Kuijf et al. 2019, IEEE TMI (WMH Challenge) | https://doi.org/10.1109/TMI.2019.2905770 | WMH Segmentation Challenge: 60 training and 110 test scans, 5 scanners; best method Dice 0.80 (test scans); two other trained observers 0.77 and 0.79 against the reference (training scans).


## Slide 29 (`beat2`)

**SOURCE description**
- old: two other experts 0.77 and 0.79
- new: two other trained observers 0.77 and 0.79

**QA 10 answer**
- old: But keep the ceiling in mind: beyond the agreement between experts, a higher Dice says little.
- new: But keep the yardstick in mind: above the agreement between human raters, a higher Dice is hard to interpret.

**TEXT (spoken, slides.js text+notes)** · *voice*
- old: two other experts zero point seven seven
- new: two other human observers zero point seven seven

**STEP 2 (spoken, steps.js)** · *voice*
- old: two other experts zero point seven seven
- new: two other human observers zero point seven seven

**KEYPOINT (media.js)** · *clip*
- old: other experts: 0.77 and 0.79
- new: other human observers: 0.77 and 0.79

**QA 3 question**
- old: Am I better than the second expert?
- new: Am I better than the human observers?

**QA 3 answer**
- old: But the experts painted 60 whole scans
- new: But the human observers painted 60 whole scans

**QA 4 answer**
- old: The second expert, only roughly: that number comes from the 60 training scans.
- new: The human observers, only roughly: their numbers come from the 60 training scans.

**QA 1 answer**
- old: You painted three chosen slices of one patient, after a tutorial.
- new: You painted three of the eight prepared slices of one patient, after a tutorial.


## Slide 30 (`cmb_what`)

**SOURCE added**
- new: Wardlaw et al. 2013, Lancet Neurol (STRIVE) | https://doi.org/10.1016/S1474-4422(13)70124-8 | Neuroimaging standards for small vessel disease (STRIVE): definitions of six core MRI signs, including microbleeds (generally 2-5 mm, up to 10 mm).

**SOURCE added**
- new: Duering et al. 2023, Lancet Neurol (STRIVE-2) | https://doi.org/10.1016/S1474-4422(23)00131-X | Update of STRIVE: newer imaging features of small vessel disease; microbleeds are rated visually, computer methods still need validation.


## Slide 31 (`cmb_use`)

**SOURCE description**
- old: strictly lobar haemorrhagic lesions (bleeds, microbleeds, superficial siderosis) make the diagnosis.
- new: two or more strictly lobar haemorrhagic lesions (bleeds, microbleeds, superficial siderosis), or one plus a white matter sign, make the diagnosis probable in people aged 50 or over with a typical presentation.

**QA 5 answer**
- old: This is the one place where a count is a hard rule.
- new: Anti-amyloid therapy is the one area where counts are hard rules: more than 4 before treatment, and these grades during treatment.

**QA 10 answer**
- old: We could not verify a guideline rule on this, so we do not state one.
- new: The US stroke guideline (AHA/ASA 2019) treats more than 10 microbleeds as a situation in which the benefit of the therapy is uncertain, a weak recommendation, not a strict exclusion.

**SOURCE added**
- new: Nandigam et al. 2009, AJNR (microbleed detection and sequence) | https://doi.org/10.3174/ajnr.A1355 | How many microbleeds are found depends on the sequence and its settings; susceptibility-weighted imaging finds more.

**SOURCE added**
- new: Cheng et al. 2013, Stroke (SWI vs GRE, rater agreement) | https://pubmed.ncbi.nlm.nih.gov/23920014/ | Raters agreed better on microbleed counts on SWI than on T2* gradient echo.

**SOURCE added**
- new: Akoudad et al. 2016, JAMA Neurol (microbleeds and dementia) | https://doi.org/10.1001/jamaneurol.2016.1017 | Rotterdam Study: microbleeds go with cognitive decline and a higher risk of dementia (HR 2.02).

**SOURCE added**
- new: Tsivgoulis et al. 2016, JAMA Neurol (microbleeds and thrombolysis) | https://doi.org/10.1001/jamaneurol.2016.0292 | Meta-analysis of 9 studies, 2,479 patients: more symptomatic bleeding after thrombolysis with more than 10 microbleeds (RR 12.1, wide confidence interval).

**SOURCE added**
- new: Powers et al. 2019, Stroke (AHA/ASA acute stroke guideline) | https://doi.org/10.1161/STR.0000000000000211 | US guideline for acute ischaemic stroke; with more than 10 microbleeds the benefit of thrombolysis is uncertain (weak recommendation), not a strict exclusion.


## Slide 32 (`cmb_unet`)

**BACKGROUND (presenter only)**
- old: In the next slides we use twenty-six connected clusters.
- new: In the next slides we use twenty-six connected clusters (VALDO used six-connected clusters, so our F one values are not computed exactly like theirs).

**SOURCE added**
- new: Ronneberger et al. 2015, MICCAI (U-Net) | https://doi.org/10.1007/978-3-319-24574-4_28 | U-Net: the encoder-decoder network with skip connections for biomedical image segmentation.

**SOURCE added**
- new: Maier-Hein et al. 2024, Nat Methods (Metrics Reloaded) | https://doi.org/10.1038/s41592-023-02151-z | Recommendations for choosing validation metrics in image analysis, including for small structures and for counting objects.


## Slide 33 (`f1`)

**SOURCE added**
- new: Maier-Hein et al. 2024, Nat Methods (Metrics Reloaded) | https://doi.org/10.1038/s41592-023-02151-z | Recommendations for choosing validation metrics in image analysis, including for small structures and for counting objects.


## Slide 34 (`count4`)

**BACKGROUND (presenter only)**
- old: for donanemab any superficial siderosis also excludes.
- new: for both drugs any superficial siderosis also excludes (for donanemab this is stricter than its trial, which allowed one area).


## Slide 35 (`cmb_vessel`)

**QA 2 answer**
- old: In this example the slices are 0.8 millimetres thin,
- new: In this example the slices are 0.8 millimetres apart (acquired at 1.6 millimetres and interpolated),

**QA 9 answer**
- old: on scans with thin 0.8 millimetre slices,
- new: on scans with thin slices (1.6 millimetres, interpolated to 0.8),


## Slide 37 (`beat3`)

**SOURCE added**
- new: Duering et al. 2023, Lancet Neurol (STRIVE-2) | https://doi.org/10.1016/S1474-4422(23)00131-X | Update of STRIVE: newer imaging features of small vessel disease; microbleeds are rated visually, computer methods still need validation.


## Slide 38 (`train_vs_own`)

**SOURCE description**
- old: two other experts 0.77 and 0.79
- new: two other trained observers 0.77 and 0.79

**BACKGROUND (presenter only)**
- old: the trend matches BIANCA (under 10 voxels 24 % found, over 1,000 voxels 99 %)
- new: the trend matches BIANCA (lesions under 10 mm3: 24 % found; over 1,000 mm3 (1 ml): 99 %)

**QA 9 answer**
- old: the centre of a detection must lie at most 2 mm, within the slice, from a voxel of the microbleed, and at most 2 mm worth of slices above or below, at least one slice.
- new: a detection counts if its centre lies at most 2 mm from a voxel of the microbleed within the slice, and at most N slices above or below, where N is 2 mm divided by the slice thickness, rounded down, but at least 1: one slice for 3 to 4 mm slices, two slices for 0.8 mm slices.

**BACKGROUND (presenter only)**
- old: the centre of a detection lies at most 2 mm from a microbleed voxel in the slice and at most one slice away.
- new: the centre of a detection lies at most 2 mm from a microbleed voxel in the slice and at most N slices away, N = max(1, floor(2 mm / slice thickness)): one slice for 3-4 mm slices, two for 0.8 mm slices.


## Slide 39 (`adapt`)

**BACKGROUND (presenter only)**
- old: a known scanner (GE 3 T) gained about the same (0.68 -> 0.68)
- new: a known scanner (GE 3 T) did not change either (0.68 -> 0.68)


## Slide 40 (`outlook_transformer`)

**QA 8 question**
- old: Why is there no MRI model like CT-CHAT yet?
- new: Why did MRI + English come later than CT?

**QA 8 answer**
- old: Such a model needs a large public set of scans with their reports.
- new: A model like CT-CHAT that anyone can train needs a large public set of scans with their reports.

**KEYPOINT (media.js)** · *clip*
- old: MRI + English: next//public data 2026, model to come
- new: MRI + English: next//public data 2026, its model to come


## Slide 41 (`exam`)

**SOURCE description**
- old: two other experts 0.77 and 0.79
- new: two other trained observers 0.77 and 0.79

**BACKGROUND (presenter only)**
- old: (BIANCA under 10 voxels 24 %; our microbleed detector under 2 mm 4 of 10)
- new: (BIANCA: lesions under 10 mm3, 24 % found; our microbleed detector: under 2 mm, 4 of 10)

**SOURCE added**
- new: Billot et al. 2023, PNAS (robust SynthSeg, QC) | https://doi.org/10.1073/pnas.2216399120 | SynthSeg+ (robust version) with automatic QC scores per region; below 0.65 a region counts as failed.

**QA 1 answer**
- old: VALDO microbleed models: 72 older people.
- new: VALDO microbleed models: 72 scans of middle-aged and older adults from 3 scanners.

**QA 9 answer**
- old: A SynthSeg QC score below 0.65 means failed.
- new: A SynthSeg QC score below 0.65 for any structure flags the segmentation as likely failed: look at it.

**BACKGROUND (presenter only)**
- old: (BIANCA: just add them, retraining takes minutes)
- new: (BIANCA: just add them, retraining takes under a minute)

