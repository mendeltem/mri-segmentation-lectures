// made by film/code/11_make_qa.py, do not edit by hand
window.QA = {
"plan": [
{
"q": "Why exactly these three tasks?",
"a": "They are three things that are measured very often on brain MRI: how much grey matter there is, how much white matter is damaged, and how many small bleeds there are. They also get harder step by step: a large structure, then patchy lesions, then tiny dots."
},
{
"q": "What is grey matter?",
"a": "Grey matter is the tissue that holds the nerve cell bodies. It forms the cortex, the folded outer layer of the brain, and deep structures such as the thalamus. White matter lies beneath the cortex and holds the connecting fibres."
},
{
"q": "What are white matter lesions?",
"a": "They are spots of damaged white matter. On a FLAIR image they look bright, so they are also called white matter hyperintensities. They are a sign of small vessel disease. Part two explains them."
},
{
"q": "What is a microbleed?",
"a": "A microbleed is a tiny old bleed in the brain. On a T2-star image it is a small round dark dot, generally 2 to 5 millimetres wide, sometimes up to 10. There is no strict size limit. Part three explains it."
},
{
"q": "Which of the three targets is the hardest for a program?",
"a": "The smallest one. Microbleeds are only a few millimetres wide, so a few voxels decide, and vessels can look the same on one slice. On public data the best program reached an F1 score of about 0.7, where 1 would be perfect."
},
{
"q": "What are FreeSurfer, SynthSeg, BIANCA and U-Net?",
"a": "They are the programs of today. FreeSurfer and SynthSeg label brain regions. BIANCA and the U-Net find white matter lesions. A 3D U-Net finds microbleeds. For each one you need the idea behind it, not the code."
},
{
"q": "Why does the U-Net appear in two of the three tasks?",
"a": "A U-Net is a neural network built for marking things in images. It first shrinks the image to see the context, then goes back to full size to mark the detail. This idea is general, so it is used for lesions and, in 3D, for microbleeds."
},
{
"q": "Why do we need programs at all? Can an expert not mark everything by hand?",
"a": "An expert can, and expert marks are the reference. But it is slow, and two experts do not fully agree. A large study has thousands of scans. So we let a program do it, and then we check the program."
},
{
"q": "Does each task need a different MRI image?",
"a": "Yes. Grey matter is usually measured on a T1 image. White matter lesions are seen best on FLAIR, where they are bright. Microbleeds need a T2-star image or SWI, where they are dark. So one MRI session gives several images for several tasks."
},
{
"q": "What do I need to take home from the three parts for the exam?",
"a": "Three practical skills. Read a quality score and decide when to look again. Compute a Dice score from hits, extra marks and misses. Count clusters and compute an F1 score. You practise all three in the exercises today."
}
],
"intro": [
{
"q": "What is a voxel?",
"a": "A voxel is one small cube of the scan, the 3D version of a pixel. Each voxel has one brightness value. In the scan shown here, each voxel is 1 millimetre long on every side."
},
{
"q": "What does segmentation mean exactly?",
"a": "Segmentation gives every voxel a label that says what it is: cortex, white matter, thalamus and so on. The result is a label map with the same size as the scan. It says where things are and how big they are."
},
{
"q": "How do you get 562 millilitres from counting voxels?",
"a": "Each voxel here is 1 cubic millimetre, and 1,000 cubic millimetres are 1 millilitre. The cortex label has about 562,000 voxels. Divide by 1,000 and you get 562 millilitres."
},
{
"q": "Is 562 millilitres a normal value for the cortex?",
"a": "It is one healthy person aged 54 from public data, not a norm. Volume depends on head size, age and sex, and also on the tool. So compare only volumes from the same tool, and take head size into account."
},
{
"q": "What if a voxel lies on a border and holds two tissues?",
"a": "That is called partial volume. A hard label must pick one tissue. Some tools give a probability instead, and a voxel that is half cortex counts as half. In our example this moves the cortex from 562 to about 555 millilitres."
},
{
"q": "What if the voxels are not 1 millimetre cubes?",
"a": "Then you multiply: number of voxels times the volume of one voxel. A clinical voxel of 1 by 1 by 5 millimetres holds 5 cubic millimetres. Large voxels also mix more tissues, so borders become less exact."
},
{
"q": "Why can the computer not simply use the brightness to find the cortex?",
"a": "MRI brightness has no fixed unit. It changes between scanners and even across one image. And different structures can have the same brightness. So the tools also use position, shape and the neighbours of a voxel."
},
{
"q": "Why do we want volumes at all?",
"a": "A volume is a number that we can compare between people and over time. Grey matter shrinks with age and with disease. In our public sample, people over 60 had about 2 percent less cortex and 4 percent less hippocampus per decade of age."
},
{
"q": "Who decides which label is the right one?",
"a": "The reference is a human expert who labels scans by hand and follows a written protocol. Programs learn from such hand-labelled brains and are tested against them. Experts are not perfect, so the reference is the best we have, not the absolute truth."
},
{
"q": "How many different labels are there?",
"a": "As many as the method defines. FreeSurfer's whole-brain labelling started with 37 labels in 2002 and has about 40 today. The cortex can then be split further, for example into 34 named regions per hemisphere."
}
],
"gm_use": [
{
"q": "What do A, T and N stand for?",
"a": "A is amyloid, T is tau, N is nerve cell damage (neurodegeneration). Atrophy on MRI is one of three accepted signs of N; the other two are tau in the spinal fluid and low sugar use on a PET scan. It is a scheme for research. Its authors say it is too early to use it in general practice."
},
{
"q": "Does a small hippocampus prove Alzheimer's disease?",
"a": "No. Atrophy shows that nerve cells were lost, not why. The research scheme itself calls MRI atrophy a non-specific sign of damage that can have many causes, for example damage from vessel disease. A small volume is one piece of the picture, never the diagnosis."
},
{
"q": "Can I trust the number in one patient? Is a change real?",
"a": "Be careful. The same person scanned twice on the same scanner differed by up to 4.3 % in older people, with no real change. A healthy hippocampus shrinks by about 1 % per year, in Alzheimer's disease by about 4.7 %. So one year of normal ageing is inside the measurement error. Groups are easy, one patient is hard."
},
{
"q": "What is normal for a given age?",
"a": "The brain charts give a centile, like a growth chart: this volume is larger than in so many percent of people of the same age. There is no agreed cut-off such as \"below this centile is abnormal\". And a centile only fits if the scan was processed the same way as the chart."
},
{
"q": "Can I compare volumes from another scanner or another software version?",
"a": "Not without care. In one study, a new version of the same software alone changed the volumes by 8.8 % on average, on the very same images. Mixing scanners adds a bias too. For follow-up, keep scanner, protocol and software version fixed, or process all scans again with one version."
},
{
"q": "Which volumes do drug trials report?",
"a": "Most often the hippocampus, the lateral ventricles and the whole brain. One surprising result: in trials of the Alzheimer antibodies that cause brain swelling as a side effect, the ventricles grew faster on the drug than on placebo, by about 2 millilitres. We checked the finding, not an explanation for it."
},
{
"q": "In multiple sclerosis: does less shrinkage mean my patient will do better?",
"a": "The result is about trials, not about single patients. Across 13 trials with more than 13,500 patients, drugs with a larger effect on brain shrinkage also had a larger effect on disability. That makes atrophy a useful trial outcome. It is not a rule for the single patient."
},
{
"q": "One percent smaller in depression: why does that matter at all?",
"a": "For one patient it does not: you cannot see it and you cannot measure it reliably. It only became clear with 1,728 patients and 7,199 healthy people. Compare epilepsy with a scarred hippocampus: there the difference is so large that you can see it in a single patient. Same organ, same method, very different use."
},
{
"q": "Are these programs approved for use in the clinic?",
"a": "The two tools in this lecture are research tools; the licence of the first one says it was designed for research purposes only. Commercial volume reports with approval exist. A review found 17 such products, but only 4 had published proof that they help in dementia patients."
},
{
"q": "Do radiologists use these numbers today?",
"a": "Mostly not yet. For atrophy, looking at the scan and rating it by eye is still the everyday method; a study of visual rating scales says visual assessment remains the primary method. We found no verified single number for how well visual rating and automatic volumes agree for grey matter."
}
],
"fs_idea": [
{
"q": "What does pial mean?",
"a": "The pia mater is the thin membrane that lies directly on the brain. The pial surface is the outer border of the cortex, where grey matter meets the fluid around the brain."
},
{
"q": "What is the white surface? Is it the surface of the brain?",
"a": "No. The white surface is the border between white matter and grey matter, so it is the inner border of the cortex. The name comes from the white matter that it wraps."
},
{
"q": "Why does FreeSurfer treat the cortex as a sheet and not as voxels?",
"a": "The cortex is a thin folded layer, only a few millimetres thick. With voxels of 1 millimetre, counting voxels is too coarse to measure its thickness. A surface can run between the voxel centres, so the border is placed more finely than one voxel."
},
{
"q": "How thick is the cortex?",
"a": "A few millimetres, and it differs from region to region. That is only a few voxels on a normal scan. This is why thickness needs a careful method."
},
{
"q": "How does FreeSurfer find the two surfaces?",
"a": "It first finds the white matter, which is the brightest tissue on a T1 image. It wraps a mesh of small triangles around it: the white surface. Then it pushes this mesh outwards until the grey matter ends: the pial surface."
},
{
"q": "Is cortical thickness one number per brain?",
"a": "No. It is measured at every point of the surface mesh, as the distance from the white surface to the pial surface. So you get a thickness map of the whole cortex. You can then average it per region or per hemisphere."
},
{
"q": "Why measure thickness and not just the cortex volume?",
"a": "Volume mixes two things: how thick the cortex is and how large its area is. Thickness shows thinning directly. Thinning is seen in ageing and in diseases such as Alzheimer's disease."
},
{
"q": "What can make the surfaces wrong?",
"a": "Anything that blurs the border between grey and white matter, for example head movement. Lesions too: the FreeSurfer documentation shows that a brain lesion can make the white surface wrong. This must then be repaired by hand."
},
{
"q": "Why two surfaces per hemisphere, and what about the cerebellum?",
"a": "FreeSurfer builds a white and a pial surface for the left and for the right hemisphere of the cerebrum. The cerebellum and the deep structures get no surfaces. They are labelled voxel by voxel."
},
{
"q": "How old is this method, and is it still used?",
"a": "The surface method was published in 1999 by Dale, Fischl and Sereno, and was shown on more than 100 subjects. It is still the standard tool for cortical thickness today."
}
],
"fs_thick": [
{
"q": "How exactly is thickness measured at one point?",
"a": "The surface is a mesh of small triangles. At every corner point of this mesh, FreeSurfer takes the closest distance from the white surface to the pial surface. This distance is the thickness at that point. So you do not get one number per brain, but one number per point of the surface."
},
{
"q": "Why not simply count the cortex voxels?",
"a": "Counting voxels gives a volume. Volume mixes two things: how thick the cortex is and how large its area is. And a voxel is about 1 mm wide, while the cortex is only a few millimetres thin. Two surfaces placed between the voxels measure the thickness itself, and more finely."
},
{
"q": "How can a measurement be finer than one voxel?",
"a": "A voxel at the border is partly grey and partly white matter, so its grey value lies in between. From the grey values of several neighbours, the border can be placed inside a voxel. The FreeSurfer documentation says the maps are not restricted to the voxel resolution and can detect submillimetre differences."
},
{
"q": "How thick is the cortex?",
"a": "Only a few millimetres, and it differs from region to region. That is why the method matters: a change that is interesting in research is much smaller than one voxel."
},
{
"q": "What is the difference between thickness, area and volume?",
"a": "Volume is roughly thickness times area. Two people can have the same cortex volume, one with a thinner cortex and a larger area, the other the opposite. FreeSurfer gives all three separately for every region."
},
{
"q": "What can make the thickness wrong?",
"a": "Every error of a surface. If the white or the pial surface is in the wrong place, the distance is wrong too. Typical causes are head motion, weak contrast, pieces of skull or brain membrane left in the image, and lesions. So look at the surfaces on the scan before you trust the numbers."
},
{
"q": "Can SynthSeg measure cortical thickness?",
"a": "No. SynthSeg gives a label for every voxel, and from that volumes. Thickness needs surfaces. FreeSurfer 8.2.0 ships a script, recon-all-clinical, that builds surfaces on clinical scans; we have not tested it."
},
{
"q": "How precise is the measurement?",
"a": "In the original paper (Fischl and Dale 2000), the standard deviation of the thickness between people was below 0.5 mm, and the method was tested by scanning the same people again. The authors conclude that focal thinning can be found in small groups."
},
{
"q": "Is the picture on this slide real data?",
"a": "No, it is a sketch: a cut through the cortex with two drawn lines. Real surfaces are meshes in three dimensions. The slide before shows real ones."
},
{
"q": "Why is the white surface inside and the pial surface outside?",
"a": "The names come from what they border. The white surface is the border between white matter and grey matter, so it is the inner side of the cortex. The pial surface is the border between grey matter and the brain fluid, the outer side. Pia is the thin membrane that covers the brain."
}
],
"fs_atlas": [
{
"q": "Why blow the cortex up into a sphere?",
"a": "On the folded brain, much of the cortex is hidden inside the folds. On a sphere, every point has a simple address, like latitude and longitude on a globe. Then the same address can mean the same place in every brain."
},
{
"q": "Does inflating not distort the cortex?",
"a": "Yes, the surface is stretched a little. But every point remembers how deep it was in a fold, so the folding pattern stays visible. And thickness is measured on the original folded surface, not on the sphere."
},
{
"q": "What is the average brain that the folds are matched to?",
"a": "It is an average folding pattern from 40 brains, stored on the sphere. Each new brain is shifted and stretched on the sphere until its folds line up with this average."
},
{
"q": "What is the atlas with 34 regions called?",
"a": "It is the Desikan-Killiany atlas from 2006. It has 34 regions per hemisphere, so 68 in the whole cortex. It was learned from 40 brains that experts labelled by hand."
},
{
"q": "What are a gyrus and a sulcus?",
"a": "A gyrus is the ridge of a fold, a sulcus is the groove between two ridges. The regions of this atlas follow the gyri. One region is one gyrus, and its borders run in the sulci."
},
{
"q": "How good is the automatic naming compared with an expert?",
"a": "In the atlas paper, the agreement with hand labels was 0.835 on a scale where 1 is perfect agreement. The measure is the intraclass correlation. The borders were less than 1 millimetre apart on average."
},
{
"q": "Are there other atlases with more or fewer regions?",
"a": "Yes. The Destrieux atlas has 74 labels per hemisphere and also names the sulci. The DKT protocol has 31 regions per hemisphere. How many regions there are is a choice of the atlas makers, not a fact of nature."
},
{
"q": "What if a person's folds look different from the average?",
"a": "Folds differ between people, mostly the small ones. The method picks the most likely name for each point. It uses the folding and the names of the neighbours, learned from hand-labelled brains. In an unusual brain the borders are less certain."
},
{
"q": "Are these regions the same as functional areas of the brain?",
"a": "Not exactly. The regions follow the folds that we can see on MRI. The borders of functional areas do not always follow the folds. So a region is an anatomical address, not a functional unit."
},
{
"q": "Do I have to know all 34 names?",
"a": "For this slide, keep the idea: inflate, match the folds, give names. And keep the number: 34 regions per hemisphere. The atlas quiz after this part trains the names of a few important structures."
}
],
"fs_steps": [
{
"q": "What happens to the scan before the skull is removed?",
"a": "It is resampled to a standard grid: 256 voxels in each direction, each 1 mm wide. And the brightness is evened out across the image, so that white matter has about the same grey value everywhere."
},
{
"q": "Why must the skull be removed?",
"a": "Skull, skin and the brain membranes have grey values that overlap with brain tissue. If pieces are left, later steps can take them for brain. A classic error: the pial surface is pulled outwards into a leftover piece of membrane."
},
{
"q": "What is a mesh?",
"a": "A surface made of many small triangles. The corner points are called vertices. Each vertex has a position in space and can carry a number, for example the thickness at that place."
},
{
"q": "What does 'holes are repaired' mean?",
"a": "The cortex of one hemisphere is one closed sheet, like the skin of a ball. Noise can create small holes or bridges in the first surface, which a real cortex cannot have. FreeSurfer finds these defects and repairs them. This is called topology correction."
},
{
"q": "Why is the white surface built first?",
"a": "On a T1 scan the border between white and grey matter is the clearest one. The outer border, towards fluid and membranes, is harder to find. So FreeSurfer starts at the safe border and grows outwards from it."
},
{
"q": "What happens if an early step fails?",
"a": "All later steps inherit the mistake, because each one works on the result of the step before. You repair the early result and run the later steps again. You do not start a different chain."
},
{
"q": "Can errors be corrected by hand?",
"a": "Yes. The documentation describes manual edits, for example editing the white matter volume when a lesion makes the white surface wrong. After the edit, the following steps are run again."
},
{
"q": "Where are the deep structures, such as the hippocampus?",
"a": "They come from a second branch of the same command. There, every voxel gets one of about 40 labels with the help of an atlas built from hand-labelled brains. The surfaces are only for the cortex."
},
{
"q": "Why does all this take hours?",
"a": "There are many steps, and the surfaces are fitted and repaired point by point for both hemispheres. The documentation gives run times from about 3 hours (version 6, parallel, new computer) to 20 to 40 hours on old pages."
},
{
"q": "Do I have to start each step myself?",
"a": "No. One command, recon-all, runs the whole chain in a fixed order. But you can run parts of it again, for example after a manual correction."
}
],
"fs_run": [
{
"q": "How many hours does one scan take?",
"a": "There is no single official number. The FreeSurfer documentation gives just under 3 hours for version 6 on a newer workstation with parallel processing, and 20 to 40 hours on older pages. It depends on the version and on the computer."
},
{
"q": "What does recon-all mean?",
"a": "It is short for reconstruct all. It is the one FreeSurfer command that runs all steps of the cortical reconstruction in a row, from the raw T1 image to the named regions."
},
{
"q": "Why does it need a T1 image?",
"a": "On a T1 image, white matter is bright, grey matter is darker and fluid is dark. The method uses exactly this contrast to find the two borders of the cortex. Research T1 images also have small voxels of about 1 millimetre."
},
{
"q": "What does the program do in all those hours?",
"a": "It runs many steps in a row. It removes the skull, evens out the brightness, labels the deep structures, finds the white matter, builds the white and the pial surface, inflates them, maps them to a sphere and names the regions."
},
{
"q": "What is a clinical scan, and why does recon-all struggle with it?",
"a": "A clinical scan is made in hospital routine, where time is short. It often has thick slices, for example 5 millimetres, or another contrast than T1. The cortex is only a few millimetres thick, so with thick slices its borders cannot be placed well."
},
{
"q": "How do I notice that a run went wrong?",
"a": "Sometimes it stops with an error. Worse, it can finish with wrong surfaces. So look at the result. FreeSurfer also gives a warning number, the Euler number. It flags unusable scans very well, but there is no cut-off that fits every study."
},
{
"q": "Can I repair a wrong result by hand?",
"a": "Yes. FreeSurfer lets you edit intermediate images and run the later steps again. For brain lesions, the documentation says to edit the white matter volume and not to use control points. Editing takes time and training."
},
{
"q": "What do I get at the end of a run?",
"a": "One folder per person. It holds the two surfaces per hemisphere, the thickness at every point, the named cortical regions, the labels of the deep structures, and tables with thickness and volume per region."
},
{
"q": "Do I need a special computer, and does it cost money?",
"a": "No graphics card is needed. It runs on a normal processor under Linux or macOS. FreeSurfer is free for research; you only register for a licence file. The real cost is computing time."
},
{
"q": "Is there a way to get surfaces from clinical scans anyway?",
"a": "There is a newer route. FreeSurfer 8.2 ships a command called recon-all-clinical, which gives surfaces and thickness on clinical scans. It is described in a preprint by Gopinath and colleagues. We do not cover it today, and its results need the same checks."
}
],
"ss_idea": [
{
"q": "What is a neural network?",
"a": "It is a program with millions of adjustable numbers. In training it sees many examples together with the right answer, and it adjusts its numbers until its answers fit. Nobody writes the rules by hand."
},
{
"q": "Where do the fake images come from?",
"a": "From label maps: maps that say where each structure lies. A generator gives every structure a random brightness and the image a random resolution, so no two fake images look alike. The result is an image for which the right labels are already known."
},
{
"q": "Why not simply train on real scans?",
"a": "A network trained on real scans learns the look of those scans. On another contrast or another slice thickness it often fails. Real scans also need labels made by hand, which is slow. Synthetic images come with their labels for free."
},
{
"q": "What does random contrast mean?",
"a": "Contrast says which tissue is bright and which is dark. On T1, white matter is brighter than grey matter. On T2 it is the other way round. In training, every structure gets a random brightness, even combinations that no scanner produces."
},
{
"q": "Why is a real scan then just one more variation?",
"a": "The network has seen such a wide range of images that it cannot rely on one fixed brightness. It must learn the shape and the place of each structure. A real scan lies inside this range. The technical name is domain randomisation."
},
{
"q": "The fake images do not look like real scans. Is that not a problem?",
"a": "No, that is the point. They do not have to look real. They have to cover more variation than real scans show. The authors then tested the network on 5,000 real scans of six image types and ten resolutions."
},
{
"q": "Is anything real in the training at all?",
"a": "Yes, the anatomy. The label maps come from real brains, so the network learns real shapes. The training also pastes in white matter lesion labels in half of the cases, to make it more robust against such lesions."
},
{
"q": "What do resolution and noise mean here?",
"a": "Resolution is the size of the voxels, for example 1 millimetre cubes or 5 millimetre slices. Noise is the random grain in an image. Both were varied at random in training, so the network has seen sharp, blurred, thin and thick images."
},
{
"q": "Which labels does SynthSeg give?",
"a": "A whole-brain label map: white matter, cortex, ventricles, deep structures such as thalamus, putamen and hippocampus, the cerebellum and the brainstem. As an option, the cortex is also split into 68 regions, 34 per hemisphere."
},
{
"q": "Who made SynthSeg, and where do I get it?",
"a": "Billot and colleagues published it in 2023 in the journal Medical Image Analysis. The code is public, and SynthSeg is also part of FreeSurfer. The paper is under the Sources button."
}
],
"ss_make": [
{
"q": "Where do the label maps come from?",
"a": "From segmented brains: 20 maps were drawn by hand, 1,000 more came from automatic segmentations of research scans that were checked by eye, half of them from young adults, half from older people, some with dementia. Automatic maps are allowed here, because the fake image is made from the map and fits it perfectly."
},
{
"q": "Why bend the label map?",
"a": "To get more brain shapes than there are label maps. Without this step the network lost 4.3 Dice points in the authors' test."
},
{
"q": "Would realistic images not be better for training?",
"a": "The authors tested this. Networks trained on images narrowed to the contrast or resolution of the target scans were worse, by 1.4 and 2.6 Dice points, although they were trained again for every target. Images beyond what is realistic force the network to rely on shape."
},
{
"q": "What is the uneven brightness in step 3?",
"a": "Real scanners do not receive the signal equally well from all places, so the same tissue is brighter in one corner than in another. This is called the bias field. The generator adds a random one. Without it the network lost 3.7 Dice points."
},
{
"q": "Why make the image coarse on purpose?",
"a": "Clinical scans often have thick slices. The generator blurs the image, keeps only thick slices in a random direction, and brings it back to the 1 mm grid. The target stays the sharp label map. So the network learns to give 1 mm labels even from a coarse scan."
},
{
"q": "How many fake images does the network see?",
"a": "A new one at every training step, and there are 300,000 steps. Images are made on the fly and never stored, so the network practically never sees the same image twice."
},
{
"q": "How long does the training take?",
"a": "About seven days on one graphics card, the authors write. But it is done only once: the trained network is shipped with FreeSurfer, and nobody has to train it again for a new kind of scan."
},
{
"q": "Does the network really never see a real scan?",
"a": "Not in training. The paper states that the training data does not include any real scan. Real scans are used only to choose settings and to test."
},
{
"q": "Does the generator know lesions?",
"a": "Partly. With 50 % probability, labels of white matter lesions are pasted into the map, to make the network robust against them. Without this, results on scans of older people dropped by 3.9 Dice points. A large stroke is a different matter, as the next slides show."
},
{
"q": "Are the pictures on the slide the real generator?",
"a": "They are a simplified illustration: one slice of a public scan, with the same steps in the same order. The real generator works in three dimensions and runs on the graphics card during training."
}
],
"ss_fast": [
{
"q": "How fast is it exactly?",
"a": "The sources do not agree. On a graphics card they give 6 to 16 seconds per scan, on a normal processor 1 to 2 minutes. Our own run on a normal processor took 52 seconds."
},
{
"q": "Why is it so much faster than FreeSurfer?",
"a": "A trained network only passes the image through its layers once. All the hard work was done before, in training. FreeSurfer has to fit and move its surfaces step by step for every new scan."
},
{
"q": "Why does it give no surfaces and no cortical thickness?",
"a": "SynthSeg labels voxels, and its output has voxels of 1 millimetre. The cortex is only a few millimetres thick, so counting voxels is too coarse for thickness. The authors name surfaces for cortical thickness as future work."
},
{
"q": "Which tool should I use, SynthSeg or FreeSurfer?",
"a": "It depends on your question and your scans. For volumes on mixed or clinical scans, take SynthSeg. For cortical thickness on good research T1 images, take FreeSurfer. Many studies use both."
},
{
"q": "What does almost any contrast mean? Where is the limit?",
"a": "The authors tested it on 5,000 scans of six kinds of image and ten resolutions, also with thick slices. In the authors' clinical test, the failures came mainly from poor images: very noisy scans, or scans that did not cover the whole brain."
},
{
"q": "What does without retraining mean?",
"a": "Normally a network must be trained again, with new labelled examples, for every new kind of scan. SynthSeg uses one and the same trained network for all contrasts and resolutions. You just run it."
},
{
"q": "What is a graphics card, and do I need one?",
"a": "A graphics card, or GPU, is a computer part that does very many simple calculations at once. Neural networks run much faster on it. SynthSeg also runs without one, on a normal processor. It is only slower."
},
{
"q": "Is a volume from a scan with 5 millimetre slices as good as from a 1 millimetre scan?",
"a": "SynthSeg gives labels at 1 millimetre for any input, but it cannot bring back detail that the scan never had. So expect more uncertainty, above all for small structures. There is a robust version made for clinical scans with thick slices."
},
{
"q": "Do I have to prepare the scan first, for example remove the skull?",
"a": "No. SynthSeg takes the raw scan. In our own test on public data, removing the skull first did not help: for the cortex it made no difference, and some deep structures became a little noisier."
},
{
"q": "How do I run SynthSeg in practice?",
"a": "With one command inside FreeSurfer, with the input scan and an output name. Options add the cortical regions, a table of volumes, a table of quality scores, and the robust version for difficult scans."
}
],
"tool_choice": [
{
"q": "Can FreeSurfer be used on clinical scans at all?",
"a": "The standard command needs a T1 scan with about 1 mm voxels. FreeSurfer 8.2.0 also ships a script for clinical scans, recon-all-clinical, which builds surfaces with the help of networks trained on synthetic images. We have not tested it."
},
{
"q": "Is SynthSeg as accurate as a network trained on the same kind of scan?",
"a": "Almost. On good 1 mm T1 scans it reached a Dice of 0.88, against 0.91 for networks trained on exactly this kind of scan. On every other kind of scan in the test, SynthSeg was the best method."
},
{
"q": "Can I use both tools in one study?",
"a": "Not for the same measure. Each tool has its own systematic differences, so a volume from one is not comparable with a volume from the other. Use one tool, in one version, for all people and all time points, and report it."
},
{
"q": "I have a research T1 and clinical scans of the same people. What now?",
"a": "Decide by the question. If all people have the T1 and you need thickness, use FreeSurfer on the T1. If only some have it, a tool that works on all scans gives you the same method for everybody."
},
{
"q": "How long do 1,000 scans take?",
"a": "With SynthSeg at about a minute per scan: roughly 17 hours on one normal computer. With FreeSurfer at several hours per scan you need a computing cluster, where many scans run side by side."
},
{
"q": "Does SynthSeg also work on CT?",
"a": "The authors tested it on CT scans with 3 mm slices and it gave usable labels. But the test set was small: 6 scans."
},
{
"q": "Do the two tools give the same regions?",
"a": "Largely. SynthSeg learned from label maps in FreeSurfer's naming, so the deep structures carry the same names. With an option, SynthSeg also divides the cortex into regions. The numbers still differ between the tools."
},
{
"q": "Are there other tools than these two?",
"a": "Yes, several. The lecture picks these two because they stand for two ideas: surfaces fitted to the image step by step, and a network trained on synthetic images. The questions on the slide apply to any other tool as well."
},
{
"q": "What does 'look at the result' mean in practice?",
"a": "Lay the labels over the scan and scroll through it. Check the borders of the cortex, the deep structures and every place with a lesion. For many scans, use the automatic quality scores first and look at the worst ones. The next slides show how."
},
{
"q": "Why do both tools always give an answer?",
"a": "Neither has a way to say 'I cannot do this scan'. FreeSurfer fits its surfaces to whatever is there; the network gives every voxel its most likely label. So a wrong result looks as tidy as a right one."
}
],
"qc_score": [
{
"q": "What does QC mean?",
"a": "QC stands for quality control. It means checking whether a result is good enough to be used. Here it is an automatic score between 0 and 1 for each group of structures."
},
{
"q": "Why not simply look at every scan?",
"a": "Looking works for ten scans, not for ten thousand. The score tells you where to look first. In our run on 967 public scans, only 16 had a failed score. Those are the ones to open."
},
{
"q": "How can a network judge the result without seeing the scan?",
"a": "It has learned how plausible label maps look: the shapes, sizes and places of the structures. A broken segmentation has holes, ragged borders or missing parts. From this the network guesses how well the labels would agree with an expert."
},
{
"q": "What does a score such as 0.722 mean?",
"a": "It is a predicted Dice score. Dice measures the overlap between the program's labels and an expert's labels: 1 is perfect, 0 is no overlap. Part two explains it. Here it is only a guess, because no expert labelled this scan."
},
{
"q": "Why is the limit 0.65?",
"a": "The authors chose this value on their validation scans. It is stated in the paper only, not in the official documentation of the tool. So it is a convention from one study, not a law of nature."
},
{
"q": "Why did the scan of the person aged 81 fail? Is it the age?",
"a": "The score judges the segmentation, not the person. This scan had the lowest grey matter score of our whole run, 0.636, just under the limit. The number alone does not tell us why. That is why the rule is: look at it."
},
{
"q": "If all scores pass, can I trust the volumes?",
"a": "Not completely. The score sees only the label map. A label map can look plausible and still be wrong for this brain. So passing is necessary, but it is not enough. You still look at a sample of your scans."
},
{
"q": "Which regions get a score?",
"a": "The tool writes eight groups: white matter, grey matter, fluid, cerebellum, brainstem, thalamus, putamen with pallidum, and hippocampus with amygdala. The paper describes ten regions. In our run, grey matter had the lowest scores, with a median of 0.72."
},
{
"q": "What do I do with a scan that failed?",
"a": "Open it and put the labels on the scan. If the segmentation is really wrong, leave that region or that scan out of the analysis, and write down what you did. Never delete a scan without looking at it."
},
{
"q": "How reliable is this score itself?",
"a": "In the authors' own test it sorted segmentations into good and failed with an accuracy of 0.981, so it was right in about 98 of 100 cases. That is their data. On your data, check some passed and some failed scans by eye."
}
],
"try_qc": [
{
"q": "What am I supposed to do on this slide?",
"a": "Drag the slider or turn the mouse wheel to move through the slices. Go to the slices with the red outline: that is the stroke. Then switch the labels off and on, and compare the colours inside the outline with the grey picture under them."
},
{
"q": "What do the colours mean?",
"a": "Each colour is one label, so one structure that SynthSeg named. Move the mouse over the picture and the name appears on the right, for example Left-Putamen. Names that start with ctx are regions of the cortex. Places without colour have no label."
},
{
"q": "Where does the red outline come from? Did SynthSeg find the stroke?",
"a": "No. An expert drew the stroke by hand, and this mask comes with the public data. The lesion has 21.9 millilitres. SynthSeg has no label for a stroke. It gives every voxel of the brain one of its normal names, also inside the lesion."
},
{
"q": "The labels look tidy to me. What exactly is wrong?",
"a": "Switch the labels off and look inside the outline. The tissue there is dark, because the stroke destroyed it. Now switch them on: parts of this area carry normal names such as white matter, insula or caudate. The label map still looks plausible. The picture does not."
},
{
"q": "What does the table on the right show?",
"a": "The eight QC scores of this scan, one for each group of structures, such as white matter, thalamus or brainstem. Each score covers the whole group in both halves of the brain. A tick means 0.65 or more. Here all eight pass; the lowest is grey matter with 0.71."
},
{
"q": "What would have to happen for a score to fail on this scan?",
"a": "The label map itself would have to look broken: holes, ragged borders, missing parts. In the authors' test, failures came mainly from poor images, very noisy ones or ones that did not cover the whole brain. Here the label map still looks plausible, so the QC network lets it pass."
},
{
"q": "Grey matter has the lowest score, 0.71. Is that because of the stroke?",
"a": "We cannot conclude that. Grey matter is the lowest group without a stroke too: in our run on 967 public scans of healthy people its middle value was 0.72. So 0.71 is an ordinary value. Nothing in the eight numbers points to the lesion."
},
{
"q": "On which side of the brain is the stroke?",
"a": "On the left. Move the mouse over the structures next to the outline: their names begin with Left. In this widget the left half of the brain is on the left of the picture. Many clinical viewers show it the other way round, so always check the side."
},
{
"q": "Are all volumes of this patient useless now?",
"a": "No. In our test with lesions painted into healthy scans, structures that the lesion did not touch changed by less than 1 percent. Structures that it touched came out clearly too small. So check where the lesion lies before you use a volume. The slide after next shows this."
},
{
"q": "The QC passes. How would I find such a scan among a thousand?",
"a": "Not with the score. You need to know which people have a lesion: from the clinical data, from the radiology report or from a lesion mask. Look at those scans yourself. And look at a random sample of the others."
}
],
"qc_test": [
{
"q": "What is the difference between accuracy and repeatability?",
"a": "Accuracy asks: how close is the result to the truth, here the expert labels? Repeatability asks: do I get the same result when I measure twice? A scale that always shows two kilos too much is repeatable, but not accurate."
},
{
"q": "How is accuracy turned into a number?",
"a": "You lay the program's labels over the expert's labels and measure the overlap. The usual number is the Dice score: 1 is perfect overlap, 0 is none. Part two explains it. You can also compare the two volumes."
},
{
"q": "Are the experts not wrong sometimes too?",
"a": "Yes. In the public lesion data of part two, a second expert reached a Dice of only 0.77 to 0.79 against the reference. So expert labels are a reference, not the absolute truth. A program can hardly be shown to be better than that."
},
{
"q": "Which of the three properties matters most?",
"a": "It depends on your question. To compare groups at one time, accuracy and robustness matter most. To follow one person over time, repeatability matters most, because true change is small. In our public data the cortex shrank by about 0.4 percent per year."
},
{
"q": "How do I test repeatability in practice?",
"a": "Scan the same people twice within a short time, when the brain cannot have changed. Run the tool on both scans and compare the volumes. This is called a test-retest study. The difference that remains is measurement noise."
},
{
"q": "How large is this noise for real structures?",
"a": "It depends on the size of the structure. In our own test on public data, between two visits of the same people, the change scattered by about 0.8 percent for the cortex, 2.8 percent for the thalamus and 6.7 percent for the pallidum. Small structures are noisier."
},
{
"q": "Why would another scanner give another result for the same brain?",
"a": "Each scanner and each scan protocol gives a slightly different brightness, contrast and voxel size. A tool that has learned on one kind of image can shift its borders on another kind. So test the tool on scans like yours."
},
{
"q": "Why is the sick brain part of robustness?",
"a": "Most tools have learned from healthy brains. Disease changes the anatomy: lesions appear, the ventricles grow, tissue shrinks. The tool then meets something it has never seen, and it can fail without any warning. The next slide shows an example."
},
{
"q": "Who runs these tests? Do I have to do them myself?",
"a": "The developers publish their tests. But their scans may differ from yours. Good practice is to look at a random sample of your own results, or to label a few scans by hand, before you trust the tool for the whole study."
},
{
"q": "If a tool is accurate on average, can one single result still be wrong?",
"a": "Yes. Accuracy is reported as an average over many scans. A single scan can still fail badly, for example because of head movement. That is why you need the checks per scan, looking and the QC score, on top of the published test."
}
],
"fail_lesion": [
{
"q": "What do the red area and the colours show?",
"a": "Red is the stroke lesion, drawn by an expert. It has a volume of 21.9 millilitres. The colours are the deep structures that the tool labelled: thalamus, caudate, putamen and pallidum. It is a public scan, see the Sources button."
},
{
"q": "Why does the tool get the volume wrong near the lesion?",
"a": "It has learned how healthy brains look. Where the stroke destroyed tissue, the T1 image is dark, where the tool expects normal tissue. It still has to give those voxels one of its normal labels, so the borders nearby shift."
},
{
"q": "Where do minus 14.4 and minus 22.5 percent come from?",
"a": "From our own test. We painted 48 real stroke shapes from public data into healthy public scans, and ran the tool before and after. The healthy scan gives the right volume, so we can measure the error. The numbers are medians, the middle values."
},
{
"q": "Why does the volume become smaller and not larger?",
"a": "The part of the structure that lies inside the lesion no longer looks like putamen or pallidum. The tool gives those voxels another label, so the structure loses them and its volume drops."
},
{
"q": "The tissue is destroyed. Is a smaller volume then not simply correct?",
"a": "Only by luck. The number mixes real tissue loss with tool error, and you cannot tell them apart. If you want to know the damage, measure the lesion itself with a lesion mask. Do not read it from the structure volume."
},
{
"q": "Why are structures far from the lesion fine?",
"a": "Far away, the image looks normal, so the tool works as usual. In our test, a putamen that the lesion did not touch changed by 0.27 percent, and the thalamus on the other side by 0.06 percent."
},
{
"q": "What about a structure close to the lesion but not touched?",
"a": "Mostly fine, but less safe. In our test, the pallidum on the lesion side, when not touched, lost 1.8 percent on median, and in some cases it lost far more. So look at the neighbours of a lesion too."
},
{
"q": "Does the size of the lesion matter?",
"a": "Our 48 test lesions ranged from 1.3 to 298 millilitres, with a median of 67. What mattered for a structure was whether the lesion touched it. A small lesion in the wrong place can spoil one volume completely."
},
{
"q": "Did the makers of SynthSeg test it on stroke?",
"a": "No published test. The training simulates white matter lesions, but the authors give no test on large lesions such as stroke or tumour. They call this future work. That is why we tested it ourselves."
},
{
"q": "Does the QC score warn me about this?",
"a": "Not reliably. On the real stroke scan shown here, all QC scores passed, although the labels around the lesion are not right. The score looks only at the label map. So with lesions, you have to look yourself."
}
],
"fail_fix": [
{
"q": "What does filling a lesion mean?",
"a": "Every lesion voxel gets a new grey value, drawn from the healthy white matter around it. The lesion disappears from the T1 image, which now looks as if normal white matter were there. In FSL the command is called lesion_filling."
},
{
"q": "What is a mask?",
"a": "A mask is an image of the same size as the scan. It has a one in every lesion voxel and a zero everywhere else. An expert paints it by hand, or a program makes it. Part two shows such programs."
},
{
"q": "Why are lesion voxels called grey matter at all?",
"a": "On a T1 image, white matter lesions are darker than healthy white matter. Their brightness is close to that of grey matter. A tissue step that sorts voxels by brightness puts them into the grey class. That makes the grey matter volume too large."
},
{
"q": "What do 71.1 percent and 20.1 percent mean?",
"a": "It is our demo on one public scan with 24 millilitres of white matter lesions. Before filling, 71.1 percent of the lesion voxels were called grey matter. After filling, 20.1 percent. The grey matter volume fell from 585 to 577 millilitres."
},
{
"q": "Why are 20 percent still wrong after filling?",
"a": "We did not analyse this in detail, so this is an honest open point. Filling reduces the error, it does not remove it. This is one reason for step three: look at the result yourself."
},
{
"q": "Is filling not a way of faking the data?",
"a": "The filled image is only a helper for the tissue step. The original scan stays as it is, and the lesion is still measured from its mask. You write in your methods that you filled the lesions and with which tool."
},
{
"q": "Why not just leave the lesion voxels out instead of filling them?",
"a": "That was tested. In the study by Battaglini and colleagues from 2012, the wrong tissue classes were still there when the lesions were masked out. Only refilling with values of the surrounding normal white matter gave accurate tissue measurements."
},
{
"q": "What is the tissue step?",
"a": "It is the step that sorts every voxel into grey matter, white matter or fluid, mainly by its brightness. In our demo it was the FSL tool FAST. You fill before this step, so that it never sees the lesion."
},
{
"q": "Does filling also solve a large stroke, as on the slide before?",
"a": "Not fully. Filling was developed and tested for white matter lesions, with lesions simulated in healthy brains. A large stroke also destroys cortex and deep grey matter. White matter values cannot give that anatomy back. So look at these cases yourself."
},
{
"q": "Are there other remedies besides filling?",
"a": "Yes, for the step that aligns a brain to a standard brain. You can leave the lesion out of the calculation, or replace it with the mirrored healthy side. The second needs an intact other side. The evidence comes mostly from simulated lesions."
}
],
"ex1": [
{
"q": "How do I open the quiz?",
"a": "Scan the QR code on the slide, or open the link, on your phone or your laptop. The quiz runs in the browser. You do not have to install anything."
},
{
"q": "How much time do I have for the atlas quiz?",
"a": "Eight minutes for the whole exercise. Each question has its own countdown of 40 seconds. When it reaches zero, the right answer is shown and the question counts as not answered."
},
{
"q": "Is the quiz graded?",
"a": "No. It is only practice. Your progress is kept in your own browser, so a reload brings you back to the same question. For more practice at home there is the full atlas trainer, linked on the last slide."
},
{
"q": "Which regions are asked?",
"a": "Ten structures, from easy to hard. First large parts of the brain, then the deep grey matter structures from this lecture, and one region of the cortex. All of them are structures that FreeSurfer and SynthSeg label."
},
{
"q": "How do I tell the putamen from the pallidum?",
"a": "They lie side by side, lateral to the thalamus. The putamen is the outer and larger part. The pallidum is the inner and smaller part, between the putamen and the internal capsule."
},
{
"q": "How do I tell the hippocampus from the amygdala?",
"a": "Both lie in the inner part of the temporal lobe. The amygdala is in front, small and shaped like an almond. The hippocampus lies behind it and is long, running backwards along the temporal horn of the ventricle."
},
{
"q": "Can I change the view or scroll through the slices?",
"a": "Yes. You can switch between the view from above, from the front and from the side, and scroll through the slices. A button brings you back to the slice with the marked region."
},
{
"q": "Whose brain is shown in the quiz?",
"a": "Nobody's. It is a standard brain, an average of many healthy people, with a standard atlas laid on it. So the structures look smooth and regular. Real brains, above all old or sick ones, vary more."
},
{
"q": "Why should I learn the names, if a program labels the regions anyway?",
"a": "To check a segmentation, you must know where a structure should be. If you cannot find the putamen yourself, you cannot see that its label is wrong. The rule of this lecture is: never trust a segmentation you have not checked."
},
{
"q": "What is the try page after the quiz?",
"a": "It shows a real public stroke scan with the labels of SynthSeg and its table of QC scores. Scroll through it. All QC values pass, and yet the labels around the lesion are not right. Find the place."
}
],
"wmh_what": [
{
"q": "What does FLAIR stand for, and why do we use it here?",
"a": "FLAIR means fluid attenuated inversion recovery. It is a T2-type image in which the signal of the brain fluid is switched off. So the ventricles are dark. Bright lesions right next to the ventricles then stand out clearly. On a normal T2 image, fluid and lesion would both be bright."
},
{
"q": "What is a white matter hyperintensity in the tissue itself?",
"a": "It is a patch of damaged white matter. The tissue there has lost some myelin and nerve fibres and holds more water. More water gives more signal on FLAIR, so the patch is bright. The standards call them hyperintensities of presumed vascular origin, because the cause is assumed, not proven in each patient."
},
{
"q": "What is small vessel disease?",
"a": "It is a disease of the smallest arteries deep in the brain. Their walls get thick and stiff, and the tissue they supply suffers. On MRI we see the results, not the vessels: white matter hyperintensities, small deep infarcts and microbleeds. High blood pressure and age are the main risk factors."
},
{
"q": "Where do the numbers 'three times' and 'twice' come from?",
"a": "From a systematic review of 46 long-term studies, published in 2010. Its pooled analysis of 22 of them gave a hazard ratio of 3.3 for stroke and 1.9 for dementia in people with many white matter hyperintensities. The risk of death was also doubled, with a hazard ratio of 2.0."
},
{
"q": "Does this mean the bright spots cause stroke and dementia?",
"a": "Not necessarily. The studies observed people over time; they show a link, not a cause. The spots are best seen as a marker: they show that the small vessels of this brain are already damaged. The same vessel damage can later lead to a stroke or to dementia."
},
{
"q": "Are a few such spots not simply normal in old age?",
"a": "They are common with ageing, the standards say so. A few small spots in an older person are an everyday finding. But common does not mean harmless: the more there are, the higher the risk. That is exactly why we want to measure how much there is, not only whether there are any."
},
{
"q": "Does the patient notice anything?",
"a": "Often not; many are found by chance. With a large amount, typical problems are slower thinking, an unsteady walk and low mood. These come on slowly, so patients and families often take them for normal ageing."
},
{
"q": "Can white matter hyperintensities be treated, or do they go away?",
"a": "There is no drug that removes them. They usually stay and tend to grow over the years. What doctors can do is treat the risk factors of the vessels, above all high blood pressure. Measuring the lesion volume over time is one way to see whether the disease moves on."
},
{
"q": "Is every bright spot on FLAIR a white matter hyperintensity?",
"a": "No. Infarcts, inflammatory lesions as in multiple sclerosis, and artefacts can be bright too. Normal cortex is also fairly bright on FLAIR. In the public data we use, other pathology such as infarcts was marked separately and left out of the scoring."
},
{
"q": "What is the difference between periventricular and deep lesions?",
"a": "Periventricular lesions sit along the ventricles; deep lesions lie further out in the white matter, with normal tissue in between. The classic visual grading rates both. Programs need a rule: the BIANCA tools call a lesion periventricular if it lies within 10 mm of the ventricles."
}
],
"wmh_use": [
{
"q": "What is the grade by eye?",
"a": "A doctor looks at the scan and puts it in a class. The usual scale is the Fazekas scale; the study on the slide used three groups: mild, moderate and severe. It takes seconds and needs no software, but it has only a few steps."
},
{
"q": "What exactly happened to the people in that study?",
"a": "All of them lived independently at the start. The study counted how many became disabled or died. Per year this was 10.5 % with mild, 15.1 % with moderate and 29.5 % with severe lesions. That is where \"almost three times\" comes from: 29.5 divided by 10.5."
},
{
"q": "Do the lesions cause the disability?",
"a": "The studies show a link, not a proof of cause. But the link is strong and repeated: pooled over many studies, people with many lesions had about two and a half to three times the risk of stroke and about twice the risk of dementia and of death."
},
{
"q": "How much is half a millilitre?",
"a": "500 voxels of one millimetre, or a cube of about 8 millimetres per side, spread over the whole brain. In the trial the lesions grew from 4.57 to 5.49 cubic centimetres with strict control and from 4.40 to 5.85 with standard control. No grade with a few steps can show that."
},
{
"q": "Did the patients feel the difference?",
"a": "This result is only about the lesion volume. The authors themselves call the difference small: 0.54 cubic centimetres less growth, measured about four years after the start. Whether such a difference protects thinking is a separate question that this number does not answer."
},
{
"q": "Is the grade by eye as good as a measured volume?",
"a": "At one time point, nearly: in 672 people, score and volume ranked them almost the same way. For change over time the volume is better: measuring the change in volume was reliable, rating the change by eye was less reliable. That second study was small, only 20 pairs of scans."
},
{
"q": "Why do severe lesions speak against the Alzheimer antibodies?",
"a": "The drug trial did not include patients with a lot of vessel damage. The expert advice follows the trial: no treatment with severe lesions, the highest grade by eye. Leaving out patients with signs of vessel disease is thought to lower the risk of brain swelling and bleeding under the drug."
},
{
"q": "Does finding these lesions change what the doctor does?",
"a": "Mostly it changes how hard you look for risk factors such as high blood pressure and treat them. It rarely forbids a treatment. Example: before clot-dissolving therapy for stroke, severe white matter disease means a higher bleeding risk, but the authors say this does not justify withholding the therapy."
},
{
"q": "Are these lesions the only sign of small vessel disease?",
"a": "No. The agreed list for MRI has six signs: recent small infarcts deep in the brain, white matter hyperintensities, lacunes, wide spaces around vessels, microbleeds and atrophy. Part 3 of this lecture is about one more of them, the microbleeds."
},
{
"q": "If a program gives the volume, does anyone still have to look?",
"a": "Yes. The consensus paper on small vessel disease says that with automatic methods a trained person should check each result by eye. Known mistakes: lesions counted as normal grey matter, or small infarcts counted as white matter lesions. You will see this in the exercise."
}
],
"wmh_manual": [
{
"q": "How does an expert paint such a mask in practice?",
"a": "Slice by slice, on the FLAIR image, with a drawing tool. The expert outlines every lesion, changes brightness and zoom, and moves on to the next slice. A scan has dozens of slices. You will do the same in a few minutes on three slices."
},
{
"q": "Who counts as an expert here?",
"a": "For the public scans we use: the first observer had segmented more than 1000 cases before. A second expert with eleven years of experience in quantitative neuroimaging and clinical neuroradiology reviewed every mask. Mistakes were corrected in a meeting of the two."
},
{
"q": "How long does painting one scan take?",
"a": "Our checked sources give no number, so I will not quote one. From practice: it depends on the lesion load, and a brain with many scattered spots takes far longer than one with two caps. For a study with hundreds of scans, this is weeks of expert time."
},
{
"q": "Why do two experts not paint the same mask?",
"a": "Lesion borders are not sharp; the brightness fades out. So where to stop is a judgement. Very small spots may be seen by one expert and not by the other. And the thin bright rim along the ventricles is counted by some and not by others."
},
{
"q": "If experts disagree, why do we call the mask the truth?",
"a": "We should not. The correct word is reference standard. Nobody knows the true border in a living patient. The mask is the careful opinion of one expert, checked by a second. Every score you will see today is agreement with this opinion, not with the truth."
},
{
"q": "Are there rules for what to paint?",
"a": "Yes. There are international standards for reporting small vessel disease on MRI, known as STRIVE. They define what counts as a white matter hyperintensity and how to tell it from an infarct or a wide space around a vessel. The reference masks we use were drawn according to these criteria."
},
{
"q": "What does the expert do with other lesions, such as an old infarct?",
"a": "They are painted too, but with a separate label called other pathology: infarcts, lacunes and bleeds. In the scoring this label is ignored. A program is not rewarded and not punished for what it does there."
},
{
"q": "Would the same expert paint the same mask a second time?",
"a": "Not exactly. A person also differs from himself or herself on another day, usually a little less than from a colleague. Our sources give no number for this. In a study you measure it by letting the expert repeat some scans without knowing which."
},
{
"q": "Radiologists grade the lesions by eye every day. Why is that not enough?",
"a": "In the clinic that is often enough. The common visual scale has only four steps, 0 to 3. That is fast, but coarse: a patient can get clearly worse and stay in the same grade. A mask gives a volume in millilitres and the place of every lesion."
},
{
"q": "If a program does it, do we still need the experts?",
"a": "Yes, for two things. The programs we show today learn from masks that experts have painted. And somebody has to check the result of the program. The program takes over the long routine work, not the responsibility."
}
],
"bianca_knn": [
{
"q": "What is BIANCA, and where do I get it?",
"a": "BIANCA stands for Brain Intensity AbNormality Classification Algorithm. It is a program for finding white matter hyperintensities, published in 2016. It is part of FSL, a free software collection for brain imaging. It is fully automatic, but supervised: it needs example scans with hand-painted masks."
},
{
"q": "What does 'k nearest neighbours' mean in simple words?",
"a": "It is learning by comparison. To judge a new case, you look up the k most similar cases you already know and take what most of them are. Here the cases are voxels, k is 40, and the answer is lesion or healthy."
},
{
"q": "What do you mean by 'each voxel is a point'?",
"a": "Each voxel is described by a few numbers: its FLAIR brightness, its T1 brightness and its position in the brain. Take these numbers as coordinates, and the voxel becomes a point in a space. Voxels that look alike and lie in similar places end up close together."
},
{
"q": "Does 'nearest' mean the voxels next to it in the brain?",
"a": "No, and this is the most common mix-up. Nearest means most similar in all the numbers together: brightness and position. The 40 neighbours are stored example voxels from the training scans, so from other patients. They are not the voxels around it in the new scan."
},
{
"q": "Why 40 neighbours, and not 5 or 500?",
"a": "Forty is the default built into the software. The trade-off is general: with very few neighbours, one odd example can flip the vote, so the result is noisy. With very many, the rare class, lesion, is easily outvoted and small lesions are lost."
},
{
"q": "What does BIANCA actually learn during training?",
"a": "Nothing in the sense of a formula. Training means storing labelled example voxels in a table. In our run with 60 training scans this table had 692,526 rows: 92,526 lesion voxels and 600,000 healthy ones. All the work happens later, when a new voxel asks its neighbours."
},
{
"q": "35 of 40 gives 0.88. Is that really the chance that this voxel is a lesion?",
"a": "It is the share of votes, exactly 0.875. Call it a score, not a true chance. It depends on how many lesion and healthy examples were stored, and we choose that ourselves. So 0.5 does not mean fifty-fifty. The next slide shows the consequence."
},
{
"q": "How many training scans with masks do I need?",
"a": "There is no fixed number. The original paper worked with 21 hand-segmented subjects in one data set and 109 in the other. We used 60. More important than the number: the training scans should cover the range of your study, from few lesions to many."
},
{
"q": "Brightness has no fixed unit in MRI. How can BIANCA compare voxels from different scans?",
"a": "Good point. BIANCA rescales every image first: it subtracts the mean brightness of that scan and divides by the spread. After that, a value says how bright a voxel is compared with the rest of its own brain. For position, every scan is aligned to a common standard brain."
},
{
"q": "Are the dots in the plot real data or a drawing?",
"a": "Real. They are 640 training voxels from our own BIANCA run, 160 lesion and 480 healthy, plotted by FLAIR and T1 brightness. The vote is real too: 35 of the 40 nearest points are lesion. The plot cannot show position, which BIANCA also uses."
}
],
"bianca_thr": [
{
"q": "What exactly is a probability map?",
"a": "It is a new image with the same grid as the scan. Each voxel no longer holds a brightness. It holds the result of the vote, a value between 0 and 1. Shown as a picture, the clear lesions glow strongly and doubtful tissue glows weakly."
},
{
"q": "What is a cut-off, and why do we need one?",
"a": "A cut-off is a limit that turns a soft value into a yes or no. Every voxel at or above the limit counts as lesion, all others as healthy. We need it because a volume in millilitres or a lesion count can only be taken from a mask, not from a glow."
},
{
"q": "More than half of the votes sounds like the natural limit. Why not simply 0.5?",
"a": "It sounds natural, but the vote is not a true chance. It depends on how many lesion and healthy examples we stored. In our runs, 0.5 marked far too much: the mean Dice was 0.606. At 0.95 it was 0.738. So the limit has to be found by testing."
},
{
"q": "How was 'best' decided?",
"a": "We split the 60 training scans into two halves of 30. BIANCA learned on one half. On the other half we tried many cut-offs from 0.05 to 0.99 and compared each mask with the expert mask. The cut-off with the highest mean Dice won: 0.95."
},
{
"q": "Then why not go even higher, to 0.99?",
"a": "Because then the mask starts to lose real lesion. In our runs the mean Dice fell again, from 0.738 at 0.95 to 0.706 at 0.99. At 0.99 all 40 neighbours must say lesion. Edges of lesions and faint small lesions do not reach that."
},
{
"q": "Is 0.95 the right cut-off for my data too?",
"a": "Do not assume so. The original BIANCA paper found 0.9 best on its data. In our own further runs the best value lay between 0.60 and 0.99, depending on the setup. The cut-off belongs to the data and the settings. Find it again for your study."
},
{
"q": "How much does the measured lesion volume depend on the cut-off?",
"a": "Very much. In our example scan the expert marked 21.88 ml. BIANCA's mask held 49.29 ml at a cut-off of 0.5 and 26.54 ml at 0.95. So the same patient has twice the lesion volume with the lower limit. Always report the cut-off with the volume."
},
{
"q": "Which tissue gets marked wrongly at a low cut-off?",
"a": "Tissue that is a little bright on FLAIR without being a lesion. Typical places are the cortex, the thin rim along the ventricles, and regions with image artefacts. A few of their 40 neighbours are lesion examples, and with a low limit a few votes are enough."
},
{
"q": "Can I choose a different cut-off for each patient, so that each mask looks right?",
"a": "Better not. Then the result depends on your eye again, and the method is no longer the same for everybody. In a study, fix one cut-off before you look at the results and use it for all scans. If a mask looks wrong, note the case; do not tune it."
},
{
"q": "Is information lost when we make a mask out of the probabilities?",
"a": "Yes. A voxel with 0.94 and a voxel with 0.10 both become zero. That is the price of a clear answer. Keep the probability map on disk. Then you can later test another cut-off without running BIANCA again."
}
],
"try_cutoff": [
{
"q": "What am I supposed to do with the slider?",
"a": "Drag it left and right. The number on top is the cut-off, from 0.05 to 0.99. The yellow mask changes at once, and so does the Dice against the expert. Your task: find the position where Dice is highest on this slice."
},
{
"q": "What do yellow and red show?",
"a": "The grey picture is one FLAIR slice of a public scan. Yellow is the program's mask: every voxel whose probability is at or above the cut-off. The red line is the border of the expert's mask. The button 'expert outline' hides it, so that you see the yellow better."
},
{
"q": "How does the widget get the Dice number?",
"a": "It compares the two masks voxel by voxel on this slice. Yellow inside the expert mask is a hit, yellow outside is extra, expert voxels without yellow are missed. Dice is two times the hits, divided by two times the hits plus extra plus missed. The small line below shows the counts."
},
{
"q": "A low cut-off finds more of the lesion. Why does Dice fall then?",
"a": "Watch the three counts under the Dice. Going down, the misses fall only a little, because most of the lesion was found already. The extra voxels rise fast, as the mask spreads into healthy white matter. Dice counts both errors, so the many extra voxels pull it down."
},
{
"q": "My best Dice is not exactly at 0.95. Did I do something wrong?",
"a": "No. 0.95 was the best average over 30 scans, not the best for this slice. Every slice and every scan has its own best point. Here the top lies a little above 0.95, and the gain is tiny. Near the top the curve is flat."
},
{
"q": "Even at the best position Dice is not 1. Why can no cut-off make it perfect?",
"a": "The cut-off can only cut the probability map; it cannot repair it. Some healthy voxels got a higher probability than some lesion voxels. Any cut-off then either keeps the first or loses the second. And the expert's outline is a reference, not the absolute truth."
},
{
"q": "Why does nothing change when I move the slider only a little?",
"a": "The probability is a vote of 40 neighbours, so it moves in steps of 1 in 40, that is 0.025. A voxel has 0.925 or 0.95, never 0.94. The mask changes only when the slider crosses one of these steps."
},
{
"q": "The Dice number turns green. Is 0.8 the limit for a good result?",
"a": "No. The colours are only a reading aid of this widget: green from 0.8, yellow from 0.6, red below. There is no general limit for a good Dice. What can be reached depends on the task and on the size of the lesions."
},
{
"q": "On my own scans there is no red outline. How do I find the cut-off then?",
"a": "Without an expert mask there is no Dice, so you cannot find it by sliding. Either an expert marks the lesions on some of your scans and you choose the cut-off there, or you take the value from the training data and check the masks by eye."
},
{
"q": "Is the best cut-off on this slice also the best for the whole scan?",
"a": "For this patient it is close: over the whole scan, 0.95 was the best of the values we tried. But the Dice there is only 0.70, not 0.82, because this slice has large, clear lesions. One slice is not enough to choose a cut-off."
}
],
"bianca_settings": [
{
"q": "What do the numbers on the bars mean, for example +0.03?",
"a": "They are changes of the Dice score. Dice measures how well BIANCA's mask matches the expert mask, from 0 to 1; we explain it in a few slides. Plus 0.03 means: with this setting switched on, the mean Dice was 0.03 higher. All four numbers come from our own runs on public scans."
},
{
"q": "The lesions are seen on FLAIR. Why does adding T1 help at all?",
"a": "With FLAIR alone, a voxel is one number. A lesion and another bright tissue can have the same number. T1 gives each voxel a second number, and the two tissues often differ there. So the points separate a little better. The gain was small: 0.03."
},
{
"q": "Why store more healthy examples than lesion examples?",
"a": "Healthy tissue is many things: white matter, cortex, deep nuclei, borders to the fluid. Lesions look much more alike. To cover all healthy kinds you need more examples. With 10,000 instead of 2,000 healthy points per scan, Dice rose by 0.04. The original paper chose the same numbers."
},
{
"q": "How does BIANCA know where a voxel lies in the brain?",
"a": "Every scan is aligned to a standard brain, an average brain with a fixed coordinate system. After that, each voxel has three coordinates that mean the same place in every person. BIANCA stores these three numbers next to the brightness."
},
{
"q": "Why does position help so much more than the other settings?",
"a": "Because brightness alone is ambiguous. The cortex is bright on FLAIR too. Position settles it: lesions cluster around the ventricles, and the map of all training masks shows this. A bright voxel near a ventricle is likely a lesion; the same brightness at the brain surface is not. Gain: 0.14."
},
{
"q": "If BIANCA expects lesions near the ventricles, does it miss lesions in unusual places?",
"a": "That is the risk. A lesion in a place where the training scans had none finds few lesion neighbours and gets a low vote. Position is one feature among several, so a very bright lesion can still win. But check patients with unusual patterns by eye."
},
{
"q": "What if the alignment to the standard brain goes wrong, for example with very wide ventricles?",
"a": "Then the position numbers are wrong, and the strongest feature misleads. BIANCA's alignment only moves, turns, scales and shears the whole brain; it cannot follow each ventricle. In old patients with brain shrinkage, lay the aligned scan over the standard brain and look at the ventricles before you trust the result."
},
{
"q": "What is a patch, and why did it make the result worse?",
"a": "A patch is the 3 by 3 neighbourhood of a voxel within the slice. BIANCA can store its average brightness as an extra number. Averaging calms noise, but it also washes out a lesion that is only a few voxels wide. In our runs Dice fell by 0.03."
},
{
"q": "Can I add the four numbers up to get the total gain?",
"a": "No. Each number is the change from one setting alone, measured against a fixed setup. Settings overlap in what they fix, so together they give less than the sum. The size of an effect also depends on the data: for position we measured between 0.11 and 0.14 at different slice thicknesses."
},
{
"q": "Are these the best settings for every study?",
"a": "They are the best for our runs on one public set of scans. The original paper also preferred FLAIR plus T1 and 10,000 healthy points, which supports them. But patches, for example, might help on noisier scans. Take our numbers as a starting point and test on your own data."
}
],
"bianca_after": [
{
"q": "On which scans should I choose the cut-off?",
"a": "On scans with expert masks that BIANCA did not learn from. And never on the scans you use for the final score. If you pick the cut-off on the test scans, the reported Dice is too good, because the cut-off has been fitted to exactly those scans."
},
{
"q": "What is a white matter mask, and where does it come from?",
"a": "It is a map that says where white matter is. Every lesion mark outside it is deleted. The BIANCA tools build it from two parts: a map in the standard brain that excludes the cortex and other grey areas, and the ventricles from a tissue segmentation of the patient's own scan."
},
{
"q": "How much did the white matter mask help?",
"a": "In one of our setups, on the 110 public test scans, the mean Dice rose from 0.586 to 0.665, so by 0.08. Per scan, the mask removed 3.23 ml of marks. Only 0.46 ml of that was true lesion by the expert mask. Most of what it removes is false."
},
{
"q": "Does the white matter mask ever delete a real lesion?",
"a": "Yes, a little: 0.46 ml per scan in our runs. Lesions close to the cortex or right at the ventricle wall are at risk, because the mask is cut generously there. If such lesions matter for your question, look at these border zones yourself."
},
{
"q": "The brain is the same. Why does a new scanner disturb BIANCA?",
"a": "The brain is, the picture is not. Each scanner and each protocol gives its own contrast between lesion, white matter and cortex. The stored examples describe the pictures of the training scanners. In our best setup, scans from known scanners scored 0.702 and scans from new scanners 0.664."
},
{
"q": "My scanner was not in the training. What can I do?",
"a": "The clean way: paint masks on a number of your own scans and train BIANCA with them. Training is only storing examples, so it is quick. If that is not possible, at least paint a few scans and measure how well the old training works on your data before you use it."
},
{
"q": "Why does a thick slice make small lesions disappear?",
"a": "A voxel shows the average of all tissue inside it. This is called partial volume. A small lesion fills a thin voxel well, but only part of a thick one. The rest is healthy tissue, so the voxel is only a little brighter than normal and gets too few lesion votes."
},
{
"q": "How do you know that 5 mm slices cost 0.11? Did you scan people twice?",
"a": "No, it is a simulation. We took scans with 3 mm slices and averaged them to 5 mm slices by computer. Then we ran BIANCA on both. The loss was between 0.09 and 0.11 in three models, and all 15 of 15 test scans got worse. Real thick scans may behave a little differently."
},
{
"q": "If my study has thick slices, does it help to train BIANCA on thick slices too?",
"a": "Less than you would hope. In our simulation, a model trained on 5 mm slices scored 0.589 on 5 mm scans; the model trained on 3 mm slices scored 0.595. The small lesions are missing in the picture itself. Training cannot bring back what the scan did not record."
},
{
"q": "Should I also delete very small marks as noise?",
"a": "We tried it: marks of fewer than 3 connected voxels were removed. The mean Dice did not change; it stayed at 0.665 in that setup. So it does no harm to the score, but it brings nothing either. And be careful with a higher limit: real small lesions are only a few voxels large."
}
],
"bianca_small": [
{
"q": "What is 'one lesion' here, and when does it count as found?",
"a": "One lesion is a group of connected voxels in the expert mask. Voxels belong together if they touch by a face, an edge or a corner. A lesion counts as found if at least one voxel of BIANCA's mask touches it. That is a generous rule."
},
{
"q": "How big is a lesion of ten voxels?",
"a": "Tiny. In these scans a voxel is about 1 by 1 mm within the slice and 3 mm thick. Ten voxels on one slice cover about 10 square millimetres, a spot a few millimetres across, or even less on two slices. On the screen it is a faint dot that you can easily overlook yourself."
},
{
"q": "Why does BIANCA miss the small ones in particular?",
"a": "Three reasons come together. A small lesion fills its voxels only partly, so it is less bright. It has few voxels, so there are few chances to pass the vote. And we chose a high cut-off to keep false marks away, which faint voxels do not reach."
},
{
"q": "And the sizes in between?",
"a": "The rate climbs step by step with size. Under 10 voxels: 24 percent found. From 10 to 30 voxels: 41 percent. From 30 to 100: 70 percent. From 100 to 1000: 93 percent. Over 1000 voxels: 99 percent, that is 187 of 188 lesions."
},
{
"q": "Are small lesions rare, so that this does not matter much?",
"a": "No, by number they are the largest group. Of 8,980 lesions in the 110 test scans, 3,470 were smaller than 10 voxels, and only 188 were larger than 1000. By volume it is the other way round: the few big lesions hold most of the lesion tissue."
},
{
"q": "If BIANCA misses three of four small lesions, is the total lesion volume still right?",
"a": "Largely, yes. The small ones add little volume. Across the 110 test scans, BIANCA's volume and the expert's volume agreed very well, with a correlation of 0.955. So for the question how much lesion a patient has, BIANCA is useful. For where exactly, it is weak."
},
{
"q": "'Found' means that the lesion is also outlined correctly?",
"a": "No. Found only means touched. A single overlapping voxel is enough, even if the rest of the lesion is missing or BIANCA's mark is much too large. So 99 percent found for big lesions does not mean 99 percent overlap. For the outline we need Dice."
},
{
"q": "Could a lower cut-off find more of the small lesions?",
"a": "Yes, but you pay for it. A lower cut-off also lets through more false marks in healthy tissue. Even with a high cut-off and the white matter mask, about 14 false clusters per scan were left in one of our setups. More hits and fewer false alarms pull in opposite directions."
},
{
"q": "I want to know whether a patient has new lesions after one year. Can I use BIANCA?",
"a": "For a change in total volume, with care. For counting new small spots, no. New lesions start small, and that is where BIANCA finds only one in four. A missed spot at one visit and a found one at the next would look like a new lesion. Compare such scans by eye."
},
{
"q": "Are the small lesions hard only for BIANCA, or for people too?",
"a": "For people too. In the public benchmark, two further human observers were compared with the reference lesion by lesion. They found 65 and 66 percent of the reference lesions. So an expert also misses, or does not count, about a third of the lesions of a colleague."
}
],
"unet": [
{
"q": "What is a neural network, in a few sentences?",
"a": "A program made of many simple steps in a row, called layers. Each layer takes numbers in, weights them and passes them on. The weights are not set by a person. They are adjusted during training, again and again, until the output matches the expert masks of the training scans."
},
{
"q": "Why is it called U-Net?",
"a": "Because of its shape when you draw it. One path goes down and makes the image smaller, a second path goes up and makes it large again. The two paths are about symmetric, so the drawing looks like the letter U. The name comes from the paper of 2015."
},
{
"q": "What does 'context' mean, and why must the image shrink for it?",
"a": "Context is what lies around a spot: is it deep white matter, or the edge of the brain? The network looks through small windows. On a shrunken image, the same small window covers a large part of the brain. So shrinking is how the network gets to see the surroundings."
},
{
"q": "What exactly is a skip connection?",
"a": "A shortcut from the way down to the way up. Shrinking loses the exact borders. So at each level the network copies its detailed picture from the down path directly across to the up path. There, coarse knowledge of what it is meets fine knowledge of where it is."
},
{
"q": "What does 'it learns its own features' mean?",
"a": "For BIANCA, we decided which numbers describe a voxel: brightness and position. A U-Net gets only the images and the masks. During training it finds out by itself which patterns are useful, for example edges, bright blobs or the shape of the ventricles. Nobody programs these patterns."
},
{
"q": "Was the U-Net invented for brain scans?",
"a": "No. It was built for microscope images: it won a competition on outlining nerve cell structures in electron microscopy. The idea turned out to work on almost any medical image, and brain MRI is one of many uses."
},
{
"q": "Does a neural network not need thousands of training scans?",
"a": "Fewer than many think. The original U-Net was trained on only 30 annotated images. The best lesion program in the public benchmark learned from 60 scans. The trick is to vary the training images artificially, so that the network sees many versions of each."
},
{
"q": "Does the network look at single slices or at the whole 3D scan?",
"a": "Both kinds exist. The best lesion program in the public benchmark worked on single slices. It received the FLAIR slice and the T1 slice together, as two channels of one picture. For microbleeds in part three, we use a 3D version that also sees the slices above and below."
},
{
"q": "The best program was an 'ensemble of three'. What is that?",
"a": "Three networks of the same design, each trained from a different random start. Each one makes slightly different mistakes. For a new scan all three give their answer, and the answers are combined. This makes the result steadier than that of a single network."
},
{
"q": "Do I have to design such a network myself?",
"a": "No. There is a framework called nnU-Net, which stands for no new net. It is not a new network; it sets up preprocessing, network and training automatically for your data. Without tuning by hand, it beat most specialised methods on 23 public data sets."
}
],
"bianca_vs_unet": [
{
"q": "What is a graphics card, and why does training need one?",
"a": "A graphics card, or GPU, is a part of the computer built to do very many small calculations at once. Training a network means adjusting a huge number of weights, again and again, over all training scans. On a normal processor this takes far too long; a graphics card makes it practical."
},
{
"q": "Do I also need a graphics card to use a network that is already trained?",
"a": "It helps, but it is often not required. Applying a trained network is far less work than training it: each scan passes through only once. Many tools run on a normal processor, just more slowly. Check what the tool you want to use asks for."
},
{
"q": "How much more accurate is the U-Net in numbers?",
"a": "On the same 110 public test scans, our best BIANCA setup reached a mean Dice of 0.70. The best network reached 0.80. The network also found more single lesions: 84 percent of them. Remember where BIANCA stood with the small ones."
},
{
"q": "When is BIANCA 'good enough'?",
"a": "When your question is how much lesion a patient has. BIANCA's total volume agreed very well with the expert's, with a correlation of 0.955. For comparing lesion load between groups, or relating it to age or blood pressure, that is usually enough."
},
{
"q": "When should I not rely on BIANCA?",
"a": "When small lesions matter: counting lesions, finding new ones, or mapping exactly where they are. Also when your scans come from many different scanners or have thick slices. In these cases its weak points decide the result."
},
{
"q": "Why is it harder to see why a U-Net decides as it does?",
"a": "With BIANCA you can list the 40 neighbours of any voxel and see how they voted. A U-Net's decision is spread over a very large number of learned weights in many layers. No single one has a meaning you could read. There are methods to look inside, but none gives a simple reason."
},
{
"q": "Does a U-Net also get worse on a scanner it has not seen?",
"a": "Yes, the problem is not special to BIANCA. The best network in the public benchmark was tested on five scanners. Its Dice ranged from 0.83 on the best scanner to 0.72 on the worst. Any method that learns from examples depends on how well the examples fit your data."
},
{
"q": "Is the comparison 0.70 against 0.80 fair?",
"a": "Fairly, not perfectly. Both learned from the same 60 training scans and were scored on the same 110 test scans. But the network was tuned by its authors to win a competition. BIANCA was run by us, with settings we chose ourselves on the training scans."
},
{
"q": "Which of the two should I take for my master thesis?",
"a": "Start from your question and your means, not from fashion. Do you need total volume or single lesions? Do you have painted scans from your own scanner, a graphics card, and someone who can help? Whatever you take: test it against expert masks on your own data first."
},
{
"q": "Are there other methods than these two?",
"a": "Yes, many. In the public benchmark 20 teams took part. The top 11 all used some form of deep learning, most often a U-Net-like design. Among the methods without deep learning, a classifier called random forest was the most common. BIANCA stands here for the classic, simple family."
}
],
"dice": [
{
"q": "What do true positive, false positive and false negative mean for a voxel?",
"a": "Compare the program with the expert, voxel by voxel. True positive: both say lesion. False positive: only the program says lesion, an extra mark. False negative: only the expert says lesion, a miss. Positive is what the program says; true or false is whether the expert agrees."
},
{
"q": "Can you do the calculation for this slice step by step?",
"a": "On this slice there are 590 hits, 135 extra voxels and 116 missed voxels. Two times 590 is 1180. Below the line: 1180 plus 135 plus 116 is 1431. And 1180 divided by 1431 is 0.82."
},
{
"q": "Why two times the hits?",
"a": "Below the line stand the sizes of both masks added together. The hits are part of both masks, so they are counted twice there. To be fair, they are counted twice above the line too. Then two identical masks give exactly 1."
},
{
"q": "Where are the true negatives, the healthy voxels that were correctly left out?",
"a": "They are not used, on purpose. Almost the whole brain is healthy tissue. A program that marks nothing at all would be right for nearly every voxel and would look excellent. Dice looks only at the voxels that at least one of the two called lesion."
},
{
"q": "Is a Dice of 0.82 the same as '82 percent of the lesion was found'?",
"a": "No. The share found is hits divided by all expert voxels: 590 of 706 on this slice, about 84 percent. The share of the program's mask that is right is 590 of 725, about 81 percent. Dice lies between these two and is pulled towards the lower one."
},
{
"q": "Why 0.82 on this slice, but only 0.70 on average?",
"a": "This slice was picked because it shows large, clear lesions. Over the whole scan of this same patient, Dice is about 0.70. And about 0.70 is also the mean over all 110 test scans. One good-looking slice is not the result; always ask for the average over whole scans."
},
{
"q": "What is a good Dice? Is there a limit like 0.7?",
"a": "There is no general limit. What can be reached depends on the task: for large, compact structures much more than for small scattered lesions. A fair yardstick is how well a second expert agrees with the reference. For these lesions we will see that in a moment."
},
{
"q": "Does Dice tell me whether the program marks too much or too little?",
"a": "No. Extra voxels and missed voxels count the same. A mask that is too large and one that is too small can have the same Dice. To see the direction, compare the two volumes, or look at the share found and the share correct separately."
},
{
"q": "Which other measures are used besides Dice?",
"a": "The public benchmark for these lesions used five. Dice for overlap. A distance measure for how far the borders lie apart. The difference in volume. And two measures that count lesions as objects: the share of lesions found, and an F1 score for lesions. We meet F1 in part three."
},
{
"q": "Why is it called Dice? Has it to do with dice?",
"a": "No. It is the name of a person, Lee Dice, a biologist. In 1945 he published the measure in the journal Ecology, to describe how often two species occur at the same places. Image analysis borrowed it much later for two masks instead of two species."
}
],
"raters": [
{
"q": "Who is this second expert, and what was compared with what?",
"a": "In the public benchmark, two further human observers painted the same 60 training scans, without the program. Each of their masks was compared with the reference mask. One reached a mean Dice of 0.77, the other 0.79. So the number is expert against reference, not program against expert."
},
{
"q": "The small grid on the slide gives 0.77. How is that computed?",
"a": "It is a drawn example with the same result as the real observers. Expert A marked 48 voxels, expert B 43, and 35 voxels are in both masks. Dice is two times 35, so 70, divided by 48 plus 43, so 91. That gives 0.77."
},
{
"q": "Why is about 0.8 a ceiling? Why can a program not reach 1.0?",
"a": "Because the reference is itself one expert opinion. A program that marked every lesion truly correctly would still differ from this reference, as much as a second careful expert does. So a score near the expert level is the best we can expect to measure."
},
{
"q": "The program has 0.80, the experts 0.77 and 0.79. Is the program better than the experts?",
"a": "That would be too much. The numbers come from different scans: the experts painted the 60 training scans, the program was scored on the 110 test scans. The authors of the benchmark say it carefully: the top methods are similar or superior to these two single observers."
},
{
"q": "Where do the experts disagree most?",
"a": "At two places. At the edges of the lesions, because the brightness fades out and each expert stops at a slightly different line. And at small lesions, which one expert marks and the other leaves out. On the large core of a big lesion, experts agree well."
},
{
"q": "Suppose a program one day reaches 0.95. What would that mean?",
"a": "Be suspicious. It would mean that the program copies the habits of the one expert who made the reference: where exactly that person stops at an edge. It has learned from that person's masks. It does not mean it is closer to the real lesion border."
},
{
"q": "Then what is the truth? Is there any way to know the real lesion?",
"a": "Not in a living patient. The real extent of damaged tissue could only be seen under the microscope. On MRI we see a brightness that fades smoothly into normal tissue. Where the lesion ends is partly a convention. That is why shared rules for painting matter so much."
},
{
"q": "How can one make a reference better than a single expert opinion?",
"a": "By using more than one head and fixed rules. In the public data, one very experienced expert painted, a second expert reviewed every mask, and errors were corrected in a meeting of both. Both followed the same published criteria. That does not remove disagreement, but it removes plain mistakes."
},
{
"q": "Do some experts always paint more than others?",
"a": "Yes, that is common. Some people draw generously around a lesion, others tightly. Such a steady habit is worse than random differences: if one person paints the patients and another the controls, the habit looks like a group difference. So mix the scans among raters, or let one person do all."
},
{
"q": "In my own study, how do I show how reliable my masks are?",
"a": "Let a second person paint a part of the scans without seeing the first masks. Report the Dice between the two and how well their volumes agree. Also let the first person repeat some scans after a few weeks. Then readers can judge your reference."
}
],
"dice_small": [
{
"q": "Can you show the arithmetic for the two squares?",
"a": "The big square has 100 voxels. Shifted by one, 90 still overlap; 10 are extra and 10 are missed. Dice is 180 divided by 200, so 0.90. The small square has 4 voxels. After the shift 2 overlap, 2 are extra, 2 are missed: 4 divided by 8 is 0.50."
},
{
"q": "Why does the same shift hurt the small lesion so much more?",
"a": "A shift only changes voxels at the edge. In a big lesion, most voxels lie inside, far from any edge, and stay hits. A tiny lesion has no inside; every voxel is an edge voxel. So the same error hits a much larger share of it."
},
{
"q": "Is a shift of one voxel a realistic error?",
"a": "Very. One voxel is about one millimetre within the slice. Two experts differ by that much at almost every lesion edge. A slight head movement or the alignment of two images can also shift a mask by a voxel. So this is everyday error, not a rare accident."
},
{
"q": "So is Dice a bad measure, and should we stop using it?",
"a": "No. The international recommendations on validation do not say never use Dice. They say: know this weakness, and for small structures add other measures. Dice is fine for large lesions. It is misleading only when you read it without looking at the lesion size."
},
{
"q": "What should I use for small lesions instead?",
"a": "Count objects instead of voxels: how many lesions were found, how many were missed, how many marks were false. This is called a detection task. The recommendations also advise adding a measure of the distance between the two borders. You will count objects yourself in part three."
},
{
"q": "What is the Dice of a patient who has no lesions at all?",
"a": "If the expert and the program both mark nothing, the formula gives zero divided by zero: Dice is not defined. If the program marks even a single voxel, Dice is 0, the worst value, for one wrong voxel. Scans without lesions must be reported separately."
},
{
"q": "Paper A reports a Dice of 0.8, paper B 0.6. Is method A better?",
"a": "Not from these numbers alone. Ask how much lesion the patients had. In the original BIANCA paper, the same method reached 0.80 in patients with more than 15 ml of lesion and 0.69 in patients with less than 5 ml. Dice can only be compared at similar lesion load."
},
{
"q": "In a mean Dice over many patients, which patients pull the number down?",
"a": "Those with few and small lesions. Every patient counts once in the mean, however much lesion he or she has. A group with many mildly affected people will show a low mean Dice with any method. Good papers therefore report Dice by lesion load as well."
},
{
"q": "If a patient has one big lesion and the program misses a small second one, does Dice show it?",
"a": "Hardly. Dice counts voxels, and nearly all voxels belong to the big lesion. The missed small one changes the score in the third digit. The pitfall papers name exactly this: overlap measures do not check that every object was found."
},
{
"q": "Does the voxel size of the scan play a role in this?",
"a": "Yes. Small is always meant relative to the voxel. The same lesion covers many voxels in a fine scan and only a few in a coarse scan with thick slices. So on coarse scans more lesions fall into the range where one voxel decides the score."
}
],
"try_dice": [
{
"q": "What am I supposed to do here?",
"a": "Press an arrow once. The program's mask, the dashed blue frames, moves by one voxel. The expert's mask, the solid frames, stays. Compare the two Dice numbers on the right, then press again. The demo button does three steps to the right for you and then goes back."
},
{
"q": "What do the colours in the grid mean?",
"a": "Orange voxels are hits: expert and program both marked them. Yellow voxels are extra: only the program marked them. Red voxels are missed: only the expert marked them. The bar in each card shows the same three parts as shares."
},
{
"q": "Why is the small lesion at zero after two steps?",
"a": "It is only two voxels wide. Moved by two voxels, the program's mask lies beside it and no voxel overlaps: 0 hits, so Dice is 0. The big lesion is ten voxels wide. After the same two steps, 80 of its 100 voxels still overlap: Dice 0.80."
},
{
"q": "Why are 'extra' and 'missed' always the same number?",
"a": "Because here the program's mask is an exact copy of the expert's mask, only moved. Both have the same size. For every voxel that slides out on one side and is missed, one new voxel on the other side is extra. In real data the two numbers differ."
},
{
"q": "The program's mask lies right next to the small lesion. Why does it score zero, as if it had found nothing?",
"a": "Dice knows only overlap, not distance. A mask one voxel beside the lesion and no mask at all get the same score, zero. That is one reason why small things are better counted as objects: a mark that is near enough counts as found. Part three does this."
},
{
"q": "What happens if I move the mask diagonally, one step right and one step down?",
"a": "Both lesions lose on two sides. The big one keeps 9 by 9, so 81 of 100 voxels: Dice 0.81. The small one keeps 1 of 4 voxels: Dice 0.25. The widget calls this 'shifted by 2 voxels', because it adds the steps sideways and the steps down."
},
{
"q": "The widget shows two numbers. What is the Dice of the whole picture after one step?",
"a": "Not the average of 0.90 and 0.50. Dice counts all voxels together: 92 hits, 12 extra, 12 missed. Two times 92 is 184, divided by 208, gives 0.88. The big lesion decides the number. The trouble with the small one is almost hidden."
},
{
"q": "How far must I move the big lesion until it is as bad as the small one after one step?",
"a": "Five voxels. Then 50 of its 100 voxels overlap and Dice is 0.50. The small lesion is there after one voxel. In both cases the mask has moved by half the width of the lesion. What counts is the shift compared with the size."
},
{
"q": "Are lesions of only four voxels realistic?",
"a": "Yes. In the public test scans a voxel is about 1 by 1 millimetre within the slice and 3 millimetres thick. Four voxels are a spot of about 2 millimetres on one slice. Of 8,980 expert lesions in the 110 test scans, 3,470 were smaller than 10 voxels."
},
{
"q": "Does the direction of the shift matter?",
"a": "Not here. Both lesions are squares, so left, right, up and down cost the same. Real lesions are not squares. A long, thin lesion loses little when the mask slides along it, and a lot when it slides across it."
}
],
"ex2": [
{
"q": "What exactly do I have to do?",
"a": "Open the lesion exercise. First comes a short tutorial with an example. Then you get three FLAIR slices of one patient. Paint every white matter hyperintensity you see with the brush. Go through all three slices, using the small pictures under the image. Then press Score this case."
},
{
"q": "What should I mark, and what not?",
"a": "Mark the bright spots in the white matter: around the ventricles and in the deep white matter. Do not mark the cortex, which is also fairly bright. Do not mark the bright tissue inside the ventricles. Tricky are the thin bright rim along the ventricles and the caps at their tips."
},
{
"q": "How much time do I have, and what happens when it is over?",
"a": "Six minutes for the three slices. A clock on the page counts down. When it reaches zero nothing is blocked: you can go on painting and still get your score. The page only notes that you needed more time."
},
{
"q": "I painted over the edge. How do I correct it?",
"a": "Switch to the eraser and rub the extra part away. The Undo button takes back your last stroke. Clear slice empties the whole slice if you want to start it again. You can also make the brush smaller for fine work."
},
{
"q": "Do the very small spots count too?",
"a": "Yes, small spots count. Zoom in with the mouse wheel to see and hit them. But remember the last slide: with small spots a few voxels change the Dice a lot. So do not be upset if they cost you points. They cost everybody points."
},
{
"q": "How is my Dice calculated?",
"a": "Exactly as on the Dice slide. Your mask is laid over the expert mask, and the page counts the voxels in both, only in yours and only in the expert's. The result is one Dice over the three slices together, not over the whole brain. The page shows you the calculation."
},
{
"q": "Can I look at the expert mask first?",
"a": "No. The expert mask stays hidden until you press the score button. Scoring locks your painting. Afterwards you see in colour where you agree, what you missed and what you marked extra. If you want another go, there is a Try again button."
},
{
"q": "The patient has something that is not a white matter hyperintensity, for example an old infarct. Do I paint it?",
"a": "No, mark only white matter hyperintensities. If you paint over other pathology by mistake, it does not hurt you: these voxels are not scored, neither as right nor as wrong. The public benchmark that the data come from handled it the same way."
},
{
"q": "Is this a real patient, and who made the expert mask?",
"a": "Yes, it is a real scan from a public collection. Its licence allows non-commercial use, such as teaching, with credit. The reference is the hand-painted expert mask that comes with these data. See the Sources button for the paper and the licence."
},
{
"q": "Is my painting uploaded, and can I practise again at home?",
"a": "Nothing is uploaded. Your masks and scores are stored only in your own browser. The exercise stays online. At home you can switch to the homework mode, which gives you eight slices instead of three."
}
],
"beat2": [
{
"q": "My Dice is higher than BIANCA's 0.70. Am I better than the program?",
"a": "Enjoy it, but it is not a fair race. You painted three chosen slices of one patient, after a tutorial. BIANCA's 0.70 is the mean over 110 whole scans from five scanners, with easy and hard patients mixed. On your patient alone, BIANCA may score quite differently."
},
{
"q": "I marked every lesion I saw. Why is my Dice still low?",
"a": "Finding the lesions is only half of it. Dice also counts the outline. If you paint a little wider or tighter than the expert around each spot, many edge voxels count as extra or missed. Look at the colours after scoring: are your errors mostly extra, or mostly missed?"
},
{
"q": "I got more than 0.8. Am I better than the second expert?",
"a": "On these three slices you agreed with the reference very well; that is a real result. But the experts painted 60 whole scans, with every kind of patient. Your patient was picked for teaching. Try the eight slices at home and see whether you hold the score."
},
{
"q": "Can the three numbers on the slide be compared with each other?",
"a": "BIANCA and the best program, yes: both were scored on the same 110 test scans. The second expert, only roughly: that number comes from the 60 training scans. So read the slide as an order of size, not as a ranking to two decimal places."
},
{
"q": "Small spots are hard for everyone. Even for the best program?",
"a": "Yes. The best program found 84 percent of the single lesions, so about one in six was missed. And its score for lesions as objects, which also punishes false marks, was 0.76. That is the top result, and it is still far from perfect."
},
{
"q": "If I painted the same slices again tomorrow, would I get the same Dice?",
"a": "Probably not exactly. You would stop at slightly different edges and perhaps see one small spot more or less. That is the same effect as between two experts, only within one person. Try it at home; the difference between your two attempts is your own repeatability."
},
{
"q": "I painted more than the expert, and I think I am right. Who decides?",
"a": "In this exercise, the expert mask, by definition. That does not prove your spot is not a lesion. But the expert followed fixed rules, for example not to count the thin rim along the ventricles. Check whether your extra marks are such rule cases."
},
{
"q": "How well does BIANCA do on exactly the slices I painted?",
"a": "The exercise tells you. After scoring, the summary shows BIANCA's Dice on the same slices next to yours, and its Dice on the whole scan of this patient. That is the fair comparison for you, not the 0.70 on the slide."
},
{
"q": "If programs are as good as an expert, will lesion volumes soon be measured without doctors?",
"a": "The measuring, yes, more and more, above all in large studies. But as good as an expert on average does not mean right in every patient. You have seen where programs fail: new scanners, thick slices, small lesions. So the rule of today stays: never trust a segmentation you have not checked."
},
{
"q": "Is 0.80 still the best that programs can do today?",
"a": "The 0.80 comes from a public competition whose results were published in 2019. Newer programs may be better; we did not check newer results for this lecture. But keep the ceiling in mind: beyond the agreement between experts, a higher Dice says little."
}
],
"cmb_what": [
{
"q": "What exactly is a cerebral microbleed?",
"a": "A microbleed is a tiny old bleed in the brain tissue. A little blood once leaked out of a small vessel, and iron from this blood stayed behind. The MRI shows this iron deposit, not fresh blood. That is why we say old bleed: the dot remains long after the bleeding itself."
},
{
"q": "What does T2* mean?",
"a": "T2* is spoken 'T two star'. It is a type of MRI image that reacts strongly to anything that disturbs the magnetic field. Iron does this. So where iron lies, the signal is lost and the spot is black. The usual technique for it is called gradient echo."
},
{
"q": "Why is the microbleed dark and not bright, if it is blood?",
"a": "Because we do not see the blood itself. We see what its iron does: it disturbs the magnetic field around it, and the MRI signal there fades away before it is measured. No signal means black. Radiologists call this a signal void."
},
{
"q": "How big is a microbleed?",
"a": "Usually 2 to 5 millimetres, sometimes up to 10. The consensus standards deliberately give no strict size limit, because the size you see depends on the field strength of the scanner and on the type of image."
},
{
"q": "What is SWI, and is it better than T2*?",
"a": "SWI means susceptibility weighted imaging: a more sensitive relative of T2* imaging. The imaging standards for small vessel disease say that SWI detects more microbleeds than T2* gradient echo, but is more disturbed by image errors, for example from movement. We could read this standard only as the authors' accepted manuscript."
},
{
"q": "What else can look like a microbleed?",
"a": "Several things give small dark dots: a vessel cut across, calcium, iron deposits from other causes, and signal loss next to bone. Rarer are small vessel malformations, bleeding metastases and injuries after head trauma. The lists in the papers are not identical, so name your source when you list them."
},
{
"q": "Can I see microbleeds on T1, FLAIR or CT?",
"a": "Generally not. The consensus definition says that microbleeds are generally not seen on CT, or on FLAIR, T1-weighted or T2-weighted images. You need T2* or another image type that is sensitive to iron, such as SWI. Without such an image nobody can count them."
},
{
"q": "What is 'blooming'?",
"a": "Blooming means that the dark spot on the image is larger than the iron deposit really is. The disturbance of the magnetic field reaches beyond the deposit. How much it blooms depends on the scanner and the image type. That is why the standards give no absolute size rule."
},
{
"q": "I see more than three dark dots on this slice. What are the others?",
"a": "Lookalikes, mostly vessels. A vessel that crosses the slice is a dark dot, and one that runs inside the slice is a dark line. Only the three ringed dots are in the marks of the expert, which come with the public data. How to tell them apart comes a few slides later."
},
{
"q": "By which criteria do experts accept a dark dot as a microbleed?",
"a": "Greenberg and colleagues listed them in 2009: black on T2*, round or oval and not a line, blooming, not bright on T1 or T2 images, at least half surrounded by brain tissue, and not one of the lookalikes. A head injury as the cause must also be ruled out."
}
],
"cmb_use": [
{
"q": "How sure is a microbleed count?",
"a": "It depends on the scan and on the reader. In a small comparison, a thick-slice scan showed only a third of the microbleeds seen on a thin-slice SWI scan. Two readers also agreed better on SWI. So a count without the name of the sequence is not a complete finding."
},
{
"q": "Which count decides about the new Alzheimer antibodies?",
"a": "More than 4 microbleeds on the scan before treatment: no antibody. That is the expert advice for both drugs, taken from the trials. In the European Union it is a formal contraindication. In the United States it is not, but the label names two or more microbleeds as a risk."
},
{
"q": "And when new microbleeds appear during treatment?",
"a": "They are counted again and graded: up to 4 new ones is mild, 5 to 9 is moderate, 10 or more is severe. With a moderate grade the drug is paused; with a severe grade the European label says stop for good. This is the one place where a count is a hard rule."
},
{
"q": "How do microbleeds help to diagnose amyloid in the vessel walls?",
"a": "The Boston criteria count bleeding lesions that lie only in the lobes, near the surface, in people aged 50 or older. Two such lesions, or one plus a typical white matter sign, make the diagnosis probable. Microbleeds are one of these lesions. Against autopsy, the criteria found about three of four cases."
},
{
"q": "Is the place really a reliable sign of the cause?",
"a": "It is a hint, not a proof. In the population study, microbleeds only in the lobes went with signs of amyloid, deep ones with high blood pressure and vessel hardening. Many patients have both kinds. The place shifts the probability; it does not replace the rest of the work-up."
},
{
"q": "Should a patient with microbleeds stop the blood thinner?",
"a": "Not for that reason alone. In more than 20,000 patients after a stroke, even those with ten or more microbleeds had more new strokes from a blocked vessel than brain bleeds: 64 against 27 per 1,000 patient-years. The authors say the evidence does not support withholding the drug; trials are still needed."
},
{
"q": "Does the bleeding risk grow with the number?",
"a": "Yes, steeply. Compared with no microbleeds, the risk of a brain bleed was about two and a half times higher with any microbleed, four and a half times with five or more, and more than eight times with twenty or more. The risk of a stroke from a blocked vessel rose much less."
},
{
"q": "Can a program do the counting in the clinic today?",
"a": "Not yet. The current consensus says microbleeds are assessed by visual rating and that computer methods are in development and still need validation. That is why we look at how such a program works and how it is tested: detection first, then a person checks."
},
{
"q": "Do microbleeds harm thinking?",
"a": "They go together with it. In a large population study, people with microbleeds had about twice the risk of dementia, and more than four microbleeds went with a decline in thinking. That is a link in a population, not proof that the microbleeds are the cause."
},
{
"q": "What about clot-dissolving therapy for an acute stroke?",
"a": "Pooled data from 2,479 patients showed more bleeding after the therapy in patients with more than 10 microbleeds than in those with fewer. But very few patients had that many, so the estimate is very uncertain. We could not verify a guideline rule on this, so we do not state one."
}
],
"cmb_unet": [
{
"q": "What is a 3D U-Net?",
"a": "A U-Net is a neural network for marking things in images. It first shrinks the image step by step to see the context, then enlarges it again and brings back the fine detail. '3D' means that it looks at a block of neighbouring slices together, not at one slice alone."
},
{
"q": "Why is the number of marked voxels not enough?",
"a": "Because one microbleed covers several voxels, and a large one covers more than a small one. In the zoom on this slide, the 17 marked voxels touch each other and form one microbleed. But 17 voxels could also be three small ones. Only grouping the voxels gives the count."
},
{
"q": "What does it mean that the network 'marks' a voxel?",
"a": "A voxel is one small cube of the scan. For every voxel the network gives a value between 0 and 1: how much this cube looks like part of a microbleed. Values above a cut-off are marked; the public benchmark used 0.5. The result is a mask of marked voxels."
},
{
"q": "Why must the network look in 3D? Why not slice by slice?",
"a": "On a single slice, a microbleed and a vessel cut across are both a dark dot. Only the slices above and below show the difference: a microbleed is a small ball, a vessel is a long tube. A network that sees several slices at once can use this."
},
{
"q": "How does the network learn what a microbleed looks like?",
"a": "From examples. During training it sees scans in which experts have marked the microbleeds. It compares its own marks with the expert marks and changes its internal settings a little, again and again, until the two agree well. Nobody writes the rules by hand; it learns its own image features."
},
{
"q": "How many marked scans does such a network need for training?",
"a": "There is no fixed number. The original U-Net paper showed that training can work with only 30 marked images. The public microbleed benchmark gave the teams 72 training scans with 253 marked microbleeds. More examples, and more varied ones, usually help."
},
{
"q": "Why is this task hard for a network?",
"a": "The imaging standards for small vessel disease give three reasons. Microbleeds are small. They are sparse: a few dots among millions of voxels. And they have many lookalikes, such as blood vessels and mineral deposits. We could read this standard only as the authors' accepted manuscript."
},
{
"q": "Does the network look only at the T2* image?",
"a": "Not necessarily. In the public benchmark the programs received three image types for each person: T2*, T2 and T1, all brought into the same position as the T2* image. The microbleeds themselves are seen on T2*; the other images add information about the tissue around them."
},
{
"q": "What is the difference between segmentation and detection?",
"a": "Segmentation asks: which voxels belong to the thing? Detection asks: how many things are there, and where? For structures that are small compared with the voxel size, the international recommendations on validation advise treating the task as detection: count found, missed and false objects."
},
{
"q": "Does the network also tell us how big each microbleed is?",
"a": "Yes, the marked voxels of one object give its volume. In the public benchmark the best program outlined the microbleeds it had found quite well: the overlap with the expert outline, the Dice score, was about 0.84. Finding them at all was the harder part."
}
],
"cmb_26": [
{
"q": "What is a cluster?",
"a": "A cluster is a group of marked voxels that hang together. From each voxel of the group you can reach every other one by stepping from neighbour to neighbour. Computer scientists call it a connected component. On this slide one cluster counts as one microbleed."
},
{
"q": "Where does the number 26 come from?",
"a": "Think of a block of 3 by 3 by 3 small cubes, 27 in total. The cube in the middle has 26 others around it. 6 share a whole face with it, 12 share only an edge, and 8 touch it only at a corner. 6 plus 12 plus 8 is 26."
},
{
"q": "Why do voxels that touch only at a corner count as connected?",
"a": "It is a choice. A microbleed is roughly a ball, and on a grid of cubes some of its voxels may touch the rest only diagonally. If we counted only the 6 face neighbours, such a microbleed could fall apart into pieces and be counted twice. With 26 neighbours it stays one."
},
{
"q": "Does the rule, 6 or 26 neighbours, really change the count?",
"a": "Yes. In one scan of today's exercise, counting the expert's marks with only the 6 face neighbours gives two pieces more than counting with 26 neighbours. The voxels are the same; only the rule differs. So always say which rule you used."
},
{
"q": "Which rule is the correct one?",
"a": "There is no single correct rule. The public benchmark for microbleed programs used 6 neighbours. This lecture and the exercise use 26. What matters is that the program and the reference are counted with the same rule, and that the rule is written down."
},
{
"q": "What happens if two real microbleeds lie directly next to each other?",
"a": "If their marked voxels touch, even at one corner, they become one cluster and are counted as one microbleed. The count is then one too low. The clustering rule cannot know that there were two. Close to a limit such as four, this can matter."
},
{
"q": "And the opposite: can one microbleed be counted twice?",
"a": "Yes. If the network marks a microbleed with a gap in the middle, the two parts do not touch and become two clusters. The count is then one too high. The rule with 26 neighbours makes this less likely than the rule with 6, but it cannot prevent it."
},
{
"q": "How does the computer find the clusters?",
"a": "It takes one marked voxel and gives it the number 1. Then it passes this number on to all marked neighbours, then to their neighbours, like water that spreads. When nothing new is reached, cluster 1 is complete, and the next free marked voxel starts cluster 2. This is called a flood fill."
},
{
"q": "Is a single marked voxel also a microbleed?",
"a": "By the counting rule, yes: one voxel alone is a cluster and counts as one object. But be careful. The consensus standards say that dark spots smaller than 2 millimetres, which may come from one single voxel, should be regarded as questionable on a 1.5 tesla scanner."
},
{
"q": "On one flat slice I count only 8 neighbours. Where are the others?",
"a": "In the slices above and below. On a flat slice a voxel has 8 neighbours: 4 share a side and 4 touch at a corner. The slice above adds 9 voxels and the slice below adds 9 more. 8 plus 9 plus 9 is 26. This is what the three small grids on the slide show."
}
],
"try_26": [
{
"q": "What am I supposed to do here?",
"a": "Click on squares to mark voxels, and click again to unmark them. The three grids are three slices that lie on top of each other. Watch the number of microbleeds. Then switch between rule 6 and rule 26 and see whether the number changes."
},
{
"q": "Why are there three grids? Are these three different pictures?",
"a": "No, it is one small block of the scan, cut into three slices: the slice above, this slice and the slice below. A square in the middle grid has the square at the same place in the left grid directly above it, and the one in the right grid directly below it."
},
{
"q": "What do the colours of the marked squares mean?",
"a": "One colour is one cluster, so one microbleed. Squares with the same colour belong together under the rule that is switched on. When you change the rule or add a voxel, the colours are given out again. The colour itself has no meaning."
},
{
"q": "What do the blue frames show when I point at a square?",
"a": "They show all places that count as touching this voxel under the current rule. With rule 6 these are the four side neighbours on the same slice, plus the square directly above and the one directly below. With rule 26 it is the whole block of 3 by 3 by 3 around it."
},
{
"q": "The example has five marked voxels. Why two microbleeds with rule 26, but four with rule 6?",
"a": "Three of the voxels touch only at an edge or a corner. Rule 26 accepts that and joins them into one microbleed. Rule 6 wants a shared face, so they stay three single ones. The other two voxels share a face and are one microbleed under both rules."
},
{
"q": "I added one voxel and the count went down. How can that be?",
"a": "Your new voxel was a bridge. It touches two clusters that were separate before, so they melt into one. The count is the number of clusters, not the number of voxels. In the same way, taking away a bridge voxel can raise the count."
},
{
"q": "I marked the same square in the slice above and in the slice below. Why are these two microbleeds?",
"a": "They do not touch. The middle slice lies between them, and its square is empty. Neighbours are only the voxels directly around a voxel, one step away. Mark the square between them, and the three become one cluster under both rules."
},
{
"q": "Does rule 26 mean that a microbleed has 26 voxels?",
"a": "No. 26 is the number of places around one voxel that count as touching it: 6 by a face, 12 by an edge, 8 by a corner. A microbleed can have one voxel or many. The rule only says which marked voxels belong to the same microbleed."
},
{
"q": "Can rule 6 ever give fewer microbleeds than rule 26?",
"a": "No. Every voxel that shares a face is also among the 26 neighbours. So everything that rule 6 joins, rule 26 joins as well. Rule 6 gives the same number or more, never fewer. Try to beat this in the widget; you will not manage."
},
{
"q": "In a real scan the slices are thicker than the pixels. Does 'touching' still mean the same?",
"a": "The rule counts steps in the grid, not millimetres. In one group of the public microbleed scans a voxel is 0.45 by 0.45 by 3.0 millimetres. There the neighbour in the slice above is 3 millimetres away, the neighbour on the same slice less than half a millimetre. Both count as touching."
}
],
"f1": [
{
"q": "What do TP, FP and FN stand for?",
"a": "TP is true positive: the program marked a spot and there is a real microbleed. FP is false positive: a mark where no microbleed is, a false alarm. FN is false negative: a real microbleed without a mark, a miss. On this slide: 4 TP, 1 FP, 1 FN."
},
{
"q": "What is the difference between precision and recall?",
"a": "Precision starts from the marks: of all marks, how many are real? Here 4 of 5, so 0.8. Recall starts from the microbleeds: of all real ones, how many were found? Here also 4 of 5. Recall is the same as sensitivity."
},
{
"q": "How do I get from precision and recall to F1?",
"a": "F1 is two times precision times recall, divided by precision plus recall. Here: 2 times 0.8 times 0.8 is 1.28, divided by 1.6, gives 0.8. A shortcut gives the same: 2 TP divided by 2 TP plus FP plus FN, so 8 divided by 10. One is perfect, zero is the worst."
},
{
"q": "Are the program marks on this slide real results?",
"a": "No. The picture is a real slice from public data, and the five microbleeds are the marks of an expert. The marks of the 'program' are invented for teaching: four hits, one false alarm on a vessel, one miss. For the data see the Sources button."
},
{
"q": "The program made five marks and there are five microbleeds. Is the count not correct?",
"a": "The number is right, but only by luck: one false alarm and one miss cancel each other out. That is why comparing only the two counts is not enough. F1 checks whether each mark sits on a real microbleed, and here it shows 0.8, not 1."
},
{
"q": "Why is there no true negative?",
"a": "A true negative would be a place without a microbleed where the program marked nothing. That is almost the whole brain, and it cannot be counted as objects. So measures that need true negatives, such as specificity, do not work here. Precision, recall and F1 need only TP, FP and FN."
},
{
"q": "Why F1 here, and not Dice as for the white matter lesions?",
"a": "Dice compares voxels, F1 compares objects. Here the question is how many microbleeds there are, so we count objects. Also, for very small things one voxel more or less changes Dice strongly. The international recommendations on validation advise treating small structures as a detection task."
},
{
"q": "How close must a mark be to count as a hit?",
"a": "That needs a rule, and the rule should be stated. In the public benchmark a marked object counted as found when its centre lay less than 5 millimetres from the centre of an expert's microbleed. Each expert microbleed could be matched only once."
},
{
"q": "Which is worse: a false alarm or a miss?",
"a": "It depends on how the result is used. If a person checks every mark, a false alarm costs only time, but a miss stays unseen because nobody looks there again. If the count is used directly, both change the number. F1 treats both errors as equally bad."
},
{
"q": "Can a program have a high precision and still be poor?",
"a": "Yes. A careful program that marks only the single clearest microbleed here has a precision of 1.0, but it finds 1 of 5, a recall of 0.2. Its F1 is only 0.33. F1 is pulled towards the weaker of the two values, so both must be good."
}
],
"try_f1": [
{
"q": "What am I supposed to do here?",
"a": "Look for small dark dots that you think are microbleeds and click on each one. A yellow ring appears. Click on a ring again to remove it. When you are done, press 'show answer' and compare your marks with the expert's."
},
{
"q": "Why do all the numbers show a question mark?",
"a": "They stay hidden until you press 'show answer'. So you have to decide without help, like a reader in the clinic. After that, the counts, precision, recall and F1 are shown, and they change with every further click."
},
{
"q": "What do the rings mean after 'show answer'?",
"a": "Your rings turn green for a hit and red for a false alarm. The dashed circles are the expert's microbleeds: green if you found it, orange if you missed it. An orange circle is a false negative, a miss."
},
{
"q": "How many microbleeds are on this picture?",
"a": "Try first, then press 'show answer'. The expert marked three on this slice, and two of them lie close together. So recall can only be 0, 0.33, 0.67 or 1 here."
},
{
"q": "I clicked just beside the dot. Why is it a false alarm?",
"a": "A mark counts as a hit only if it lies within a small fixed distance of the centre of an expert's microbleed, about the size of the dashed circle. Outside, it is a false alarm, and the microbleed also counts as missed. One careless click gives two errors."
},
{
"q": "I clicked a dark dot that looks just like the others. Why is it not a microbleed?",
"a": "On one slice you cannot always tell. A vessel that crosses the slice is also a small dark dot. The expert could scroll through the slices above and below: a microbleed is a small ball, a vessel goes on like a tube. A later slide shows this."
},
{
"q": "One wrong click and my F1 dropped a lot. Why is it so jumpy?",
"a": "Because there are only three microbleeds. All three found and one false alarm: precision 0.75, recall 1, F1 0.86. Two found and no false alarm: precision 1, recall 0.67, F1 0.80. With so few objects, every click moves the score in big steps."
},
{
"q": "I put two rings on the same dot. Why is one of them red?",
"a": "Each microbleed of the expert can be matched only once. The first ring takes it and is a hit. The second ring finds no free microbleed and counts as a false alarm. The public benchmark for microbleed programs used the same idea."
},
{
"q": "What if I simply click on every dark dot I can see?",
"a": "Then recall is high, because you miss nothing. But every wrong ring is a false alarm and pulls precision down. Three hits with seven false alarms give precision 0.3, recall 1 and F1 0.46. F1 does not reward clicking a lot."
},
{
"q": "My F1 is 0.8. Am I better than the best program, with about 0.68?",
"a": "That comparison is not fair. You had one slice with three microbleeds, and you knew that something was there. The programs searched whole scans, and 0.68 is the middle value over 147 test scans. On a quarter of those scans the best team stayed below about 0.37."
}
],
"count4": [
{
"q": "What does ARIA mean?",
"a": "ARIA stands for amyloid-related imaging abnormalities: changes that appear on MRI during treatment with these drugs. ARIA-E is swelling or fluid in the brain; the E stands for edema. ARIA-H is bleeding; the H stands for haemorrhage. ARIA-H means new microbleeds or thin blood deposits on the brain surface."
},
{
"q": "Where does the number four come from?",
"a": "From the drug trials. The large trials of both drugs did not take in people with more than 4 microbleeds. The expert recommendations for use took over this limit. So the drugs were simply not tested in people with more microbleeds; four is the entry rule of the trials."
},
{
"q": "Which drugs are meant?",
"a": "Two antibodies against amyloid: lecanemab, sold as Leqembi, and donanemab, sold as Kisunla. They are given as infusions into a vein. The European label of lecanemab names mild cognitive impairment and mild dementia due to Alzheimer's disease, with amyloid confirmed, as the use."
},
{
"q": "Is the limit of four the same everywhere?",
"a": "No. In the European Union, more than 4 microbleeds before treatment is a formal contraindication for both drugs: they must not be given. In the US label it is not; there it is reported as a trial exclusion, and 2 or more microbleeds are named as a risk factor. Labels change often; we read the 2026 versions."
},
{
"q": "Why do microbleeds that are already there raise the risk?",
"a": "The labels say that microbleeds may point to cerebral amyloid angiopathy: amyloid in the walls of small brain vessels, which makes them fragile. Both US labels name 2 or more microbleeds as a risk factor for ARIA. The exact mechanism was not part of the fact check for this lecture."
},
{
"q": "So with exactly four microbleeds, treatment is possible?",
"a": "By this one rule, yes: the limit is 'more than 4'. But the donanemab recommendations say that even within 0 to 4 the number should be weighed for the risk of each patient. Other MRI findings count as well. This is a lecture, not a treatment guideline."
},
{
"q": "Does the count depend on the scanner or the type of image?",
"a": "Yes, it can. The recommendations ask for T2* gradient echo or an equivalent such as SWI, preferably at 3 tesla, and the donanemab recommendations ask for the same scanner at every visit. That SWI shows more microbleeds is stated in the small vessel disease standards, not in the drug recommendations."
},
{
"q": "What happens when new microbleeds appear during treatment?",
"a": "They are counted against the first scan: up to 4 new ones is mild, 5 to 9 moderate, 10 or more severe. Moderate means pause. Severe means stop in the European labels; the US labels say pause and judge. For mild cases without symptoms the documents differ. This is a lecture, not a treatment guideline."
},
{
"q": "Is the microbleed count the only thing that is checked on the MRI?",
"a": "No. The recommendations also exclude people with a larger bleed of more than 10 millimetres, with superficial siderosis, which is old blood on the brain surface, with brain swelling, or with severe white matter disease. In the EU the drugs are also limited by a gene test, ApoE. This is a lecture, not a treatment guideline."
},
{
"q": "Who should count: the radiologist, the program, or both?",
"a": "Our checked sources do not decide this. Some arguments: a program does not get tired and counts the same way every time; a person knows the lookalikes and the patient. With the best published programs at an F1 of about 0.7, a program alone is not enough today. A sensible answer: the program suggests, the person decides."
}
],
"cmb_vessel": [
{
"q": "Why does a vessel look like a dot at all?",
"a": "A vessel is a thin tube. If the slice cuts straight across it, we see only its round cross-section, like a cut through a drinking straw. On T2* this cross-section is dark. So on one slice it is a small round dark dot, just like a microbleed."
},
{
"q": "On how many slices do I see a microbleed?",
"a": "That depends on its size and on the slice thickness. In this example the slices are 0.8 millimetres thin, and the microbleed is seen on 5 of 19 slices, about 4 millimetres. With slices of 3 millimetres, a microbleed of this size would be seen on only one or two."
},
{
"q": "What do you mean by 'the vessel moves'?",
"a": "A vessel almost never runs exactly at a right angle to the slices. So from slice to slice its dark dot shifts a little to the side. In this example the vessel is seen on all 19 slices and shifts by about 8 millimetres. A microbleed stays at its place and then disappears."
},
{
"q": "What does 'seen from the side' mean?",
"a": "The scan is a block of voxels. Normally we look at it in horizontal slices. The computer can cut the same block in another direction, for example from the side. In that view the microbleed is a small ball and the vessel is a line."
},
{
"q": "Why is a vessel dark on these images?",
"a": "Blood in the veins has given up its oxygen, and such blood disturbs the magnetic field a little, as the iron in a microbleed does. Fast flowing blood can also lose its signal. Greenberg's review names these 'flow voids' of vessels among the lookalikes."
},
{
"q": "How can I tell calcium from a microbleed?",
"a": "Calcium is also dark on T2*. Two things help. Place: calcium often lies in typical spots, for example in the pallidum, a nucleus deep in the brain. And CT: calcium is bright on CT, while microbleeds are generally not seen there."
},
{
"q": "Why do bone and air cause dark spots?",
"a": "Where brain, bone and air meet, for example above the nose and near the ears, the magnetic field is uneven. T2* images lose signal at such borders. These dark areas are image errors, called artefacts, not blood. Greenberg's review also names bone that falls partly into a voxel as a lookalike."
},
{
"q": "What if the vessel runs inside the slice and not across it?",
"a": "Then it appears as a dark line, and nobody mistakes it for a microbleed. The criteria of Greenberg say: round or oval, not linear. Only a vessel that crosses the slice looks like a dot. That is why scrolling, or the view from the side, solves the puzzle."
},
{
"q": "What if the slices are thick and I cannot follow the dot well?",
"a": "Then it is harder for people and for programs. In the public benchmark the best program reached a median F1 of about 0.78 on scans with thin 0.8 millimetre slices, and 0.52 to 0.67 on the two groups with 3 millimetre slices. The groups differed in other ways too, such as the scanner."
},
{
"q": "Where in the brain should I be especially careful?",
"a": "At the brain surface and in the grooves between the folds, where many vessels run: the criteria ask that a microbleed is at least half surrounded by brain tissue. Near the base of the skull, because of bone and air. And in the deep nuclei, because of calcium."
}
],
"ex3": [
{
"q": "How do I place a mark, and how do I remove it?",
"a": "Scroll through the slices with the mouse wheel, the arrow keys or the slider. Click on a dot to set a marker. Click on the marker again to remove it. You can also zoom in with the buttons. Dragging only moves the picture and sets no marker."
},
{
"q": "How much time do I have?",
"a": "Nine minutes for the three scans, so about three minutes per scan. Each scan has its own clock. At zero it turns red and counts on, but nothing is blocked: you can still mark and get your score."
},
{
"q": "How exactly do I have to hit the microbleed?",
"a": "Not exactly. A click counts as a hit if it lies on the microbleed, or within 2 millimetres of it, on the same slice or one slice above or below. So click on the middle of the dark dot and you are safe."
},
{
"q": "I see the same microbleed on two slices. Do I click it twice?",
"a": "No, once is enough. Each microbleed can be found only once. A second marker on the same microbleed is reported as a duplicate. It is not counted as a hit and not as a false alarm."
},
{
"q": "How many microbleeds are there in each scan?",
"a": "That is your task, so no number now. The three scans go from easy to hard: from large, clearly dark microbleeds to many small and faint ones. You see how many you found and how many you missed together with your score."
},
{
"q": "Do I really have to look at every slice?",
"a": "Yes. A microbleed can sit at any height of the brain, and a small one is visible on very few slices. Scrolling up and down is also your test for lookalikes: a dot that goes on over many slices and shifts sideways is a vessel."
},
{
"q": "Does the exercise work on my phone?",
"a": "It was tested in a Chrome-type browser on a computer, also at phone width with taps. It was not tested on a real touch screen, and not in Firefox or Safari. So it may work, but a laptop with a mouse is the safe choice."
},
{
"q": "Who decided which dots are real microbleeds?",
"a": "Experts. Their marks come with the public data, see the Sources button. For the exercise, expert voxels that touch by a face, an edge or a corner were grouped into one microbleed, the rule with 26 neighbours. Your clicks are compared with these."
},
{
"q": "How is my score calculated at the end?",
"a": "For each scan you get your hits, false alarms and misses, and from them precision, recall and F1. For the final F1, the hits, false alarms and misses of all three scans are added up first, and then one F1 is computed from the sums."
},
{
"q": "Can I change my marks after I have seen the score?",
"a": "No. Once a scan is scored, it is locked. But you can start the whole exercise again as often as you like, now or at home."
}
],
"beat3": [
{
"q": "Which program is 'the best program'?",
"a": "The best single entry in a public competition on microbleed detection. Nine teams took part in the microbleed task, and all programs were tested on the same 147 test scans. This program reached a median F1 of about 0.68 per scan. The paper is under the Sources button."
},
{
"q": "What does 'median F1 per scan' mean?",
"a": "F1 was computed for every test scan separately. The median is the value in the middle: half of the scans were better, half were worse. The spread was wide: on a quarter of the scans the program was perfect, and on another quarter its F1 was 0.37 or lower."
},
{
"q": "Does an F1 of 0.7 mean that the program finds 70 percent of the microbleeds?",
"a": "No. F1 mixes two errors: misses and false alarms. An F1 of 0.7 can come from finding almost all microbleeds with many false alarms, or from few false alarms with many misses. To know which, you need precision and recall separately."
},
{
"q": "I have a higher F1 than the program. Am I better?",
"a": "Enjoy it, but it is not a fair comparison. You had three scans chosen for teaching; the program was scored on 147 other scans. The hit rules differ. And your F1 is pooled over three scans, while the program's value is a median over single scans."
},
{
"q": "Why does almost everybody find the big one and miss small ones?",
"a": "A large microbleed fills many voxels and is clearly black. A small one fills only a few. In a thick slice it is averaged with the healthy tissue above and below, so it looks only a little grey. In this exercise the misses are usually the small, faint ones, and the false alarms are usually vessels."
},
{
"q": "How good are human experts at this? What F1 does a radiologist reach?",
"a": "Our checked sources give no such number for microbleeds, so I will not invent one. For white matter lesions we saw that a second expert reached a Dice of only 0.77 to 0.79 against the reference. Experts are not perfect either. In your exercise the expert marks are the reference by definition."
},
{
"q": "Would several programs together be better than one?",
"a": "Yes, a little. In the same competition, the results of the top programs were also combined; this is called an ensemble. The combination reached a median F1 of about 0.76, against 0.68 for the best single program. That is still far from perfect."
},
{
"q": "Is an F1 of 0.7 good enough to use such a program on patients?",
"a": "Our sources do not say so. The paper on the competition calls the microbleed results promising. The imaging standards for small vessel disease, which we could read as accepted manuscript, say that microbleeds are assessed by visual rating and that computer methods are in development and need validation. So today a person has to check."
},
{
"q": "My F1 was low. What should I do differently?",
"a": "Look at the kind of error. Many false alarms: before you click, scroll up and down and check whether the dot goes on like a vessel. Many misses: go through every slice slowly and zoom in. The exercise stays online, so try again at home."
},
{
"q": "Is 0.7 still the state of the art?",
"a": "The number comes from a competition held in 2021 and published in 2024. Newer programs may well be better. We did not check newer results for this lecture, so take 0.7 as a documented reference point, not as the latest record."
}
],
"wrap": [
{
"q": "What does 'checked' mean in practice? Must I look at every scan?",
"a": "With ten scans: yes, open each result and look at it on top of the image. With thousands this is not possible. Then let quality scores find the suspicious results, look at those, and also look at a sample of the ones that passed. A passing score alone is not proof."
},
{
"q": "Why do we need three different measures? Why not one for all?",
"a": "Because the questions differ. For grey matter there is no expert mask for your scan, so a quality score estimates how good the result is. For lesions we ask whether the right voxels are marked: Dice. For microbleeds we ask whether the right number of objects is found: F1."
},
{
"q": "If the quality score says 'pass', can I trust the segmentation?",
"a": "Not blindly. In the stroke example of this lecture all scores passed, although the labels around the lesion were wrong. The authors of the tool have also published no test on large lesions such as stroke or tumour. So a pass is necessary, but not enough."
},
{
"q": "Which tool should I take for my own project?",
"a": "It depends on the question and the scans. From today: SynthSeg for volumes, also on clinical scans, in about a minute. FreeSurfer when you need the cortical surface and thickness and have good T1 scans. For white matter lesions BIANCA without a graphics card, or a U-Net, which is usually more accurate. And check the result."
},
{
"q": "Why are small things so hard for every method?",
"a": "A small object has few voxels, so one voxel wrong is a large share: in our toy example the same shift gave a Dice of 0.90 for the big lesion and 0.50 for the tiny one. In our runs BIANCA found 99 percent of the largest lesions, but only about one in four of the smallest."
},
{
"q": "Does the rule mean that automatic tools are bad?",
"a": "No. They are fast, they do not get tired, and they give the same answer every time. For large studies there is no other way: nobody paints ten thousand scans by hand. The rule only says: use them, but look before you believe the numbers."
},
{
"q": "What can go wrong if I do not check?",
"a": "Two examples from today. Where a stroke lesion touched a structure, its measured volume was wrong: the pallidum by about a fifth in our test with simulated lesions. And a vessel counted as a microbleed can turn four into five, which crosses a treatment limit."
},
{
"q": "What do I do if I have no expert mask for my own data?",
"a": "Then you cannot compute Dice or F1. Ask an expert to mark a small sample of your scans and test the program on it, and look at the rest by eye. Results from public data do not carry over by themselves: in our runs a new scanner lowered BIANCA's Dice by 0.05."
},
{
"q": "Which of the three tasks is the hardest?",
"a": "By today's numbers, the microbleeds. For white matter lesions the best program reached a Dice of 0.80, the level of a second expert. For microbleeds the best program reached a median F1 of about 0.7. The two measures are not the same, but the direction is clear: the smaller the target, the harder."
},
{
"q": "Do these checks also work for other organs or other diseases?",
"a": "The ideas do. Overlap measures such as Dice fit things with a clear area or volume. Counting found, missed and false objects fits small things. The international recommendations on validation say just this: first decide what kind of problem you have, then choose the measure."
}
],
"exam": [
{
"q": "Do I have to know the formulas by heart?",
"a": "Plan for it: the slide says compute, and there are only three. Dice is 2 TP divided by 2 TP plus FP plus FN. Precision is TP divided by TP plus FP. Recall is TP divided by TP plus FN. F1 combines precision and recall."
},
{
"q": "Can you show one Dice calculation step by step?",
"a": "Take TP 8, FP 2, FN 2. Two times TP is 16. Below the line: 16 plus 2 plus 2 is 20. 16 divided by 20 is 0.80. Count first, then put the numbers in. This is the check question on this slide."
},
{
"q": "What does 'read a QC score' mean? What could I be asked?",
"a": "You see quality scores for the regions of one segmentation, each between 0 and 1. You say which regions pass and which need a second look. For SynthSeg the limit from the paper is 0.65. In the lecture: 0.722 passed, 0.636 failed. Failed means: open the scan and look."
},
{
"q": "And one example for precision, recall and F1?",
"a": "Take TP 3, FP 3, FN 0. Precision: 3 of 6 marks are real, 0.5. Recall: 3 of 3 microbleeds found, 1.0. F1: two times 0.5 times 1.0 is 1.0, divided by 1.5, gives 0.67. All were found, but half of the marks were false alarms."
},
{
"q": "Is Dice the same as F1?",
"a": "The formula is the same: 2 TP divided by 2 TP plus FP plus FN. The difference is what you count. For Dice, TP, FP and FN are voxels. For F1 in this lecture they are objects, the clusters. So one result can have a high Dice and still a low F1."
},
{
"q": "How do I count clusters by hand?",
"a": "Take one marked voxel and collect every marked voxel that touches it by a face, an edge or a corner, then the neighbours of those, until nothing is added. That is one cluster. Start again with a voxel that is still free. On a single flat slice, touching means the 8 voxels around."
},
{
"q": "Which numbers from today are worth remembering?",
"a": "The slide lists skills, not numbers. A few anchors still help: a SynthSeg quality score below 0.65 means failed. A Dice of about 0.8 was the level of a second expert. The best microbleed program had an F1 of about 0.7. And more than 4 microbleeds is the limit in the drug recommendations."
},
{
"q": "How well do I need to know how the tools work inside?",
"a": "The three skills on the slide come first. For the tools, aim for one sentence each. FreeSurfer: the cortex as a folded sheet. SynthSeg: a network trained on artificial images. BIANCA: the nearest stored examples vote. U-Net: shrink for context, enlarge for detail."
},
{
"q": "How can I practise these three skills?",
"a": "With the same material as today. Each of the three skills has a check question on its slide, the 'Try it' slides let you play with clusters, Dice and F1, and the lesion and microbleed exercises give you your own Dice and F1. You can repeat all of them."
},
{
"q": "What if there are no hits at all, TP is zero?",
"a": "If there are real microbleeds but no hit, Dice and F1 are 0. Precision without any mark would be zero divided by zero, which is not defined. If there is nothing to find and nothing is marked, the formula has no answer either; then say in words that program and reference agree."
}
],
"more": [
{
"q": "Where exactly do I find the slides, films and exercises?",
"a": "In the online repository of this lecture. The link is under the Sources button on this slide. There you find the slide deck, the short film for each slide and the three exercises."
},
{
"q": "What is the atlas trainer?",
"a": "A web page for practising brain anatomy on MRI. Today's atlas quiz with its ten questions is a short version of it. The full trainer has many more brain regions and three modes: explore, quiz and study. The link is also under the Sources button."
},
{
"q": "Is the material in English?",
"a": "The slides, films and exercises are in English. The full atlas trainer has a German interface at the moment."
},
{
"q": "Do I have to install something to use the exercises?",
"a": "No. Each exercise is a plain web page that runs in your browser. Nothing is installed, and your clicks are scored on your own device."
},
{
"q": "Can I use the pictures in my own presentation?",
"a": "Check the licence first; it is listed under the Sources button. The grey matter pictures come from data without restrictions. The lesion and microbleed data allow non-commercial use with credit, so a seminar talk is fine and commercial use is not. We could not see every detail of the terms for the microbleed data."
},
{
"q": "Can I hear the explanations again at home?",
"a": "Yes. Every slide has a short film with a spoken explanation, and the deck stays online. You can replay any single slide as often as you like, at your own speed."
},
{
"q": "Can I try FreeSurfer, SynthSeg or BIANCA myself?",
"a": "Yes. FreeSurfer, which contains SynthSeg, and FSL, which contains BIANCA, can be downloaded by researchers and students; read their licence terms. Expect very different waiting times: SynthSeg took about a minute per scan on a normal processor in our test, and a full FreeSurfer run takes hours."
},
{
"q": "Where do I find the papers behind the numbers?",
"a": "Every slide has a Sources button. It lists the papers and data for that slide, each with a link and one line on what is in it. The numbers on the slides were checked against these sources before the lecture."
},
{
"q": "Is the atlas trainer part of the exam?",
"a": "The slide offers it as extra practice for the brain regions. The three exam skills are on the slide before: read a quality score, compute Dice, and count clusters for F1. For those, today's exercises and check questions are the better training."
},
{
"q": "What should I read if I want to go deeper?",
"a": "Start with the Sources buttons. For microbleeds: the review by Greenberg and colleagues from 2009. For the definitions of small vessel disease on MRI: the STRIVE standards by Wardlaw and colleagues, 2013. For choosing the right measure: 'Metrics Reloaded' by Maier-Hein and colleagues, 2024."
}
]
};
