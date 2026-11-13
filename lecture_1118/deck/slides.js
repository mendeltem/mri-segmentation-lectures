window.SLIDES = [
 {
  "n": 1,
  "key": "plan",
  "title": "Three tasks today",
  "part": "Opening",
  "kind": "clip",
  "clip": "clips/01_plan.mp4",
  "poster": "poster/01_plan.jpg",
  "text": "Three tasks today. Grey matter: how big is each brain region? White matter lesions: how much is there? And micro-bleeds: how many are there?",
  "check": {
   "q": "Which of the three targets is the smallest?",
   "options": [
    "Cortex",
    "White matter lesions",
    "Microbleeds"
   ],
   "answer": 2,
   "why": "Microbleeds are only a few millimetres wide."
  },
  "exercise": null,
  "sources": [],
  "optional": false,
  "key_q": false,
  "notes": "Three tasks today. Grey matter: how big is each brain region? White matter lesions: how much is there? And micro-bleeds: how many are there?",
  "background": "In this lecture we cover three segmentation targets in brain M R I. Each target is small or subtle, and each needs its own tool and its own check. Part one is grey matter. We use Free Surfer and Synth Seg. We check the result with Q C, a quality score. Part two is W M H, white matter hyperintensities. We use Bianka and a U net. We check the result with the Dice score. Part three is micro-bleeds. We use a 3D U net again. We check the result with the F one score. Notice the pattern: a target, a method, a score. After each part you will try a short task yourself. Quick question to the room: which of the three targets is the smallest? Cortex, white matter lesions, or micro-bleeds? Keep your answer. We will come back to it.",
  "qr": null
 },
 {
  "n": 2,
  "key": "intro",
  "title": "Segmentation: one label per voxel",
  "part": "Opening",
  "kind": "clip",
  "clip": "clips/02_intro.mp4",
  "poster": "poster/02_intro.jpg",
  "text": "An M. R. I. scan is made of small cubes, the voxels. Here, each one is a cube of one millimetre. Segmentation gives every voxel a label: a name, like cortex or thalamus. Count the voxels of one label, and you have its volume. A thousand voxels are one millilitre. This cortex: five hundred sixty two millilitres.",
  "check": {
   "q": "A voxel is 1 mm x 1 mm x 1 mm. How many voxels make 1 ml?",
   "options": [
    "100",
    "1,000",
    "10,000"
   ],
   "answer": 1,
   "why": "1 ml = 1 cm3 = 10 x 10 x 10 mm."
  },
  "exercise": null,
  "sources": [
   {
    "label": "Data: Dallas Lifespan Brain Study, CC0",
    "url": "https://doi.org/10.18112/openneuro.ds004856.v1.3.0",
    "about": "Dallas Lifespan Brain Study: public MRI data (CC0), used for our grey-matter pictures."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "An M. R. I. scan is made of small cubes, the voxels. Here, each one is a cube of one millimetre. Segmentation gives every voxel a label: a name, like cortex or thalamus. Count the voxels of one label, and you have its volume. A thousand voxels are one millilitre. This cortex: five hundred sixty two millilitres.",
  "background": "Welcome. Today we segment brain regions from M R I. A scan is a grid of voxels. Each voxel has one brightness value. Segmentation assigns one label per voxel. Labels can be cortex, white matter, thalamus, and more. Once we have labels, we can count. Here, five hundred sixty two thousand voxels are labelled cortex. Each voxel is one cubic millimetre. So the cortex volume is five hundred sixty two millilitres. This is the core idea for the whole lecture. We will meet three tasks. First, grey matter. Second, white matter hyperintensities. Third, cerebral micro-bleeds. For each task, we look at methods, quality control, and testing. A quick question to the room: if a voxel is one cubic millimetre, how many voxels make one millilitre? Think for a moment. The answer is one thousand. One millilitre equals one cubic centimetre. That is ten by ten by ten millimetres. Keep this in mind. It helps you read volumes in papers. Now we start with grey matter.",
  "qr": null
 },
 {
  "n": 3,
  "key": "gm_use",
  "title": "What are brain volumes used for?",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/03_gm_use.mp4",
  "poster": "poster/03_gm_use.jpg",
  "text": "Why measure volumes at all? Three real examples. In Alzheimer research, atrophy, the shrinking of the brain, is one of three markers of the disease. Drug trials use it as an outcome. In multiple sclerosis, drugs that slowed the shrinking more also slowed disability more. Brain charts pool more than a hundred thousand people. Like growth charts for children, they show what is normal at each age. And many centres pool their scans. In depression, the hippocampus is about one percent smaller: too little to see in one patient, but clear in thousands.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Jack et al. 2018, Alzheimers Dement (AT(N) research framework)",
    "url": "https://doi.org/10.1016/j.jalz.2018.02.018",
    "about": "Research definition of Alzheimer's disease by biomarkers: amyloid (A), tau (T), neurodegeneration (N). Atrophy on MRI is one (N) marker; not specific, and not meant for routine practice."
   },
   {
    "label": "Sormani et al. 2014, Ann Neurol (atrophy in MS trials)",
    "url": "https://doi.org/10.1002/ana.24018",
    "about": "Meta-analysis of 13 multiple sclerosis trials (more than 13,500 patients): the more a drug slowed brain atrophy, the more it slowed disability (R2 = 0.48)."
   },
   {
    "label": "Bethlehem et al. 2022, Nature (brain charts)",
    "url": "https://doi.org/10.1038/s41586-022-04554-y",
    "about": "Brain charts for the human lifespan: 123,984 scans of 101,457 people, from 115 days after conception to 100 years; gives centiles like a growth chart."
   },
   {
    "label": "Schmaal et al. 2016, Mol Psychiatry (ENIGMA depression)",
    "url": "https://doi.org/10.1038/mp.2015.69",
    "about": "ENIGMA consortium: 1,728 patients with depression and 7,199 controls from 15 samples; hippocampus 1.24 % smaller (Cohen's d = -0.14)."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Why measure volumes at all? Three real examples. In Alzheimer research, atrophy, the shrinking of the brain, is one of three markers of the disease. Drug trials use it as an outcome. In multiple sclerosis, drugs that slowed the shrinking more also slowed disability more. Brain charts pool more than a hundred thousand people. Like growth charts for children, they show what is normal at each age. And many centres pool their scans. In depression, the hippocampus is about one percent smaller: too little to see in one patient, but clear in thousands.",
  "background": "Real studies, to show why the numbers matter. (1) NIA-AA research framework (Jack 2018): Alzheimer's disease is defined by biomarkers, A = amyloid, T = tau, (N) = neurodegeneration; atrophy on MRI is one of the (N) markers. It is not specific for Alzheimer's disease, and the framework is meant for research, not for routine practice. (2) Multiple sclerosis: meta-analysis of 13 trials with more than 13,500 patients (Sormani 2014); the treatment effect on brain atrophy went with the treatment effect on disability (R2 = 0.48). This holds for trials (groups), not for one patient. Extra, if asked: in anti-amyloid trials the ventricles grew faster on drug than on placebo (Alves 2023, +2.1 ml). (3) Brain charts (Bethlehem 2022): 123,984 scans of 101,457 people, from 115 days after conception to 100 years; a person gets a centile, there is no fixed cut-off. (4) ENIGMA depression group (Schmaal 2016): 1,728 patients and 7,199 controls, hippocampus 1.24 % smaller (Cohen's d = -0.14). For contrast: in temporal lobe epilepsy with hippocampal sclerosis the hippocampus on the seizure side is much smaller (d about -1.8, Whelan 2018); that one you can see in a single patient.",
  "qr": null
 },
 {
  "n": 4,
  "key": "fs_idea",
  "title": "FreeSurfer: the cortex as a folded sheet",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/04_fs_idea.mp4",
  "poster": "poster/04_fs_idea.jpg",
  "text": "Free Surfer is the classic tool. It sees the cortex as a folded sheet, only a few millimetres thin. So it does not count voxels: it draws two surfaces. The white surface is the inner border, between white and grey matter. The pial surface is the outer border. The distance between them is the cortical thickness.",
  "check": {
   "q": "Cortical thickness is the distance between ...",
   "options": [
    "skull and brain",
    "white surface and pial surface",
    "left and right hemisphere"
   ],
   "answer": 1,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Dale, Fischl, Sereno 1999, NeuroImage",
    "url": "https://doi.org/10.1006/nimg.1998.0395",
    "about": "FreeSurfer part I: segmentation and the white and pial surface of the cortex."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Free Surfer is the classic tool. It sees the cortex as a folded sheet, only a few millimetres thin. So it does not count voxels: it draws two surfaces. The white surface is the inner border, between white and grey matter. The pial surface is the outer border. The distance between them is the cortical thickness.",
  "background": "Free Surfer is the classic tool for cortical reconstruction. It treats the cortex as a folded sheet. It builds two surfaces for each hemisphere. The white surface lies between white and grey matter. The pial surface is the outside of the cortex. The distance between the two is the cortical thickness. This gives us a thickness value at every point on the cortex. It also gives us the shape of the folds. Why do we care? Thickness changes in ageing, in Alzheimer's disease, and in many other conditions. Ask the room: what could make the measured thickness wrong? For example a blurred border between grey and white matter. It is free, and it runs on standard M R I scans. But it is slow, and it can fail on scans with motion or lesions. That is why Q C matters, and why we will look at Synth Seg next.",
  "qr": null
 },
 {
  "n": 5,
  "key": "fs_thick",
  "title": "Cortical thickness, point by point",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/05_fs_thick.mp4",
  "poster": "poster/05_fs_thick.jpg",
  "text": "How thick is the cortex at one point? Free Surfer has two surfaces. The white surface is the inner border. The pial surface is the outer border. From every point of one surface, it measures the shortest way to the other surface. A short way means thin cortex. A long way means thick cortex. Colour every point by its distance, and you get a thickness map. The surfaces run between the voxels. So the map can show differences smaller than one voxel. You see where the cortex gets thinner, not only that it shrinks. Now the same on a whole brain: Free Surfer's average brain. The white surface grows outwards, to the pial surface. Then every point gets its colour. Purple is thin cortex. Yellow is thick cortex.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Fischl, Dale 2000, PNAS (cortical thickness)",
    "url": "https://doi.org/10.1073/pnas.200033797",
    "about": "How FreeSurfer measures cortical thickness from the two surfaces; differences between people below 0.5 mm."
   },
   {
    "label": "FreeSurfer: recon-all",
    "url": "https://surfer.nmr.mgh.harvard.edu/fswiki/recon-all",
    "about": "FreeSurfer documentation of recon-all, the command that runs the whole pipeline."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "How thick is the cortex at one point? Free Surfer has two surfaces. The white surface is the inner border. The pial surface is the outer border. From every point of one surface, it measures the shortest way to the other surface. A short way means thin cortex. A long way means thick cortex. Colour every point by its distance, and you get a thickness map. The surfaces run between the voxels. So the map can show differences smaller than one voxel. You see where the cortex gets thinner, not only that it shrinks. Now the same on a whole brain: Free Surfer's average brain. The white surface grows outwards, to the pial surface. Then every point gets its colour. Purple is thin cortex. Yellow is thick cortex.",
  "background": "This slide is a sketch, not data: a cut through the cortex. The blue line is the white surface, the border between white and grey matter. The orange line is the pial surface, the border between grey matter and brain fluid. FreeSurfer measures, at every point of the surface, the closest distance to the other surface (FreeSurfer documentation). That number is the thickness at this point, and every point gets its own colour: a thickness map. Why not count voxels? A voxel is about 1 mm, the cortex only a few millimetres thin. The surfaces are placed between the voxels, from the grey values of several neighbours, so the documentation says the maps can detect submillimetre differences. Fischl and Dale (2000) reported differences between people of less than 0.5 mm. Point out: volume is roughly thickness times area, so thickness tells you something that volume alone hides. The last part is real: FreeSurfer's average brain (the template called fsaverage, shipped with the software), left hemisphere. You see the white surface grow into the pial surface, and then the average thickness at every point. Thin along the central sulcus and at the back, thicker at the front and at the temporal pole. It is an average of many adults, not one person.",
  "qr": null
 },
 {
  "n": 6,
  "key": "fs_atlas",
  "title": "From folds to named regions",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/06_fs_atlas.mp4",
  "poster": "poster/06_fs_atlas.jpg",
  "text": "To name the folds, Free Surfer blows the surface up into a sphere. There it matches the folds to an average brain. So every fold gets a name: thirty four regions per hemisphere.",
  "check": {
   "q": "How many regions per hemisphere has the Desikan-Killiany atlas?",
   "options": [
    "12",
    "34",
    "148"
   ],
   "answer": 1,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Fischl, Sereno, Dale 1999, NeuroImage",
    "url": "https://doi.org/10.1006/nimg.1998.0396",
    "about": "FreeSurfer part II: the cortex inflated and mapped to a sphere; folding patterns aligned between brains."
   },
   {
    "label": "Desikan et al. 2006, NeuroImage",
    "url": "https://doi.org/10.1016/j.neuroimage.2006.01.021",
    "about": "Automatic labelling of 34 cortical regions per hemisphere, learned from 40 hand-labelled brains."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "To name the folds, Free Surfer blows the surface up into a sphere. There it matches the folds to an average brain. So every fold gets a name: thirty four regions per hemisphere.",
  "background": "The problem is simple: a folded cortex is hard to compare across people. Free Surfer solves it in three steps. First, it inflates the surface. The deep sulci open up, and the whole cortex becomes a balloon. Second, it blows the balloon up into a sphere. Third, on that sphere it aligns the folding pattern to an average of forty brains. After alignment, the same fold sits at the same place in every subject. So we can transfer labels from the average to the individual. The labels come from the Desikan Killiany atlas. It has thirty four named regions per hemisphere. It was learned from forty hand labelled brains. So the atlas is only as good as those forty brains. Question to the room: which region would you trust least, and why? Keep in mind that the atlas is a model, not ground truth. In the next slides we look at newer methods that learn labels directly from data.",
  "qr": null
 },
 {
  "n": 7,
  "key": "fs_steps",
  "title": "From scan to surface: five steps",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/07_fs_steps.mp4",
  "poster": "poster/07_fs_steps.jpg",
  "text": "How does Free Surfer get from a scan to these surfaces? In a fixed chain of steps. First it cleans the image and removes the skull. Only the brain is left. Then every voxel is sorted: white matter, or not. The white matter becomes one solid body in each hemisphere. Around this body it lays a mesh of small triangles: the white surface. Holes are repaired, because the real cortex is one closed sheet. This surface is pushed outwards, until the grey matter ends. That is the pial surface. Last, the surface is inflated, matched to the average brain, and the regions get their names. Every step needs the one before. So one early mistake, such as a piece of skull left behind, spoils everything after it.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "FreeSurfer: recon-all",
    "url": "https://surfer.nmr.mgh.harvard.edu/fswiki/recon-all",
    "about": "FreeSurfer documentation of recon-all, the command that runs the whole pipeline."
   },
   {
    "label": "Dale, Fischl, Sereno 1999, NeuroImage",
    "url": "https://doi.org/10.1006/nimg.1998.0395",
    "about": "FreeSurfer part I: segmentation and the white and pial surface of the cortex."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "How does Free Surfer get from a scan to these surfaces? In a fixed chain of steps. First it cleans the image and removes the skull. Only the brain is left. Then every voxel is sorted: white matter, or not. The white matter becomes one solid body in each hemisphere. Around this body it lays a mesh of small triangles: the white surface. Holes are repaired, because the real cortex is one closed sheet. This surface is pushed outwards, until the grey matter ends. That is the pial surface. Last, the surface is inflated, matched to the average brain, and the regions get their names. Every step needs the one before. So one early mistake, such as a piece of skull left behind, spoils everything after it.",
  "background": "The students should see that FreeSurfer is a chain, not one magic step. One: the scan is resampled to 1 mm voxels (a grid of 256 in each direction), the brightness is evened out and the skull is removed. Two: the white matter is segmented. Three: a mesh of triangles is laid around the white matter, the white surface, and holes and handles are repaired, because the cortex of one hemisphere is one closed sheet. Four: this surface is pushed outwards to the border between grey matter and fluid, the pial surface. Five: inflate, sphere, match to the average brain, name the regions, as on the slide before. Stress the consequence: each step uses the result of the step before. A piece of skull left in step one pulls the pial surface outwards in step four. This is why you look at the surfaces, and why repairs are made early in the chain and the later steps are run again. The picture: steps one to four run on one slice of a public scan, the same image all the time. The skull fades, the white matter is filled, a blue line is drawn around it, an orange line moves outwards. These masks and lines are an illustration drawn from automatic labels of this slice, not FreeSurfer output; a real pial surface goes deeper into the folds. In one slice a surface shows as a line.",
  "qr": null
 },
 {
  "n": 8,
  "key": "fs_run",
  "title": "One command, many hours",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/08_fs_run.mp4",
  "poster": "poster/08_fs_run.jpg",
  "text": "One command does it all: recon all, on a T one scan. Behind it are many steps, one after the other. It needs time: hours per scan, because the surfaces are fitted and repaired point by point. And it struggles with clinical scans. It was made for research scans, with thin slices and good contrast. Thick slices, motion or lesions break the surfaces.",
  "check": {
   "q": "What does recon-all need as input?",
   "options": [
    "A T1 image with about 1 mm voxels",
    "Any clinical scan",
    "A CT scan"
   ],
   "answer": 0,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "FreeSurfer: recon-all",
    "url": "https://surfer.nmr.mgh.harvard.edu/fswiki/recon-all",
    "about": "FreeSurfer documentation of recon-all, the command that runs the whole pipeline."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "One command does it all: recon all, on a T one scan. Behind it are many steps, one after the other. It needs time: hours per scan, because the surfaces are fitted and repaired point by point. And it struggles with clinical scans. It was made for research scans, with thin slices and good contrast. Thick slices, motion or lesions break the surfaces.",
  "background": "So here is the workhorse of cortical reconstruction. One command, recon all, does the whole pipeline. You give it a T one image with roughly one millimetre voxels. That is the standard research scan. Then you wait. Several hours for a single scan. This tool was designed for research data, not for routine clinical images. If your slices are thick, or the contrast is different, it struggles. It may fail outright. Think about your own data. Do you have a one millimetre T one? If not, recon all may not be the right tool. Ask yourself: how many scans do I need to process? If it is hundreds, several hours each adds up fast. That is why people look for faster alternatives, like Synth Seg, which we will see next. But for now, remember the input: a good T one, about one millimetre. And remember the cost: hours per scan.",
  "qr": null
 },
 {
  "n": 9,
  "key": "ss_idea",
  "title": "SynthSeg: trained on images that never existed",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/09_ss_idea.mp4",
  "poster": "poster/09_ss_idea.jpg",
  "text": "Synth Seg is a neural network that never saw a real scan. It trained on fake images with random contrast and resolution. So a real scan is just one more variation.",
  "check": {
   "q": "What was SynthSeg trained on?",
   "options": [
    "Real T1 scans from one scanner",
    "Synthetic images made from label maps",
    "CT scans"
   ],
   "answer": 1,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Billot et al. 2023, Med Image Anal (SynthSeg)",
    "url": "https://doi.org/10.1016/j.media.2023.102789",
    "about": "SynthSeg: a network trained only on synthetic images; segments scans of any contrast and resolution."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Synth Seg is a neural network that never saw a real scan. It trained on fake images with random contrast and resolution. So a real scan is just one more variation.",
  "background": "SynthSeg is a segmentation tool for brain MRI. Its training is unusual. It never saw a real scan. Instead, a generator takes label maps and makes synthetic images. Each synthetic image has random contrast, random resolution and random noise. The network learns to find the labels in all of these images. This makes it robust to many scanners and many protocols. After training, a real scan is just one more variation. Ask the room: why could this help when your scanner or sequence differs from the training data? One example: a T1 scan from a new scanner may look different from older scans. A network trained only on real scans from one site may fail. SynthSeg can still work because it learned from many synthetic contrasts. In practice, you can run SynthSeg on a T1 scan and get a whole-brain segmentation. It labels grey matter, white matter and many subcortical structures. It also works on scans with low resolution. This is useful for large studies and for clinical scans. But always check the output. No segmentation is perfect.",
  "qr": null
 },
 {
  "n": 10,
  "key": "ss_make",
  "title": "How one fake image is made",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/10_ss_make.mp4",
  "poster": "poster/10_ss_make.jpg",
  "text": "How is one fake image made? It starts with a label map of a brain. No scan, only the labels. First, bend it. The map is turned, stretched and warped at random. So every brain shape is new. Second, paint it. Every label gets a random grey value. White matter may be bright, dark, or in between. That is the trick: the contrast tells the network nothing. Only the shape does. Third, add what a scanner adds: uneven brightness across the image, and noise. Fourth, make it coarse: thick, blurred slices, like a clinical scan. The network gets this image, and must give back the sharp label map. And at every training step, it gets a new one.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Billot et al. 2023, Med Image Anal (SynthSeg)",
    "url": "https://doi.org/10.1016/j.media.2023.102789",
    "about": "SynthSeg: a network trained only on synthetic images; segments scans of any contrast and resolution."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "How is one fake image made? It starts with a label map of a brain. No scan, only the labels. First, bend it. The map is turned, stretched and warped at random. So every brain shape is new. Second, paint it. Every label gets a random grey value. White matter may be bright, dark, or in between. That is the trick: the contrast tells the network nothing. Only the shape does. Third, add what a scanner adds: uneven brightness across the image, and noise. Fourth, make it coarse: thick, blurred slices, like a clinical scan. The network gets this image, and must give back the sharp label map. And at every training step, it gets a new one.",
  "background": "The pictures are a simplified illustration on one slice of a public scan; the real generator works in 3-D (Billot 2023, Methods). Start: a label map, picked at random from about a thousand maps (20 drawn by hand, 1,000 automatic). Step 1: a random turn, stretch, shear and a smooth warp. Step 2: every label gets a random mean grey value and a random spread; this is where the contrast is randomised. Step 3: a smooth bias field and a random change of the brightness curve. Step 4: blur and thick slices in a random direction, then back to the 1 mm grid, so the network learns to return sharp 1 mm labels from a coarse image. A new image is made at every one of the 300,000 training steps; no real scan is ever used. If someone asks whether realistic images would be better: the authors tried, and narrowing the contrast to the target scans made the result worse.",
  "qr": null
 },
 {
  "n": 11,
  "key": "ss_fast",
  "title": "Any contrast, in minutes",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/11_ss_fast.mp4",
  "poster": "poster/11_ss_fast.jpg",
  "text": "Because of this training, it works on almost any contrast and resolution, without retraining. And it is fast: the scan goes through the network once. About a minute on a normal computer. But it gives volumes, not surfaces. For cortical thickness, you still need Free Surfer.",
  "check": {
   "q": "Clinical FLAIR scans with 5 mm slices, and you want volumes. Which tool?",
   "options": [
    "FreeSurfer recon-all",
    "SynthSeg",
    "Neither can work"
   ],
   "answer": 1,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Billot et al. 2023, Med Image Anal (SynthSeg)",
    "url": "https://doi.org/10.1016/j.media.2023.102789",
    "about": "SynthSeg: a network trained only on synthetic images; segments scans of any contrast and resolution."
   }
  ],
  "optional": false,
  "key_q": true,
  "notes": "Because of this training, it works on almost any contrast and resolution, without retraining. And it is fast: the scan goes through the network once. About a minute on a normal computer. But it gives volumes, not surfaces. For cortical thickness, you still need Free Surfer.",
  "background": "Synth Seg is a deep learning tool for brain M R I. It segments grey matter, white matter, and many other structures. It works on almost any contrast and resolution. You do not need to retrain it for a new scan type. That is the main selling point. It is fast. On a graphics card it takes seconds. On a processor it takes one to two minutes. Sources differ a little on the exact numbers, but the order of magnitude is clear. The output is volumes, not surfaces. So you get millilitres per region. You do not get cortical thickness. For thickness you still need Free Surfer. A question for the room: you have a clinical FLAIR scan with five millimetre slices. You want volumes. Which tool do you pick? Free Surfer recon-all, Synth Seg, or neither? Think about it for a moment. The answer is Synth Seg. Free Surfer expects a T one scan with good resolution. Synth Seg can handle the FLAIR. That is the practical difference.",
  "qr": null
 },
 {
  "n": 12,
  "key": "tool_choice",
  "title": "FreeSurfer or SynthSeg?",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/12_tool_choice.mp4",
  "poster": "poster/12_tool_choice.jpg",
  "text": "Free Surfer or Synth Seg? Ask three questions. One: do you need cortical thickness, or surfaces? Then Free Surfer. And then you need a good research scan. Two: are your scans clinical, with thick slices or another contrast? Then Synth Seg. Three: do you have thousands of scans, and little time? Also Synth Seg. And whichever you choose: look at the result. Both tools always give an answer. Not always a right one.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "FreeSurfer: recon-all",
    "url": "https://surfer.nmr.mgh.harvard.edu/fswiki/recon-all",
    "about": "FreeSurfer documentation of recon-all, the command that runs the whole pipeline."
   },
   {
    "label": "Billot et al. 2023, Med Image Anal (SynthSeg)",
    "url": "https://doi.org/10.1016/j.media.2023.102789",
    "about": "SynthSeg: a network trained only on synthetic images; segments scans of any contrast and resolution."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Free Surfer or Synth Seg? Ask three questions. One: do you need cortical thickness, or surfaces? Then Free Surfer. And then you need a good research scan. Two: are your scans clinical, with thick slices or another contrast? Then Synth Seg. Three: do you have thousands of scans, and little time? Also Synth Seg. And whichever you choose: look at the result. Both tools always give an answer. Not always a right one.",
  "background": "This slide closes the comparison before the quality check. Three questions. Do you need cortical thickness or surfaces? Then FreeSurfer, and you need a good T1 with about 1 mm voxels. Are the scans clinical, with thick slices or another contrast such as FLAIR or T2? Then SynthSeg; it gives volumes of the same structures. Do you have thousands of scans? SynthSeg needs about a minute per scan on a normal computer, FreeSurfer hours. Say clearly: do not mix tools or versions inside one study, the numbers differ systematically. And the last box is the bridge to the next slides: both tools always produce a result, even on a bad scan. So how do we know when not to trust it? For the curious: the current FreeSurfer also ships a script for surfaces on clinical scans (recon-all-clinical); we have not tested it.",
  "qr": null
 },
 {
  "n": 13,
  "key": "qc_score",
  "title": "How do we know it is right? The QC score",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/13_qc_score.mp4",
  "poster": "poster/13_qc_score.jpg",
  "text": "How do we know a segmentation is right? Nobody can look at ten thousand scans. So Synth Seg scores its own result. A second small network looks only at the label map, not at the scan. It has learned how good label maps look, and how broken ones look. So for each region, it guesses the quality: a score between zero and one. Below zero point six five, a region fails. This scan passes. This one fails. Look at it.",
  "check": {
   "q": "A region gets a QC score of 0.60. What now?",
   "options": [
    "Fine, it passed",
    "It failed: look at this scan",
    "Delete the scan unseen"
   ],
   "answer": 1,
   "why": "Below 0.65 the region fails."
  },
  "exercise": null,
  "sources": [
   {
    "label": "Billot et al. 2023, PNAS (robust SynthSeg, QC)",
    "url": "https://doi.org/10.1073/pnas.2216399120",
    "about": "SynthSeg+ (robust version) with automatic QC scores per region; below 0.65 a region counts as failed."
   },
   {
    "label": "Data: Dallas Lifespan Brain Study, CC0",
    "url": "https://doi.org/10.18112/openneuro.ds004856.v1.3.0",
    "about": "Dallas Lifespan Brain Study: public MRI data (CC0), used for our grey-matter pictures."
   }
  ],
  "optional": false,
  "key_q": true,
  "notes": "How do we know a segmentation is right? Nobody can look at ten thousand scans. So Synth Seg scores its own result. A second small network looks only at the label map, not at the scan. It has learned how good label maps look, and how broken ones look. So for each region, it guesses the quality: a score between zero and one. Below zero point six five, a region fails. This scan passes. This one fails. Look at it.",
  "background": "The QC score comes from a second, small network (a regressor) that sees only SynthSeg's label map, never the scan. It was trained on good and deliberately degraded label maps, so it has learned what a plausible segmentation looks like, and it predicts a quality score between 0 and 1 for groups of structures (it stands for the Dice an expert comparison would give; Dice itself comes in part 2). Below 0.65 a region counts as failed (Billot 2023, PNAS). The bars are real: a scan aged 54 passes (grey matter 0.722), a scan aged 81 fails (grey matter 0.636). In our run on 967 scans, 16 had at least one failed score. The score needs no expert labels; it cannot see the scan, so a passing score is necessary, not sufficient (next slide: the stroke scan).",
  "qr": null
 },
 {
  "key": "try_qc",
  "title": "Try it: SynthSeg on a stroke scan",
  "part": "1  Grey matter",
  "kind": "try",
  "widget": "qc",
  "clip": null,
  "poster": null,
  "text": "Scroll through a stroke scan with SynthSeg's labels. All QC values pass, yet the labels around the lesion are not right. A passing QC score is necessary, not sufficient. SynthSeg took 52 seconds on a normal processor.",
  "notes": "Scroll through a stroke scan with SynthSeg's labels. All QC values pass, yet the labels around the lesion are not right. A passing QC score is necessary, not sufficient. SynthSeg took 52 seconds on a normal processor.",
  "background": "",
  "check": null,
  "exercise": null,
  "optional": false,
  "key_q": false,
  "sources": [
   {
    "label": "Data: Aphasia Recovery Cohort, CC0",
    "url": "https://openneuro.org/datasets/ds004884",
    "about": "Aphasia Recovery Cohort: public stroke MRI with expert lesion masks (CC0)."
   },
   {
    "label": "Billot et al. 2023, PNAS (robust SynthSeg, QC)",
    "url": "https://doi.org/10.1073/pnas.2216399120",
    "about": "SynthSeg+ (robust version) with automatic QC scores per region; below 0.65 a region counts as failed."
   }
  ],
  "qr": null,
  "n": 14
 },
 {
  "n": 15,
  "key": "qc_euler",
  "title": "FreeSurfer's warning number: Euler",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/14_qc_euler.mp4",
  "poster": "poster/14_qc_euler.jpg",
  "text": "Free Surfer has its own warning number: the Oiler number. Take a closed surface, like this cube. Count the corners, subtract the edges, add the faces. Eight minus twelve plus six is two. For a closed surface without holes, the answer is always two. Every handle lowers the number by two. Free Surfer's first cortex surface is never perfect. It has faults, called defects. In this public stroke scan, the left side had twenty-six defects, and an Oiler number of minus thirty-eight. Free Surfer repairs them, and the number is two again. One number alone says little. Compare it across your scans. A scan with far more defects than the others is often a poor image: look at it. There is no fixed cut-off. In a large study, this number found the unusable scans very well.",
  "check": {
   "q": "One scan has far more surface defects than all others. What do you do?",
   "options": [
    "Nothing, they were repaired",
    "Look at this scan",
    "Run it again until it changes"
   ],
   "answer": 1,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Rosen et al. 2018, NeuroImage (Euler number)",
    "url": "https://doi.org/10.1016/j.neuroimage.2017.12.059",
    "about": "The Euler number of FreeSurfer's surface flags unusable scans very well (AUC 0.98-0.99)."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Free Surfer has its own warning number: the Oiler number. Take a closed surface, like this cube. Count the corners, subtract the edges, add the faces. Eight minus twelve plus six is two. For a closed surface without holes, the answer is always two. Every handle lowers the number by two. Free Surfer's first cortex surface is never perfect. It has faults, called defects. In this public stroke scan, the left side had twenty-six defects, and an Oiler number of minus thirty-eight. Free Surfer repairs them, and the number is two again. One number alone says little. Compare it across your scans. A scan with far more defects than the others is often a poor image: look at it. There is no fixed cut-off. In a large study, this number found the unusable scans very well.",
  "background": "The Euler number is plain counting. On any closed surface built from flat pieces, corners minus edges plus faces gives 2: the cube has 8 corners, 12 edges and 6 faces, so 8 \u2212 12 + 6 = 2. FreeSurfer's surface is built from small triangles, and the same rule holds. Every handle (think of the handle of a cup) lowers the number by 2: one handle gives 0, two give \u22122. A cortex hemisphere should be a closed surface without handles, so the target is 2. The first surface that FreeSurfer builds is never perfect. The numbers on the slide are real and come from our own run (FreeSurfer 8.2.0) on a public stroke scan (Aphasia Recovery Cohort, sub-M2104, licence CC0): the log of the left hemisphere says 26 defects and an Euler number of \u221238 before the repair, which is 2 \u2212 2 \u00d7 20 handles. The right hemisphere had \u221242. After the automatic repair both are 2. Note that 26 defect regions and 20 handles are two different counts; the log gives both. Why is this a quality number? Rosen and colleagues (2018) compared it with expert ratings in three samples: it found the scans that experts called unusable very well (AUC 0.98 to 0.99). They averaged both hemispheres. Be honest about the limits: there is no cut-off that transfers between datasets (their threshold from the training data was right in only 76 % of the external sample), and their samples were young people and adults, not elderly patients. The dot picture on the slide is a sketch, not data. The practical rule: compare the number across your own scans and open the ones that lie far out.",
  "qr": null
 },
 {
  "n": 16,
  "key": "qc_test",
  "title": "The proof: test against a reference",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/15_qc_test.mp4",
  "poster": "poster/15_qc_test.jpg",
  "text": "The strongest proof: compare with labels drawn by an expert. That is accuracy. Same person scanned twice: same result? That is repeatability. And does it still work on another scanner, or on a sick brain? Robustness.",
  "check": {
   "q": "Same person, two scans in one week, hippocampus 6 % apart. Which property is poor?",
   "options": [
    "Accuracy",
    "Repeatability",
    "Robustness"
   ],
   "answer": 1,
   "why": ""
  },
  "exercise": null,
  "sources": [],
  "optional": false,
  "key_q": false,
  "notes": "The strongest proof: compare with labels drawn by an expert. That is accuracy. Same person scanned twice: same result? That is repeatability. And does it still work on another scanner, or on a sick brain? Robustness.",
  "background": "This slide moves from visual checks to formal testing. The gold standard is a comparison against manual labels from experts. We call the agreement accuracy. But accuracy alone is not enough. We also ask two practical questions. First, repeatability: if we scan the same person twice in one week, do we get the same volume? A tool can be accurate on average and still be noisy on one person. Second, robustness: does the tool still work on a different scanner, or on a brain with disease? Many tools are trained on healthy brains from one site. They can fail silently on a sick brain or a new scanner. Ask the room: if a tool is accurate but not repeatable, can we still use it to track one patient over time? The answer is usually no. For a single time point, accuracy may be enough. For longitudinal tracking, repeatability is essential. Robustness matters when we move from a research cohort to a clinical scanner.",
  "qr": null
 },
 {
  "n": 17,
  "key": "fail_lesion",
  "title": "Where it fails: stroke lesions",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/16_fail_lesion.mp4",
  "poster": "poster/16_fail_lesion.jpg",
  "text": "The tools learned from healthy brains. A large lesion is something they have never seen. This brain has a stroke lesion. Where the lesion touches a structure, the program gets its volume wrong. In our test, the pallidum came out about a fifth too small. Structures far from the lesion are fine.",
  "check": {
   "q": "A lesion covers the left putamen. Which volume can you trust most?",
   "options": [
    "Left putamen",
    "Left pallidum",
    "Right thalamus"
   ],
   "answer": 2,
   "why": "Structures the lesion does not touch changed by less than 1 % in our test."
  },
  "exercise": null,
  "sources": [
   {
    "label": "Data: Dallas Lifespan Brain Study, CC0",
    "url": "https://doi.org/10.18112/openneuro.ds004856.v1.3.0",
    "about": "Dallas Lifespan Brain Study: public MRI data (CC0), used for our grey-matter pictures."
   },
   {
    "label": "Data: Aphasia Recovery Cohort, CC0",
    "url": "https://openneuro.org/datasets/ds004884",
    "about": "Aphasia Recovery Cohort: public stroke MRI with expert lesion masks (CC0)."
   }
  ],
  "optional": false,
  "key_q": true,
  "notes": "The tools learned from healthy brains. A large lesion is something they have never seen. This brain has a stroke lesion. Where the lesion touches a structure, the program gets its volume wrong. In our test, the pallidum came out about a fifth too small. Structures far from the lesion are fine.",
  "background": "So far we have looked at tools that work well on healthy brains. Now we ask the hard question: what happens when the brain is not healthy? Stroke lesions are a common problem in clinical M R I. The tools we use, like Free Surfer and Synth Seg, were trained on scans without large lesions. So we tested them. We took healthy public scans and painted in stroke lesions. Then we ran the tools again. The result is clear. If the lesion touches a structure, the volume changes a lot. The putamen dropped by minus fourteen percent. The pallidum dropped by minus twenty two percent. These are median values. Structures far from the lesion stayed almost the same, under one percent change. So the message is simple: check where the lesion is before you trust a volume. A question for you: if a patient has a left putamen stroke, which volumes would you report with caution?",
  "qr": null
 },
 {
  "n": 18,
  "key": "fail_fix",
  "title": "What to do about lesions",
  "part": "1  Grey matter",
  "kind": "clip",
  "clip": "clips/17_fail_fix.mp4",
  "poster": "poster/17_fail_fix.jpg",
  "text": "So: first find the lesion. An example with white matter lesions: on T one, they look grey. Then there are several ways to deal with it. One: fill it. Zoom in. Each lesion voxel gets a new grey value, taken from the healthy white matter around it. The lesion disappears from the picture. Before filling, the tissue step calls seventy one percent of the lesion voxels grey matter. After filling, twenty percent. Two: null it. The lesion voxels are set to zero, so they count as no tissue at all. Three: ignore the grey matter where it touches the lesion. Leave a small margin around the lesion out of the count, and the mistakes there do not matter. This is the most pragmatic way. Four: if the lesion is too big, leave the whole affected half of the brain out of the statistics, and use only the healthy hemisphere.",
  "check": {
   "q": "Why can white matter lesions inflate the grey matter volume on T1?",
   "options": [
    "They look grey on T1",
    "They push the cortex outwards",
    "They are grey matter"
   ],
   "answer": 0,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Battaglini et al. 2012, Hum Brain Mapp (lesion filling)",
    "url": "https://doi.org/10.1002/hbm.21344",
    "about": "Lesions bias tissue segmentation; filling them with normal-looking intensities removes most of the bias."
   },
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "So: first find the lesion. An example with white matter lesions: on T one, they look grey. Then there are several ways to deal with it. One: fill it. Zoom in. Each lesion voxel gets a new grey value, taken from the healthy white matter around it. The lesion disappears from the picture. Before filling, the tissue step calls seventy one percent of the lesion voxels grey matter. After filling, twenty percent. Two: null it. The lesion voxels are set to zero, so they count as no tissue at all. Three: ignore the grey matter where it touches the lesion. Leave a small margin around the lesion out of the count, and the mistakes there do not matter. This is the most pragmatic way. Four: if the lesion is too big, leave the whole affected half of the brain out of the statistics, and use only the healthy hemisphere.",
  "background": "What to do about lesions. First find the lesion: a separate tool or an expert marks it. Then there are several ways. (1) Fill it: FSL lesion_filling gives each lesion voxel a grey value from the healthy white matter around it; on the WMH challenge case the share of lesion voxels that FAST calls grey matter falls from 71.1 % to 20.1 %. (2) Null it: set the lesion voxels to zero so they count as no tissue. (3) Ignore the grey matter where it touches the lesion: leave a small margin around the lesion out of the grey matter count, so mislabelled voxels there do not matter. This is the most pragmatic way: no new image, no assumption about what the tissue would look like. (4) If the lesion is too big, leave the whole affected hemisphere out of the statistics and use only the healthy one. In any case look at cases with large lesions yourself.",
  "qr": null
 },
 {
  "n": 19,
  "key": "ex1",
  "title": "Your turn: atlas quiz",
  "part": "1  Grey matter",
  "kind": "exercise",
  "clip": null,
  "poster": "poster/18_ex1.jpg",
  "text": "Now it is your turn. Open the atlas quiz on your phone or laptop. Ten questions: a region lights up, and you pick its name. You have eight minutes.",
  "check": null,
  "exercise": {
   "url": "../exercises/atlas-quiz/index.html",
   "minutes": 8,
   "name": "Atlas quiz",
   "what": "10 questions: a region lights up, you pick its name."
  },
  "sources": [
   {
    "label": "MRT atlas trainer: more practice after the atlas quiz",
    "url": "https://mendeltem.github.io/mrt-atlas-trainer/",
    "about": "The full atlas trainer for home: explore, quiz and study modes with many more brain regions (interface in German)."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Now it is your turn. Open the atlas quiz on your phone or laptop. Ten questions: a region lights up, and you pick its name. You have eight minutes.",
  "background": "This slide is a short break from listening. The students work on their own. They open the quiz link on a phone or a laptop. Each question shows a brain region that lights up. The student picks the name from a list. There are ten questions. The time limit is eight minutes. Walk around the room while they work. Look at which regions cause trouble. Expected mix-ups: putamen and pallidum, which sit side by side, and hippocampus and amygdala, which sit one behind the other. After eight minutes, ask the room: which question was the hardest? Take two or three answers. Then show the correct names on the screen. This links back to the atlas work from the first part of the lecture. It also prepares them for the next part, where we segment grey matter automatically. The quiz is not graded. It is only for practice.",
  "qr": "qr/atlas-quiz.png"
 },
 {
  "n": 20,
  "key": "wmh_what",
  "title": "White matter hyperintensities",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/19_wmh_what.mp4",
  "poster": "poster/19_wmh_what.jpg",
  "text": "Part two. FLAIR is a scan that makes the brain fluid dark. So damaged white matter stands out as bright spots: white matter hyper-intensities. They are a sign of small vessel disease. People with many of them have a higher risk of stroke and dementia.",
  "check": {
   "q": "On which image are these lesions bright?",
   "options": [
    "T1",
    "FLAIR",
    "T2*"
   ],
   "answer": 1,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Wardlaw et al. 2013, Lancet Neurol (STRIVE)",
    "url": "https://doi.org/10.1016/S1474-4422(13)70124-8",
    "about": "STRIVE consensus: names, definitions and imaging standards for small vessel disease (WMH, microbleeds)."
   },
   {
    "label": "Debette & Markus 2010, BMJ",
    "url": "https://doi.org/10.1136/bmj.c3666",
    "about": "Meta-analysis: white matter hyperintensities raise the risk of stroke (about 3x) and dementia (about 2x)."
   },
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Part two. FLAIR is a scan that makes the brain fluid dark. So damaged white matter stands out as bright spots: white matter hyper-intensities. They are a sign of small vessel disease. People with many of them have a higher risk of stroke and dementia.",
  "background": "Part two is about white matter lesions. On a FLAIR image, fluid is dark. So bright patches in the white matter stand out clearly. We call them white matter hyper-intensities, or W M H. They are a sign of small vessel disease. They are common in old age. The numbers come from large studies. People with many W M H have about three times the risk of stroke. They have about twice the risk of dementia. These are group-level risks. They do not tell us what will happen to one person. Ask the room: why is FLAIR good for W M H? Answer: it suppresses the dark fluid signal, so small bright lesions become visible. In the next slides we will see how to segment them. We will look at Bianka and at U net. We will also look at how we score the results with the Dice score.",
  "qr": null
 },
 {
  "n": 21,
  "key": "wmh_use",
  "title": "What is the lesion volume used for?",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/20_wmh_use.mp4",
  "poster": "poster/20_wmh_use.jpg",
  "text": "What do we do with this? In one study of older people, doctors graded the lesions by eye: mild, moderate or severe. With severe lesions, almost three times as many people lost their independence or died each year. Trials use the volume as an outcome: strict blood pressure control slowed the growth of the lesions. But the difference was small: about half a millilitre in four years. No grade by eye can show that. You need a measured volume. And for the new Alzheimer antibodies, severe lesions speak against the treatment.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Inzitari et al. 2009, BMJ (LADIS study)",
    "url": "https://doi.org/10.1136/bmj.b2477",
    "about": "LADIS: older people living independently, 3 years follow-up; disability or death per year 10.5 % (mild), 15.1 % (moderate), 29.5 % (severe white matter changes)."
   },
   {
    "label": "SPRINT MIND 2019, JAMA (blood pressure and white matter lesions)",
    "url": "https://doi.org/10.1001/jama.2019.10551",
    "about": "SPRINT MIND: intensive vs standard blood pressure control; lesion volume 4.57 to 5.49 cm3 vs 4.40 to 5.85 cm3 after about 4 years (difference -0.54 cm3, small)."
   },
   {
    "label": "Gouw et al. 2008, Cerebrovasc Dis (visual scales vs volume)",
    "url": "https://doi.org/10.1159/000113863",
    "about": "Measuring the change of lesion volume was reliable (ICC 0.88); judging progression with visual scales was less reliable (20 scan pairs)."
   },
   {
    "label": "Cummings et al. 2023, lecanemab: appropriate use",
    "url": "https://doi.org/10.14283/jpad.2023.30",
    "about": "Appropriate use recommendations for lecanemab: no treatment with more than 4 microhaemorrhages."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "What do we do with this? In one study of older people, doctors graded the lesions by eye: mild, moderate or severe. With severe lesions, almost three times as many people lost their independence or died each year. Trials use the volume as an outcome: strict blood pressure control slowed the growth of the lesions. But the difference was small: about half a millilitre in four years. No grade by eye can show that. You need a measured volume. And for the new Alzheimer antibodies, severe lesions speak against the treatment.",
  "background": "(1) LADIS (Inzitari 2009): older people who lived independently, followed for 3 years. Transition to disability or death per year: 10.5 % with mild, 15.1 % with moderate, 29.5 % with severe white matter changes on the visual scale. (2) SPRINT MIND (2019): intensive versus standard blood pressure control; lesion volume went from 4.57 to 5.49 cm3 versus 4.40 to 5.85 cm3 (growth 0.92 versus 1.45 cm3, our subtraction), follow-up MRI after about 4 years; reported difference -0.54 cm3, the authors call it small. (3) Why a program: measuring the change of lesion volume was reliable, judging progression with visual scales less so (Gouw 2008, only 20 scan pairs). For one time point, visual score and volume agree well (Spearman 0.78, Valdes Hernandez 2013). (4) The appropriate use recommendations for lecanemab (Cummings 2023) exclude severe white matter hyperintensities (Fazekas score 3). This is advice from an expert group, not the drug label.",
  "qr": null
 },
 {
  "n": 22,
  "key": "wmh_manual",
  "title": "The reference: masks drawn by experts",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/21_wmh_manual.mp4",
  "poster": "poster/21_wmh_manual.jpg",
  "text": "The reference is a mask painted by an expert, by hand, slice by slice. That is slow, and two experts never paint exactly the same. So we want a program to do it.",
  "check": {
   "q": "Why do we want an automatic method?",
   "options": [
    "Manual painting is slow and differs between experts",
    "Experts cannot see lesions",
    "Computers are always right"
   ],
   "answer": 0,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Kuijf et al. 2019, IEEE TMI (WMH Challenge)",
    "url": "https://doi.org/10.1109/TMI.2019.2905770",
    "about": "WMH Segmentation Challenge: 60 training and 110 test scans, 5 scanners; best method Dice 0.80, second experts 0.77-0.79."
   },
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "The reference is a mask painted by an expert, by hand, slice by slice. That is slow, and two experts never paint exactly the same. So we want a program to do it.",
  "background": "This slide sets up why we need automatic segmentation at all. The reference standard in white matter hyperintensity research is still a mask drawn by a human expert, usually a trained rater or a neurologist, who goes slice by slice and paints every lesion. That is the gold standard we compare our algorithms against. But it has two problems. First, it is slow. Second, it is subjective: give the same scan to two experts and you get two different masks, especially at the edges of faint lesions. That disagreement is not a failure of the experts; it is the nature of the task. So for teaching and for fair testing we need a common dataset. The W M H Segmentation Challenge gives us exactly that: sixty training scans from three different scanners, each with an expert mask. Ask the room: if two experts disagree on a lesion, which mask is the truth? There is no single truth. That is why we report agreement scores like Dice, not just accuracy.",
  "qr": null
 },
 {
  "n": 23,
  "key": "bianca_knn",
  "title": "BIANCA: ask the neighbours",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/22_bianca_knn.mp4",
  "poster": "poster/22_bianca_knn.jpg",
  "text": "Bianka learns from examples. In training scans, an expert has marked the lesions. Bianka takes sample voxels, lesion and healthy, and stores each one as a point: its brightness and its position. Now a new scan, without a mask. For one voxel, the forty nearest stored points vote. Thirty five say lesion: probability zero point eight eight. Bianka does this for every voxel.",
  "check": {
   "q": "30 of the 40 neighbours are lesion voxels. Lesion probability?",
   "options": [
    "0.30",
    "0.40",
    "0.75"
   ],
   "answer": 2,
   "why": "30 / 40 = 0.75"
  },
  "exercise": null,
  "sources": [
   {
    "label": "Griffanti et al. 2016, NeuroImage (BIANCA)",
    "url": "https://doi.org/10.1016/j.neuroimage.2016.07.018",
    "about": "BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Bianka learns from examples. In training scans, an expert has marked the lesions. Bianka takes sample voxels, lesion and healthy, and stores each one as a point: its brightness and its position. Now a new scan, without a mask. For one voxel, the forty nearest stored points vote. Thirty five say lesion: probability zero point eight eight. Bianka does this for every voxel.",
  "background": "The points are real: 640 training voxels of our BIANCA run (160 lesion, 480 healthy), plotted by FLAIR and T1 brightness. BIANCA also uses the position in the brain, which the plot cannot show. For the voxel in the ring, 35 of its 40 nearest training points are lesion: 35 / 40 = 0.88. Training means storing labelled example voxels; testing means asking the neighbours for every voxel of a new scan.",
  "qr": null
 },
 {
  "n": 24,
  "key": "bianca_thr",
  "title": "From probability to mask: the cut-off",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/23_bianca_thr.mp4",
  "poster": "poster/23_bianca_thr.jpg",
  "text": "This gives a probability map: every voxel has a value between zero and one. A cut off turns it into a mask: above the cut off counts as lesion. A low cut off also marks tissue that only looks a little like a lesion. A high one keeps the clear lesions. Zero point nine five was best, chosen on the training scans.",
  "check": {
   "q": "You raise the cut-off from 0.5 to 0.95. The mask ...",
   "options": [
    "grows",
    "gets smaller",
    "stays the same"
   ],
   "answer": 1,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Griffanti et al. 2016, NeuroImage (BIANCA)",
    "url": "https://doi.org/10.1016/j.neuroimage.2016.07.018",
    "about": "BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another."
   },
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": true,
  "notes": "This gives a probability map: every voxel has a value between zero and one. A cut off turns it into a mask: above the cut off counts as lesion. A low cut off also marks tissue that only looks a little like a lesion. A high one keeps the clear lesions. Zero point nine five was best, chosen on the training scans.",
  "background": "So Bianka gives us a probability for each voxel. A probability is not yet a mask. We need a cut off. Think of a dimmer switch on a lamp. A low cut off lets almost everything through. The mask grows too big. A high cut off lets only the brightest voxels through. The mask shrinks to the lesions. On the training data, zero point nine five was best. That number is not a law of nature. It comes from the data the model saw. On your own data, you should check it again. Here is a question for the room. If you lower the cut off to zero point five, what happens to false positives? Take a moment. They go up. More voxels pass the test. Some of them are not lesions. So the choice of cut off is a trade off. It is a trade off between missing lesions and marking healthy tissue. Always report the cut off you used. Always look at the mask with your own eyes.",
  "qr": null
 },
 {
  "key": "try_cutoff",
  "title": "Try it: move the cut-off",
  "part": "2  White matter lesions",
  "kind": "try",
  "widget": "cutoff",
  "clip": null,
  "poster": null,
  "text": "Move the slider. Low cut-off: the mask floods the white matter and Dice drops. High cut-off: only the lesions stay. Find the best Dice on this slice; BIANCA's chosen cut-off was 0.95.",
  "notes": "Move the slider. Low cut-off: the mask floods the white matter and Dice drops. High cut-off: only the lesions stay. Find the best Dice on this slice; BIANCA's chosen cut-off was 0.95.",
  "background": "",
  "check": null,
  "exercise": null,
  "optional": false,
  "key_q": false,
  "sources": [
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   },
   {
    "label": "Griffanti et al. 2016, NeuroImage (BIANCA)",
    "url": "https://doi.org/10.1016/j.neuroimage.2016.07.018",
    "about": "BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another."
   }
  ],
  "qr": null,
  "n": 25
 },
 {
  "n": 26,
  "key": "bianca_settings",
  "title": "What matters when you train BIANCA",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/24_bianca_settings.mp4",
  "poster": "poster/24_bianca_settings.jpg",
  "text": "Bianka has settings. We tried them, and each time measured how well the result matches the expert. First: which images? With FLAIR only, each voxel is one number. Adding the T one gives it a second number. That helped a little. Second: how many healthy examples? Healthy tissue looks different from place to place. With ten thousand examples per scan instead of two thousand, the result got a little better. Third: position. Lesions have typical places. This map adds up the lesions of all training scans. Most lie around the ventricles. When Bianka also knows where a voxel lies, the score rises the most. Last: patches. Bianka can also look at the three by three neighbourhood of a voxel, and use its average. That smooths noise, but small lesions fade. In our runs it made the result slightly worse.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Griffanti et al. 2016, NeuroImage (BIANCA)",
    "url": "https://doi.org/10.1016/j.neuroimage.2016.07.018",
    "about": "BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another."
   },
   {
    "label": "Grabner et al. 2006, MICCAI (MNI152 standard brain)",
    "url": "https://doi.org/10.1007/11866763_8",
    "about": "The MNI152 standard brain (average of 152 healthy brains): scans are aligned to it, so every voxel gets a position that means the same place in every person."
   },
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Bianka has settings. We tried them, and each time measured how well the result matches the expert. First: which images? With FLAIR only, each voxel is one number. Adding the T one gives it a second number. That helped a little. Second: how many healthy examples? Healthy tissue looks different from place to place. With ten thousand examples per scan instead of two thousand, the result got a little better. Third: position. Lesions have typical places. This map adds up the lesions of all training scans. Most lie around the ventricles. When Bianka also knows where a voxel lies, the score rises the most. Last: patches. Bianka can also look at the three by three neighbourhood of a voxel, and use its average. That smooths noise, but small lesions fade. In our runs it made the result slightly worse.",
  "background": "For students who do not know BIANCA: every setting is first shown, then its effect. All numbers are from our own BIANCA runs on the public WMH Challenge data (bianca-film); the bars show the change of the Dice score (match with the expert mask, 0 to 1; Dice is explained in detail three slides later). 1 Images: with FLAIR only every voxel is one number, with T1 it is two, so lesion and healthy points separate a little better: +0.03. 2 Healthy examples: 10,000 instead of 2,000 non-lesion points per scan (lesion points: 2,000 per scan): +0.04. 3 Position: the scans are aligned to the MNI152 standard brain; the map adds up the expert masks of the 60 training scans. Lesions cluster around the ventricles, so position is a strong hint: +0.14, the biggest effect. 4 Patches: besides the voxel itself BIANCA can use the average of its 3 x 3 neighbourhood. That smooths noise but also small lesions: -0.03 in our runs.",
  "qr": null
 },
 {
  "n": 27,
  "key": "bianca_after",
  "title": "What matters when you use BIANCA",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/25_bianca_after.mp4",
  "poster": "poster/25_bianca_after.jpg",
  "text": "After training, Bianka gives a probability for every voxel. The cut off decides what counts as lesion. At zero point five, too much is marked. A high cut off, zero point nine five, was much better. Some marks are still wrong: they lie outside the white matter, for example in the cortex. A white matter mask removes them. The true lesions stay. Now your data. Bianka learned on scans from certain scanners. A new scanner gives another brightness and another contrast. The stored examples fit less well, and the score drops. And slice thickness. A thick slice averages more tissue in every voxel. Big lesions stay. Small lesions fade away. That cost the most. So train Bianka on scans like the ones in your study.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Griffanti et al. 2016, NeuroImage (BIANCA)",
    "url": "https://doi.org/10.1016/j.neuroimage.2016.07.018",
    "about": "BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another."
   },
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "After training, Bianka gives a probability for every voxel. The cut off decides what counts as lesion. At zero point five, too much is marked. A high cut off, zero point nine five, was much better. Some marks are still wrong: they lie outside the white matter, for example in the cortex. A white matter mask removes them. The true lesions stay. Now your data. Bianka learned on scans from certain scanners. A new scanner gives another brightness and another contrast. The stored examples fit less well, and the score drops. And slice thickness. A thick slice averages more tissue in every voxel. Big lesions stay. Small lesions fade away. That cost the most. So train Bianka on scans like the ones in your study.",
  "background": "Settings after training, and the data. 1 Cut-off: BIANCA gives a probability per voxel; at 0.5 too much is marked, 0.95 was better by +0.13 (internal split; choose the cut-off on scans not used for training, never on the test set). 2 White matter mask: marks outside the white matter (cortex, ventricle edge) are removed: +0.08 on the 110 test scans (0.586 -> 0.665). 3 New scanner: scans from scanners that were not in the training scored 0.621, scans from known scanners 0.675: -0.05. 4 Slice thickness: 5 mm instead of 3 mm slices cost about -0.11 (simulation); a thick slice averages a small lesion with its surroundings (partial volume). Take-home: the training scans should come from the same scanner and protocol as the study.",
  "qr": null
 },
 {
  "n": 28,
  "key": "bianca_small",
  "title": "What BIANCA misses: small lesions",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/26_bianca_small.mp4",
  "poster": "poster/26_bianca_small.jpg",
  "text": "Which lesions does Bianka find? The big ones, almost always. But of the smallest lesions, under ten voxels, only one in four. That is why small lesions pull Dice down.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Which lesions does Bianka find? The big ones, almost always. But of the smallest lesions, under ten voxels, only one in four. That is why small lesions pull Dice down.",
  "background": "Our best BIANCA setup on the 110 official test scans (trained on the 60 training scans), lesions = 26-connected clusters of the expert mask: under 10 voxels 24 % found (841 of 3,470), 10-30 voxels 41 %, 30-100 voxels 70 %, 100-1,000 voxels 93 %, over 1,000 voxels 99 %. (Reference setup of the film: 17 / 31 / 62 / 91 / 99 %.) Volume agrees very well (r = 0.955). For 'how much WMH' BIANCA is useful, for 'where exactly, small spots' it is weak. Griffanti 2016 shows the same: Dice falls with low lesion load.",
  "qr": null
 },
 {
  "n": 29,
  "key": "unet",
  "title": "The U-Net in one picture",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/27_unet.mp4",
  "poster": "poster/27_unet.jpg",
  "text": "A U net goes down, shrinking the image to see context. Then it goes up again, and skip connections bring back the detail. It learns its own features. Today, the best lesion tools work like this.",
  "check": {
   "q": "What do the skip connections bring back?",
   "options": [
    "Fine detail",
    "More training data",
    "The cut-off"
   ],
   "answer": 0,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Ronneberger et al. 2015, MICCAI (U-Net)",
    "url": "https://doi.org/10.1007/978-3-319-24574-4_28",
    "about": "U-Net: the encoder-decoder network with skip connections for biomedical image segmentation."
   },
   {
    "label": "Kuijf et al. 2019, IEEE TMI (WMH Challenge)",
    "url": "https://doi.org/10.1109/TMI.2019.2905770",
    "about": "WMH Segmentation Challenge: 60 training and 110 test scans, 5 scanners; best method Dice 0.80, second experts 0.77-0.79."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "A U net goes down, shrinking the image to see context. Then it goes up again, and skip connections bring back the detail. It learns its own features. Today, the best lesion tools work like this.",
  "background": "So this is the workhorse of modern segmentation. The U net was published by Ronneberger and colleagues in twenty fifteen. The shape gives the name. The left side, the way down, shrinks the image step by step. Each step collects a wider view. The right side, the way up, goes back to full size. The skip connections copy fine detail across from the left side to the right side. The output is a mask: one label per voxel. Compare this with Bianka. Bianka looks at each voxel on its own, using hand-made features like intensity and distance. A U net looks at the whole neighbourhood, and it learns the features from the training examples. That is the big change. One question for the room: if the network learns its own features, what do we still need to give it? Answer: good labels, and a good way to check the result. The W M H challenge is a nice test case. In their paper of twenty nineteen, Kuijf and colleagues reported that the top eleven methods all used deep learning. So the field moved, and it moved fast.",
  "qr": null
 },
 {
  "n": 30,
  "key": "bianca_vs_unet",
  "title": "BIANCA or U-Net?",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/28_bianca_vs_unet.mp4",
  "poster": "poster/28_bianca_vs_unet.jpg",
  "text": "So, Bianka or U net? Bianka needs no graphics card. It is simple: you can follow every step. And sometimes, it is good enough. A U net is usually more accurate. But training it needs a graphics card, and it is harder to see why it decides.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Griffanti et al. 2016, NeuroImage (BIANCA)",
    "url": "https://doi.org/10.1016/j.neuroimage.2016.07.018",
    "about": "BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another."
   },
   {
    "label": "Kuijf et al. 2019, IEEE TMI (WMH Challenge)",
    "url": "https://doi.org/10.1109/TMI.2019.2905770",
    "about": "WMH Segmentation Challenge: 60 training and 110 test scans, 5 scanners; best method Dice 0.80, second experts 0.77-0.79."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "So, Bianka or U net? Bianka needs no graphics card. It is simple: you can follow every step. And sometimes, it is good enough. A U net is usually more accurate. But training it needs a graphics card, and it is harder to see why it decides.",
  "background": "A fair close of the method part. BIANCA: runs on a normal processor, no graphics card; every step can be followed (stored examples, neighbours vote, cut-off); and with a good setup it is sometimes good enough (0.70 on the test scans). U-Net: usually more accurate (0.80), but training needs a graphics card and more labelled scans, and its decision is harder to trace. Which one to use depends on the study, not on fashion.",
  "qr": null
 },
 {
  "n": 31,
  "key": "dice",
  "title": "The Dice score",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/29_dice.mp4",
  "poster": "poster/29_dice.jpg",
  "text": "Put the mask on the reference: hits in both, extra marks, and misses. Dice is two times the hits, divided by both mask sizes together. One is perfect. This slice: zero point eight two. Bianka on average: zero point seven.",
  "check": {
   "q": "TP = 50, FP = 25, FN = 25. Dice?",
   "options": [
    "0.50",
    "0.67",
    "0.75"
   ],
   "answer": 1,
   "why": "2 x 50 / (2 x 50 + 25 + 25) = 100 / 150"
  },
  "exercise": null,
  "sources": [
   {
    "label": "Dice 1945, Ecology",
    "url": "https://doi.org/10.2307/1932409",
    "about": "Dice's 1945 overlap coefficient, first used to measure how often two species occur together."
   },
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": true,
  "notes": "Put the mask on the reference: hits in both, extra marks, and misses. Dice is two times the hits, divided by both mask sizes together. One is perfect. This slice: zero point eight two. Bianka on average: zero point seven.",
  "background": "This slide explains how we judge a segmentation mask. We compare the mask with a reference. Orange voxels are true positives: both the reference and the program marked them. Yellow voxels are false positives: only the program marked them. Red voxels are false negatives: the program missed them. Dice is two times the true positives, divided by two times the true positives plus the false positives plus the false negatives. One is perfect. Zero means no overlap. On this slice we have five hundred ninety true positives, one hundred thirty five false positives, and one hundred sixteen false negatives. That gives zero point eight two five. Over all one hundred and ten test scans, Bianka's mean Dice was zero point six six five. Ask the room: if a program misses a small lesion, which voxel colour shows that? Red. Dice is common in segmentation papers, but it is not the only measure. Later we will see F one for micro-bleeds. Keep in mind that Dice depends on the reference mask. A perfect Dice only means agreement with that reference, not with the truth.",
  "qr": null
 },
 {
  "n": 32,
  "key": "raters",
  "title": "Even experts do not agree",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/30_raters.mp4",
  "poster": "poster/30_raters.jpg",
  "text": "Even experts do not agree. A second expert, on the same scans, reached only zero point seven seven to zero point seven nine against the reference. So about zero point eight is the ceiling. The best program, a U net, reached it.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Kuijf et al. 2019, IEEE TMI (WMH Challenge)",
    "url": "https://doi.org/10.1109/TMI.2019.2905770",
    "about": "WMH Segmentation Challenge: 60 training and 110 test scans, 5 scanners; best method Dice 0.80, second experts 0.77-0.79."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Even experts do not agree. A second expert, on the same scans, reached only zero point seven seven to zero point seven nine against the reference. So about zero point eight is the ceiling. The best program, a U net, reached it.",
  "background": "Kuijf et al. 2019 (WMH Challenge): two further observers segmented the 60 training scans; against the reference standard they reached Dice 0.77 (0.74-0.80) and 0.79 (0.76-0.81). The challenge winner (sysu_media, a fully convolutional network similar to U-Net, ensemble of three) reached 0.80 on the 110 test scans: as good as a second expert. Lesson: a Dice of 1.0 is impossible in practice; the disagreement between experts sets the ceiling, largest at lesion edges and for small lesions.",
  "qr": null
 },
 {
  "n": 33,
  "key": "dice_small",
  "title": "Dice is hard on small lesions",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/31_dice_small.mp4",
  "poster": "poster/31_dice_small.jpg",
  "text": "Shift a big lesion by one voxel. Ninety of a hundred voxels still overlap: Dice is zero point nine. The same shift on a tiny lesion. Only two of four voxels still overlap: Dice is zero point five. Small lesions are hard on Dice.",
  "check": {
   "q": "Same method, two patients. Who tends to get the lower Dice?",
   "options": [
    "The one with a few small lesions",
    "The one with large lesions",
    "No difference"
   ],
   "answer": 0,
   "why": ""
  },
  "exercise": null,
  "sources": [],
  "optional": false,
  "key_q": false,
  "notes": "Shift a big lesion by one voxel. Ninety of a hundred voxels still overlap: Dice is zero point nine. The same shift on a tiny lesion. Only two of four voxels still overlap: Dice is zero point five. Small lesions are hard on Dice.",
  "background": "This slide is a caution about the Dice score. Dice compares two masks. It is the overlap divided by the average size. A one-voxel shift is a small error. But its effect depends on lesion size. For a large lesion, ten by ten voxels, a one-voxel shift still gives a Dice of zero point nine. For a small lesion, two by two voxels, the same shift gives a Dice of zero point five. So the same error looks much worse on small lesions. In white matter hyperintensity segmentation, many lesions are small. A method can look good on average and still fail on small lesions. Always check the lesion size distribution before you trust a Dice score. Question to the room: if a paper reports a mean Dice of zero point eight, what else do you want to know before you believe it?",
  "qr": null
 },
 {
  "key": "try_dice",
  "title": "Try it: shift the mask",
  "part": "2  White matter lesions",
  "kind": "try",
  "widget": "dice",
  "clip": null,
  "poster": null,
  "text": "Shift the program's mask with the buttons. One voxel costs the big lesion little and the small lesion a lot. Two voxels and the small lesion has no overlap at all.",
  "notes": "Shift the program's mask with the buttons. One voxel costs the big lesion little and the small lesion a lot. Two voxels and the small lesion has no overlap at all.",
  "background": "",
  "check": null,
  "exercise": null,
  "optional": false,
  "key_q": false,
  "sources": [],
  "qr": null,
  "n": 34
 },
 {
  "n": 35,
  "key": "ex2",
  "title": "Your turn: segment the lesions",
  "part": "2  White matter lesions",
  "kind": "exercise",
  "clip": null,
  "poster": "poster/32_ex2.jpg",
  "text": "Your turn. Open the lesion exercise. A short tutorial first, then paint the lesions on three slices of one patient, and get your Dice. You have six minutes.",
  "check": null,
  "exercise": {
   "url": "../exercises/wmh-dice/index.html",
   "minutes": 6,
   "name": "Lesion exercise",
   "what": "1 patient, 3 slices. Short tutorial, paint, get your Dice."
  },
  "sources": [
   {
    "label": "Data: WMH Segmentation Challenge, CC BY-NC 4.0",
    "url": "https://doi.org/10.34894/AECRSD",
    "about": "The public WMH Challenge data (DataverseNL), licence CC BY-NC 4.0; used in the lesion exercise."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Your turn. Open the lesion exercise. A short tutorial first, then paint the lesions on three slices of one patient, and get your Dice. You have six minutes.",
  "background": "This is a hands-on break. The students open the lesion exercise in the browser. There are three patients: one easy, one medium, one hard. They paint the white matter hyperintensities with a brush, slice by slice. After each patient, the tool shows their Dice score against the expert annotation. At the end they see one overall score. Walk around the room while they work. Watch for common mistakes: painting the ventricles, painting the rim of the cortex, or stopping too early on the hard case. If someone finishes early, ask them to compare their easy and hard Dice. A good question to the room: why is the hard case hard? Typical answers: the lesions are faint, they touch the ventricles, or they sit next to normal bright structures. Remind them that Dice punishes both misses and false positives. The data come from the WMH Segmentation Challenge, shared under a CC BY-NC licence. After twelve minutes, bring the group back and ask two or three students to call out their scores. Then move on to part three, the micro-bleeds.",
  "qr": "qr/wmh-dice.png"
 },
 {
  "n": 36,
  "key": "beat2",
  "title": "Can you beat the algorithm?",
  "part": "2  White matter lesions",
  "kind": "clip",
  "clip": "clips/33_beat2.mp4",
  "poster": "poster/33_beat2.jpg",
  "text": "How did you do? Bianka got zero point seven, a second expert about zero point seven eight, the best program, a U net, zero point eight. Hands up, who beat Bianka? The small spots are hard for everyone.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Kuijf et al. 2019, IEEE TMI (WMH Challenge)",
    "url": "https://doi.org/10.1109/TMI.2019.2905770",
    "about": "WMH Segmentation Challenge: 60 training and 110 test scans, 5 scanners; best method Dice 0.80, second experts 0.77-0.79."
   },
   {
    "label": "Griffanti et al. 2016, NeuroImage (BIANCA)",
    "url": "https://doi.org/10.1016/j.neuroimage.2016.07.018",
    "about": "BIANCA: k-nearest-neighbour WMH segmentation in FSL; Dice 0.76 in one cohort, 0.52 in another."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "How did you do? Bianka got zero point seven, a second expert about zero point seven eight, the best program, a U net, zero point eight. Hands up, who beat Bianka? The small spots are hard for everyone.",
  "background": "Bring the room back after the exercise. Ask for a show of hands: who beat BIANCA? Our best BIANCA setup reached 0.695 on the 110 challenge test scans (trained on the 60 training scans, our own run); a second human expert reached 0.77 to 0.79 against the reference on the 60 training scans (Kuijf 2019); the challenge winner, a U-Net-like network (ensemble of three), reached 0.80 on the 110 test scans. Small spots lower everybody's Dice, people and programs alike. Your own catch question can go here.",
  "qr": null
 },
 {
  "n": 37,
  "key": "cmb_what",
  "title": "Microbleeds: small dark dots",
  "part": "3  Microbleeds",
  "kind": "clip",
  "clip": "clips/34_cmb_what.mp4",
  "poster": "poster/34_cmb_what.jpg",
  "text": "Part three. A micro-bleed is a tiny old bleed. It leaves iron behind, and iron disturbs the signal. So on T two star it is a small, round, dark dot, usually two to five millimetres wide. Watch for lookalikes, like vessels cut across. This slice has three.",
  "check": {
   "q": "On which images do you look for microbleeds?",
   "options": [
    "T1",
    "FLAIR",
    "T2* or SWI"
   ],
   "answer": 2,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Greenberg et al. 2009, Lancet Neurol (microbleeds)",
    "url": "https://doi.org/10.1016/S1474-4422(09)70013-4",
    "about": "Review of cerebral microbleeds: definition, detection on T2*/SWI, mimics and clinical meaning."
   },
   {
    "label": "Sudre et al. 2024, Med Image Anal (VALDO challenge)",
    "url": "https://doi.org/10.1016/j.media.2023.103029",
    "about": "VALDO challenge (MICCAI 2021): automatic detection of small vessel lesions, including microbleeds."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Part three. A micro-bleed is a tiny old bleed. It leaves iron behind, and iron disturbs the signal. So on T two star it is a small, round, dark dot, usually two to five millimetres wide. Watch for lookalikes, like vessels cut across. This slice has three.",
  "background": "Microbleeds are small deposits of iron left after tiny bleeds in the brain. The iron is strongly magnetic, so it disturbs the local field. On T two star or S W I images this shows as a small, round, dark dot. The STRIVE consensus says they are generally two to five millimetres, and up to ten millimetres. There is no absolute size rule. Size alone does not decide. Context matters. Look at the shape, the location, and the surrounding tissue. Many dark dots are not microbleeds. A vessel cut across looks like a line or a dot. Calcium is often in the basal ganglia or the pineal region. Air near the bone, for example near the sinuses, also makes dark spots. So we need careful reading, and often a second reader. Question for the room: you see three dark dots in the right occipital lobe. What else could they be, and how would you check? Think about the vessel course, the shape, and the S W I signal. This is why automated detection is hard, and why we need good reference data.",
  "qr": null
 },
 {
  "n": 38,
  "key": "cmb_use",
  "title": "Why count microbleeds?",
  "part": "3  Microbleeds",
  "kind": "clip",
  "clip": "clips/35_cmb_use.mp4",
  "poster": "poster/35_cmb_use.jpg",
  "text": "Why count them? First: micro-bleeds are common. In one large study, every sixth person in their sixties had some, and more than every third over eighty. Where they sit hints at the cause. Near the surface of the brain: amyloid in the vessel walls. Deep in the brain: high blood pressure. And they matter for treatment. On blood thinners, patients with micro-bleeds had almost four times as many brain bleeds. Still, the studies say: do not stop the drug for that reason alone. Even with ten or more micro-bleeds, a new stroke from a blocked vessel stays more likely than a bleed.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Vernooij et al. 2008, Neurology (Rotterdam Scan Study)",
    "url": "https://doi.org/10.1212/01.wnl.0000307750.41970.d9",
    "about": "Rotterdam Scan Study (1,062 people, 1.5 T): microbleeds in 17.8 % at age 60-69 and 38.3 % over 80; lobar location points to amyloid angiopathy, deep location to hypertensive vessel disease."
   },
   {
    "label": "Charidimou et al. 2022, Lancet Neurol (Boston criteria 2.0)",
    "url": "https://doi.org/10.1016/S1474-4422(22)00208-3",
    "about": "Boston criteria 2.0 for cerebral amyloid angiopathy: strictly lobar haemorrhagic lesions (bleeds, microbleeds, superficial siderosis) make the diagnosis."
   },
   {
    "label": "Wilson et al. 2018, Lancet Neurol (CROMIS-2)",
    "url": "https://doi.org/10.1016/S1474-4422(18)30145-5",
    "about": "CROMIS-2: anticoagulated patients with atrial fibrillation after stroke or TIA; brain bleeds 9.8 (with microbleeds) vs 2.6 (without) per 1,000 patient-years."
   },
   {
    "label": "Wilson et al. 2019, Lancet Neurol (MICON pooled analysis)",
    "url": "https://doi.org/10.1016/S1474-4422(19)30197-8",
    "about": "Pooled data of 20,322 patients after ischaemic stroke or TIA: with 10 or more microbleeds still 64 ischaemic strokes vs 27 brain bleeds per 1,000 patient-years."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Why count them? First: micro-bleeds are common. In one large study, every sixth person in their sixties had some, and more than every third over eighty. Where they sit hints at the cause. Near the surface of the brain: amyloid in the vessel walls. Deep in the brain: high blood pressure. And they matter for treatment. On blood thinners, patients with micro-bleeds had almost four times as many brain bleeds. Still, the studies say: do not stop the drug for that reason alone. Even with ten or more micro-bleeds, a new stroke from a blocked vessel stays more likely than a bleed.",
  "background": "(1) Rotterdam Scan Study (Vernooij 2008): 1,062 people from the general population, mean age 69.6 years, 1.5 tesla; microbleeds in 17.8 % at age 60 to 69 and 38.3 % over 80. The number found depends on the sequence. (2) Location: strictly lobar microbleeds are related to cerebral amyloid angiopathy, deep or infratentorial ones to hypertensive or atherosclerotic small vessel disease (same paper). The Boston criteria 2.0 (Charidimou 2022) count strictly lobar haemorrhagic lesions, microbleeds among them, for the diagnosis of amyloid angiopathy. (3) CROMIS-2 (Wilson 2018): patients on anticoagulation for atrial fibrillation after an ischaemic stroke or TIA; symptomatic brain bleeds 9.8 per 1,000 patient-years with microbleeds, 2.6 without (adjusted hazard ratio 3.67). (4) MICON (Wilson 2019): 20,322 patients from 38 cohorts after ischaemic stroke or TIA; with ten or more microbleeds 64 ischaemic strokes versus 27 intracranial haemorrhages per 1,000 patient-years. The authors: the evidence does not support withholding antithrombotic treatment because of microbleeds. The one hard rule by count comes later: the anti-amyloid antibodies.",
  "qr": null
 },
 {
  "n": 39,
  "key": "cmb_unet",
  "title": "The network marks voxels. We need a count.",
  "part": "3  Microbleeds",
  "kind": "clip",
  "clip": "clips/36_cmb_unet.mp4",
  "poster": "poster/36_cmb_unet.jpg",
  "text": "A three D U net looks at the scan as a block, with the slices above and below, and marks every voxel that looks like a bleed. But doctors count bleeds, not voxels. So we group the voxels into objects.",
  "check": {
   "q": "The network marks 17 voxels. How many microbleeds is that?",
   "options": [
    "17",
    "1",
    "Unknown until the voxels are grouped"
   ],
   "answer": 2,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "Sudre et al. 2024, Med Image Anal (VALDO challenge)",
    "url": "https://doi.org/10.1016/j.media.2023.103029",
    "about": "VALDO challenge (MICCAI 2021): automatic detection of small vessel lesions, including microbleeds."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "A three D U net looks at the scan as a block, with the slices above and below, and marks every voxel that looks like a bleed. But doctors count bleeds, not voxels. So we group the voxels into objects.",
  "background": "Here we move from detection to counting. A three D U net reads the whole brain volume. It gives a label to each voxel. Voxels that look like a micro-bleed get marked. This is a dense task. Every voxel gets a decision. The output is a mask, not a number. But the clinical question is a number. How many micro-bleeds does this patient have? One micro-bleed is a small object. It may cover several voxels. So a mask with many marked voxels may still be one micro-bleed. We must group the voxels into objects. This step is called connected component analysis. In the next slides we use twenty-six connected clusters. Think of a simple case. The network marks seventeen voxels. Are there seventeen micro-bleeds? No. They may form one cluster, or two, or more. We cannot know until we group them. Ask the room: if two marked voxels touch only at a corner, should they be one object or two? This choice changes the count. It also changes the F one score. So the grouping rule matters. Keep this in mind for the next slide.",
  "qr": null
 },
 {
  "n": 40,
  "key": "cmb_26",
  "title": "Clusters: 26 neighbours",
  "part": "3  Microbleeds",
  "kind": "clip",
  "clip": "clips/37_cmb_26.mp4",
  "poster": "poster/37_cmb_26.jpg",
  "text": "Voxels that touch belong together: by a face, an edge, or a corner. Twenty six neighbours. One cluster is one micro-bleed.",
  "check": {
   "q": "Two marked voxels touch only at a corner. With 26 neighbours they are ...",
   "options": [
    "one cluster",
    "two clusters",
    "not counted"
   ],
   "answer": 0,
   "why": ""
  },
  "exercise": null,
  "sources": [
   {
    "label": "scipy.ndimage.label (connected clusters)",
    "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.ndimage.label.html",
    "about": "SciPy function that groups touching voxels into clusters; the neighbourhood (6 or 26) is a choice."
   }
  ],
  "optional": false,
  "key_q": true,
  "notes": "Voxels that touch belong together: by a face, an edge, or a corner. Twenty six neighbours. One cluster is one micro-bleed.",
  "background": "On this slide we turn a map of marked voxels into countable objects. The computer does not see a micro-bleed. It sees single voxels. So we need a rule that says which voxels belong to the same object. The rule here is twenty six connectedness. In three D, a voxel has twenty six neighbours. Six share a face. Twelve share an edge. Eight share only a corner. If two marked voxels are neighbours under this rule, they join the same cluster. Then we count clusters, not voxels. One cluster is one micro-bleed. This matters because a single micro-bleed often covers several voxels. Without clustering, one bleed could be counted many times. With clustering, it is counted once. A quick question for the room: if two marked voxels touch only at a corner, are they one cluster or two? With twenty six neighbours, they are one cluster. With six neighbours, they would be two. So the choice of rule changes the count. In our exercise we use twenty six neighbours, and one of the three scans shows how six neighbours would give two more objects.",
  "qr": null
 },
 {
  "key": "try_26",
  "title": "Try it: neighbours and clusters",
  "part": "3  Microbleeds",
  "kind": "try",
  "widget": "n26",
  "clip": null,
  "poster": null,
  "text": "Click voxels on the three slices. With 26 neighbours, voxels that touch only at an edge or a corner join one cluster; with 6 they stay separate. The count of microbleeds changes with the rule.",
  "notes": "Click voxels on the three slices. With 26 neighbours, voxels that touch only at an edge or a corner join one cluster; with 6 they stay separate. The count of microbleeds changes with the rule.",
  "background": "",
  "check": null,
  "exercise": null,
  "optional": false,
  "key_q": false,
  "sources": [
   {
    "label": "scipy.ndimage.label (connected clusters)",
    "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.ndimage.label.html",
    "about": "SciPy function that groups touching voxels into clusters; the neighbourhood (6 or 26) is a choice."
   }
  ],
  "qr": null,
  "n": 41
 },
 {
  "n": 42,
  "key": "f1",
  "title": "F1: counting hits and misses",
  "part": "3  Microbleeds",
  "kind": "clip",
  "clip": "clips/38_f1.mp4",
  "poster": "poster/38_f1.jpg",
  "text": "Now we count objects, not voxels. The expert marked five micro-bleeds: the circles. The program marked five places: the squares. Four are found. One is a false alarm: a vessel. And one bleed is missed. Precision: how many marks are real. Recall: how many bleeds we found. F one combines both. Four found, one false, one missed: F one is zero point eight.",
  "check": {
   "q": "TP = 3, FP = 3, FN = 0. Precision?",
   "options": [
    "0.5",
    "0.75",
    "1.0"
   ],
   "answer": 0,
   "why": "3 / (3 + 3)"
  },
  "exercise": null,
  "sources": [
   {
    "label": "Sudre et al. 2024, Med Image Anal (VALDO challenge)",
    "url": "https://doi.org/10.1016/j.media.2023.103029",
    "about": "VALDO challenge (MICCAI 2021): automatic detection of small vessel lesions, including microbleeds."
   }
  ],
  "optional": false,
  "key_q": true,
  "notes": "Now we count objects, not voxels. The expert marked five micro-bleeds: the circles. The program marked five places: the squares. Four are found. One is a false alarm: a vessel. And one bleed is missed. Precision: how many marks are real. Recall: how many bleeds we found. F one combines both. Four found, one false, one missed: F one is zero point eight.",
  "background": "This slide moves from voxel overlap to object detection. For micro-bleeds, we care about individual lesions, not single voxels. A true positive is a detected micro-bleed that is real. A false positive is a false alarm. A false negative is a missed micro-bleed. Precision tells us how many of our detections are real. Recall tells us how many real micro-bleeds we found. F one is the harmonic mean of precision and recall. It balances the two. In the example, we have four true positives, one false positive, and one false negative. Precision is four out of five marks, zero point eight. Four found and one missed means five real micro-bleeds, so recall is four out of five, also zero point eight. F one is then zero point eight. Ask the room: if we lower the detection threshold, what happens to precision and recall? Usually recall goes up, precision goes down. This trade-off matters for clinical use.",
  "qr": null
 },
 {
  "key": "try_f1",
  "title": "Try it: find the microbleeds",
  "part": "3  Microbleeds",
  "kind": "try",
  "widget": "f1",
  "clip": null,
  "poster": null,
  "text": "Click where you see a microbleed. Green: hit. Red: false alarm. 'Show answer' marks the expert's microbleeds and the misses. Precision, recall and F1 update with every click.",
  "notes": "Click where you see a microbleed. Green: hit. Red: false alarm. 'Show answer' marks the expert's microbleeds and the misses. Precision, recall and F1 update with every click.",
  "background": "",
  "check": null,
  "exercise": null,
  "optional": false,
  "key_q": false,
  "sources": [
   {
    "label": "Sudre et al. 2024, Med Image Anal (VALDO challenge)",
    "url": "https://doi.org/10.1016/j.media.2023.103029",
    "about": "VALDO challenge (MICCAI 2021): automatic detection of small vessel lesions, including microbleeds."
   }
  ],
  "qr": null,
  "n": 43
 },
 {
  "n": 44,
  "key": "count4",
  "title": "Why the count matters: four",
  "part": "3  Microbleeds",
  "kind": "clip",
  "clip": "clips/39_count4.mp4",
  "poster": "poster/39_count4.jpg",
  "text": "Why count so carefully? New Alzheimer drugs remove amyloid, but they can cause swelling and new bleeds in the brain. The risk is higher in people who already have micro-bleeds. So with more than four, the drug is not given. Four or five: one dot decides.",
  "check": {
   "q": "A patient has 5 microbleeds. By the appropriate use recommendations ...",
   "options": [
    "treatment is possible",
    "treatment is not recommended",
    "the count does not matter"
   ],
   "answer": 1,
   "why": "More than 4 microbleeds excludes treatment."
  },
  "exercise": null,
  "sources": [
   {
    "label": "Cummings et al. 2023, lecanemab: appropriate use",
    "url": "https://doi.org/10.14283/jpad.2023.30",
    "about": "Appropriate use recommendations for lecanemab: no treatment with more than 4 microhaemorrhages."
   },
   {
    "label": "Rabinovici et al. 2025, donanemab: appropriate use",
    "url": "https://doi.org/10.1016/j.tjpad.2025.100150",
    "about": "Appropriate use recommendations for donanemab: same limit of more than 4 microbleeds; superficial siderosis excludes."
   }
  ],
  "optional": false,
  "key_q": true,
  "notes": "Why count so carefully? New Alzheimer drugs remove amyloid, but they can cause swelling and new bleeds in the brain. The risk is higher in people who already have micro-bleeds. So with more than four, the drug is not given. Four or five: one dot decides.",
  "background": "New antibody drugs against amyloid (lecanemab, donanemab) can slow early Alzheimer's disease. Their main side effect is ARIA: amyloid related imaging abnormalities, swelling (ARIA-E) and new bleeds (ARIA-H) on MRI. The risk is higher in people who already have microbleeds; the US label names 2 or more microhaemorrhages as a risk factor. So the appropriate use recommendations exclude treatment with more than 4 microbleeds on the baseline scan (Cummings 2023, Rabinovici 2025); for donanemab any superficial siderosis also excludes. In the EU more than 4 microhaemorrhages is a formal contraindication for both drugs. One dot more or less on the scan decides about a therapy. Question to the room: who should count, the radiologist, the program, or both?",
  "qr": null
 },
 {
  "n": 45,
  "key": "cmb_vessel",
  "title": "Microbleed or vessel? Scroll.",
  "part": "3  Microbleeds",
  "kind": "clip",
  "clip": "clips/40_cmb_vessel.mp4",
  "poster": "poster/40_cmb_vessel.jpg",
  "text": "Is every dark dot a micro-bleed? No. On a single slice, a micro-bleed and a vessel cut across look the same. So scroll through the slices. The micro-bleed is gone after a few slices. The vessel goes on, slice after slice, and it moves. From the side, the micro-bleed is a ball, and the vessel is a line. Mark the vessel, and you have a false positive. Calcium, and the edges near bone and air, can fool us the same way.",
  "check": {
   "q": "A dark dot stays visible over 15 slices and moves sideways. It is most likely ...",
   "options": [
    "a microbleed",
    "a vessel",
    "calcium"
   ],
   "answer": 1,
   "why": "A microbleed is a small ball: it is gone after a few slices."
  },
  "exercise": null,
  "sources": [
   {
    "label": "Greenberg et al. 2009, Lancet Neurol (microbleeds)",
    "url": "https://doi.org/10.1016/S1474-4422(09)70013-4",
    "about": "Review of cerebral microbleeds: definition, detection on T2*/SWI, mimics and clinical meaning."
   },
   {
    "label": "Sudre et al. 2024, Med Image Anal (VALDO challenge)",
    "url": "https://doi.org/10.1016/j.media.2023.103029",
    "about": "VALDO challenge (MICCAI 2021): automatic detection of small vessel lesions, including microbleeds."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Is every dark dot a micro-bleed? No. On a single slice, a micro-bleed and a vessel cut across look the same. So scroll through the slices. The micro-bleed is gone after a few slices. The vessel goes on, slice after slice, and it moves. From the side, the micro-bleed is a ball, and the vessel is a line. Mark the vessel, and you have a false positive. Calcium, and the edges near bone and air, can fool us the same way.",
  "background": "Real data: one public scan (sub-207), one microbleed from the expert mask and one vessel that crosses the slices, each in a cut-out of about 20 mm. The microbleed (59 voxels) is seen on 5 of 19 slices (4 mm). The vessel is seen on all 19 slices (15 mm) and moves 8.3 mm sideways on the way. On one slice both are a dark dot; only scrolling tells them apart. Marking the vessel would count as a false positive in the exercise that follows. Other lookalikes: calcium (for example in the pallidum), and signal loss near bone and air.",
  "qr": null
 },
 {
  "n": 46,
  "key": "ex3",
  "title": "Your turn: find the microbleeds",
  "part": "3  Microbleeds",
  "kind": "exercise",
  "clip": null,
  "poster": "poster/41_ex3.jpg",
  "text": "Last exercise. Three scans. Scroll through the slices and click on every micro-bleed you find. Then you get your precision, your recall and your F one. You have nine minutes.",
  "check": null,
  "exercise": {
   "url": "../exercises/cmb-f1/index.html",
   "minutes": 9,
   "name": "Microbleed exercise",
   "what": "3 scans. Click every microbleed, then get your F1."
  },
  "sources": [
   {
    "label": "Sudre et al. 2024, Med Image Anal (VALDO challenge)",
    "url": "https://doi.org/10.1016/j.media.2023.103029",
    "about": "VALDO challenge (MICCAI 2021): automatic detection of small vessel lesions, including microbleeds."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Last exercise. Three scans. Scroll through the slices and click on every micro-bleed you find. Then you get your precision, your recall and your F one. You have nine minutes.",
  "background": "This is the final hands-on task. The scans come from the VALDO challenge, a public benchmark for microbleed detection. The data are shared for non-commercial use under a CC BY-NC-SA licence; the credit is on the exercise page. In the exercise you see three scans. You scroll through the slices. You click on every micro-bleed you find. The tool then compares your clicks with the reference marks. It gives you precision, recall and F one. Precision asks: of the spots you clicked, how many were real? Recall asks: of the real micro-bleeds, how many did you find? F one combines both into one number. A question for the room: which is worse in a clinical report, a false click or a missed micro-bleed? Think about that while you work. You have nine minutes. If you finish early, compare your F one with your neighbour and discuss where you disagree.",
  "qr": "qr/cmb-f1.png"
 },
 {
  "n": 47,
  "key": "beat3",
  "title": "Can you beat the algorithm?",
  "part": "3  Microbleeds",
  "kind": "clip",
  "clip": "clips/42_beat3.mp4",
  "poster": "poster/42_beat3.jpg",
  "text": "The best program reached an F one of about zero point seven. Hands up: who did better? Who found the big one, and who missed small ones?",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "Sudre et al. 2024: best VALDO microbleed method, median F1",
    "url": "https://doi.org/10.1016/j.media.2023.103029",
    "about": "VALDO results: the best microbleed method reached a median F1 of about 0.68 per scan."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "The best program reached an F one of about zero point seven. Hands up: who did better? Who found the big one, and who missed small ones?",
  "background": "Ask for hands: F1 above 0.8, above 0.68. In the VALDO challenge the best method for microbleeds reached a median F1 of 68.42 per scan (Sudre 2024). Ask who found the single large microbleed in the easy scan, and who missed small ones in the hard scan. Misses are usually the small, low-contrast ones; false alarms are usually vessels cut across. Your own catch question can go here.",
  "qr": null
 },
 {
  "n": 48,
  "key": "wrap",
  "title": "Three tasks, one rule",
  "part": "Wrap-up",
  "kind": "clip",
  "clip": "clips/43_wrap.mp4",
  "poster": "poster/43_wrap.jpg",
  "text": "Grey matter: check the quality score. Lesions: Dice, and small ones are hard. Micro-bleeds: F one, and beware lookalikes. One rule for all: never trust a segmentation you have not checked.",
  "check": null,
  "exercise": null,
  "sources": [],
  "optional": false,
  "key_q": false,
  "notes": "Grey matter: check the quality score. Lesions: Dice, and small ones are hard. Micro-bleeds: F one, and beware lookalikes. One rule for all: never trust a segmentation you have not checked.",
  "background": "So, three tasks, one rule. First, grey matter. You can use Free Surfer or Synth Seg. Always check the result by eye and with quality scores. Remember the Euler number: it summarises how complex the reconstructed surface is. It flags unusable images very well. But there is no fixed cut-off. And be careful: these tools fail at large lesions, for example a big stroke. Second, white matter lesions. Bianka or a U net can do the job. Check with Dice. Small lesions are hard. In the WMH challenge, the top eleven methods all used deep learning. Third, micro-bleeds. A U net finds them, then we group them into clusters. Check with F one. The lookalikes are the real problem. One example: a small vessel cross-section can look like a micro-bleed. Question for the room: which check would you trust most for a scan with many small white matter lesions? And the one rule for all three tasks: never trust a segmentation you have not checked.",
  "qr": null
 },
 {
  "n": 49,
  "key": "exam",
  "title": "Conclusion",
  "part": "Wrap-up",
  "kind": "clip",
  "clip": "clips/44_exam.mp4",
  "poster": "poster/44_exam.jpg",
  "text": "To conclude. First, know your image: a healthy brain, or one with a stroke lesion? These tools were trained on healthy brains, so you have to find out how to use them, for example by filling or masking the lesion. Second, a new scanner changes the image. A model trained on one data set often fails on another, so fine-tune it. Third, check with your own eyes: quality control really matters. Fourth, small lesions are always the problem. Large lesions and clusters are found in most cases, the small ones are the hard ones. And fifth, if you can, use several raters, because even experts do not agree.",
  "check": null,
  "exercise": null,
  "sources": [],
  "optional": false,
  "key_q": false,
  "notes": "To conclude. First, know your image: a healthy brain, or one with a stroke lesion? These tools were trained on healthy brains, so you have to find out how to use them, for example by filling or masking the lesion. Second, a new scanner changes the image. A model trained on one data set often fails on another, so fine-tune it. Third, check with your own eyes: quality control really matters. Fourth, small lesions are always the problem. Large lesions and clusters are found in most cases, the small ones are the hard ones. And fifth, if you can, use several raters, because even experts do not agree.",
  "background": "Conclusion, five lessons. (1) Know your image: healthy or with a stroke lesion? FreeSurfer and SynthSeg were trained on healthy brains; with a lesion you must decide how to use them (fill the lesion, or mask it and its surroundings). (2) A new scanner changes contrast and brightness: a model trained on one data set (BIANCA on known scanners) drops on another; fine-tune or retrain on local data. (3) Check with your own eyes: QC scores and Euler numbers help, but look at the picture. (4) Small lesions are the hard part: large lesions and clusters are found in most cases, small WMH and small microbleeds pull Dice and F1 down. (5) Use several raters where possible: even experts disagree (inter-rater Dice about 0.8).",
  "qr": null
 },
 {
  "n": 50,
  "key": "more",
  "title": "Films, slides and exercises stay online",
  "part": "Wrap-up",
  "kind": "clip",
  "clip": "clips/45_more.mp4",
  "poster": "poster/45_more.jpg",
  "text": "Everything stays online. For more practice, there is the full atlas trainer. Thank you.",
  "check": null,
  "exercise": null,
  "sources": [
   {
    "label": "github.com/mendeltem/mri-segmentation-lectures",
    "url": "https://github.com/mendeltem/mri-segmentation-lectures",
    "about": "The lecture's GitHub repository with slides, films and exercises."
   },
   {
    "label": "MRT atlas trainer: more practice after the atlas quiz",
    "url": "https://mendeltem.github.io/mrt-atlas-trainer/",
    "about": "The full atlas trainer for home: explore, quiz and study modes with many more brain regions (interface in German)."
   }
  ],
  "optional": false,
  "key_q": false,
  "notes": "Everything stays online. For more practice, there is the full atlas trainer. Thank you.",
  "background": "This is the closing slide. Keep it short and warm. Tell the room that the animated clips, the full slide deck and the three exercises are all online. They can go back to any part at their own pace. The exercises are the best way to make the material stick. For example, ask them to redo the hard lesion case at home and try to beat their Dice. Then ask the room one question: which of the three tasks, grey matter, W M H or micro-bleeds, felt hardest today? That question often shows which topic needs more time next year. Remind them that the films have sound, so they can switch the voice back on if they want. Point them to the source link on the slide: the lecture materials live on the Git Hub page github.com/mendeltem/mri-segmentation-lectures. Thank them for their attention and for the questions. Invite them to write to you with any follow-up. End on time.",
  "qr": null
 }
];
