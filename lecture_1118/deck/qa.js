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
"q": "Why must volumes be corrected for head size?",
"a": "Bigger heads have bigger brains and bigger structures, also in healthy people. Without a correction, a hippocampus may look small only because the head is small. Studies therefore divide by the intracranial volume or put it into the statistical model; O'Brien 2011 compares these ways."
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
"q": "Are the pictures on this slide real data?",
"a": "The first part is a sketch: a cut through the cortex with two drawn lines. The turning brain at the end is real: FreeSurfer's average brain, a public template, with its two surfaces and its average thickness at every point. It is an average of many adults, not one person."
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
"q": "Is the grey value the only thing that is random?",
"a": "No. The slide shows only the painting step. The real generator also bends the label map (turn, stretch, warp), adds what a scanner adds (uneven brightness and noise), and makes the image coarse with thick slices. Without bending, the network lost 4.3 Dice points in the authors' test."
},
{
"q": "Would realistic images not be better for training?",
"a": "The authors tested this. Networks trained on images narrowed to the contrast or resolution of the target scans were worse, by 1.4 and 2.6 Dice points, although they were trained again for every target. Images beyond what is realistic force the network to rely on shape."
},
{
"q": "What does 'uneven brightness' mean in the full generator?",
"a": "Real scanners do not receive the signal equally well from all places, so the same tissue is brighter in one corner than in another. This is called the bias field. The generator adds a random one, so the network learns to ignore it."
},
{
"q": "Why does the full generator also make the image coarse?",
"a": "Clinical scans often have thick slices. The generator blurs the image, keeps only thick slices in a random direction, and brings it back to the 1 mm grid, while the target stays the sharp label map. So the network learns to give sharp labels from a coarse scan."
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
"a": "No, a simplified illustration: one slice of a public scan, painted three times with grey values we chose to show three clearly different contrasts. The real generator works in three dimensions, picks every grey value at random and adds the other steps."
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
"qc_euler": [
{
"q": "What is the Euler number in one sentence?",
"a": "Count the corners of a surface, subtract the edges and add the faces. For a closed surface without holes the answer is always 2. FreeSurfer reports this number for the cortex surface it builds."
},
{
"q": "Why is it 2 for a cube?",
"a": "A cube has 8 corners, 12 edges and 6 faces. 8 minus 12 plus 6 is 2. Any other closed shape without holes gives the same answer, however many pieces it is made of."
},
{
"q": "What is a handle?",
"a": "Think of the handle of a cup, or of a ring: a part of the surface that forms a loop with a hole through it. Each handle lowers the Euler number by 2. One handle gives 0, two handles give minus 2."
},
{
"q": "Why must the cortex surface have no handles?",
"a": "FreeSurfer treats each hemisphere's surface as a closed sheet that can be blown up to a ball. That only works without holes or handles. The documentation says the topology fixer makes sure there are none."
},
{
"q": "Where do the numbers minus 38 and 26 come from?",
"a": "From our own FreeSurfer 8.2.0 run on a public stroke scan (Aphasia Recovery Cohort, sub-M2104). The log of the left hemisphere reports 26 defects and an Euler number of minus 38 before the repair. The right hemisphere had minus 42."
},
{
"q": "Why 26 defects but 20 handles?",
"a": "They are two different counts, and the log gives both. A defect is a region that FreeSurfer cuts out and builds again. The number of handles follows from the Euler number: 2 minus 2 times 20 is minus 38."
},
{
"q": "If FreeSurfer repairs the defects, why should I care?",
"a": "The repair makes the surface closed, but it does not make the image better. Many defects are a sign that the image was hard to read. The repaired surface can still lie in the wrong place, so look at such a scan."
},
{
"q": "Which value is too bad?",
"a": "There is no fixed limit. In Rosen 2018 the threshold from the training data was right in only 76 % of scans from another dataset. Compare the number across your own scans and look at the ones far out."
},
{
"q": "How well does it find bad scans?",
"a": "In Rosen 2018 it separated scans that experts rated unusable from the others with an AUC of 0.98 to 0.99 in three samples. An AUC of 1 would be perfect, 0.5 is guessing. The samples were young people and adults."
},
{
"q": "Does SynthSeg have an Euler number too?",
"a": "No. SynthSeg builds no surface, it labels voxels. Its warning number is the QC score from the slide before. The idea is the same: an automatic number tells you which scans to open first."
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
"a": "Most tools never saw large lesions in training. Disease changes the anatomy: lesions appear, the ventricles grow, tissue shrinks. The tool then meets something it has never seen, and it can fail without any warning. The next slide shows an example."
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
"a": "It never saw a large stroke lesion in training. Where the stroke destroyed tissue, the T1 image is dark, where the tool expects normal tissue. It still has to give those voxels one of its normal labels, so the borders nearby shift."
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
"q": "Why do I first need the lesion mask?",
"a": "Every option needs to know where the lesion is: filling, nulling, the margin and the hemisphere choice all start from it. An expert paints it, or a lesion tool marks it and an expert checks it."
},
{
"q": "What does mirror filling mean?",
"a": "The lesion voxels get the grey values of the same place in the other, healthy hemisphere, as in a mirror. The idea comes from Nachev and colleagues, 2008, who used it so that brains with lesions can be aligned to a standard brain. Real tools align the flipped brain first; the slide shows a plain flip."
},
{
"q": "Why not fill with white matter values, as for small white matter lesions?",
"a": "Filling with white-matter values was made for white matter lesions, which lie inside the white matter. A stroke often destroys cortex and deep grey matter too. Painting it as white matter would put white matter where cortex belongs."
},
{
"q": "What does nulling do?",
"a": "The lesion voxels are set to zero, so the scan has a black hole there. The tool then sees no tissue in the lesion. It is simple, but the hole itself is something the tool never saw in training, so the labels next to it can still change."
},
{
"q": "What was the test behind the numbers?",
"a": "Stroke masks from public data were pasted into healthy public scans, and SynthSeg ran on each scan with and without the lesion: 222 pairs on 8 healthy scans. Every change is caused by the lesion, because the healthy scan is the truth."
},
{
"q": "What do 39 % and 7 % mean?",
"a": "The share of brain voxels whose SynthSeg label changed because of the lesion: 39 % of the voxels 1 to 2 mm from the lesion, 16 % at 4 to 5 mm, 7 % at 8 to 10 mm, and about 1 % far away, which is the tool's own scatter."
},
{
"q": "Why is the margin the most pragmatic way?",
"a": "It needs no new image and no extra tool: you leave the lesion and a few millimetres around it out of the count. With 5 mm, 85 % of the structures on the stroke side stayed within 5 % of their true volume, as many as with mirror filling (82 %); untreated, only 67 %."
},
{
"q": "How big should the margin be?",
"a": "A trade-off. A larger margin removes more errors but also more healthy tissue that you wanted to measure. In our test the errors fell quickly over the first millimetres; 5 mm was a reasonable compromise, but no margin removes them all."
},
{
"q": "When do I use only the healthy hemisphere?",
"a": "When the lesion is so large that much of one hemisphere is affected. Then you measure the healthy side and compare it with healthy people of the same age, or with the patient's later scans."
},
{
"q": "Does the QC score tell me which option worked?",
"a": "No. The QC score looks only at the label map and passed on the stroke scan even with wrong labels near the lesion. Look at the result next to the lesion with your own eyes."
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
"bianca_matters": [
{
"q": "What do the numbers on the bars mean, for example +0.14?",
"a": "They are changes of the Dice score. Dice measures how well BIANCA's mask matches the expert mask, from 0 to 1; it comes a few slides later. Plus 0.14 means: with position switched on, the mean Dice was 0.14 higher. All numbers come from our own runs on public scans."
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
"q": "On which scans should I choose the cut-off?",
"a": "On scans with expert masks that BIANCA did not learn from. And never on the scans you use for the final score. If you pick the cut-off on the test scans, the reported Dice is too good, because the cut-off has been fitted to exactly those scans."
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
"q": "If my study has thick slices, does it help to train BIANCA on thick slices too?",
"a": "Less than you would hope. In our simulation, a model trained on 5 mm slices scored 0.589 on 5 mm scans; the model trained on 3 mm slices scored 0.595. The small lesions are missing in the picture itself. Training cannot bring back what the scan did not record."
},
{
"q": "Are these the best settings for every study?",
"a": "They are the best for our runs on one public set of scans. The original paper also preferred FLAIR plus T1 and 10,000 healthy points, which supports them. But patches, for example, might help on noisier scans. Take our numbers as a starting point and test on your own data."
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
"train_vs_own": [
{
"q": "Why does the training data of a tool matter so much?",
"a": "A trained tool only knows the kind of images it has seen. If your people, scanner, sequence or slice thickness differ, the images look different, and the tool can fail without any warning. So the first question before using it: what was it trained on?"
},
{
"q": "What should I compare between the training data and my scans?",
"a": "Five things: the people (healthy, elderly, small vessel disease, stroke), the scanner and its field strength, the sequence (for microbleeds 2D or 3D T2* gradient echo, or SWI), the slice thickness, and how many lesions there are and how big they are."
},
{
"q": "Where can I find out what a tool was trained on?",
"a": "In the paper that describes the tool, often in a table of the data sets, and in the documentation or model card of the software. If you cannot find it, ask the authors. For a public challenge, the challenge paper lists the sites, scanners and sequences."
},
{
"q": "Why do the three VALDO sites differ so much?",
"a": "They come from different studies: two population studies (London and Rotterdam) and a study of relatives of Alzheimer patients. They used different scanners (1.5 or 3 tesla), 2D or 3D sequences, and slices from 0.8 mm to 4 mm thick. Even one challenge mixes very different images."
},
{
"q": "What does it mean that three scans hold most microbleeds at one site?",
"a": "At the SABRE site, 91 of the 106 microbleeds lie in only 3 of the 11 scans. A tool trained there mostly learned from a few patients with many microbleeds. Counts per site can hide this; always look at how lesions are spread over the scans."
},
{
"q": "Why do you count 106 microbleeds for SABRE when the paper lists 123?",
"a": "We counted connected clusters of marked voxels in the public reference masks (26 neighbours). The challenge paper counted in its own way. Both are fine as long as you say how you counted; the point of the slide is the uneven spread, not the exact number."
},
{
"q": "Is a Dice of 0.66 on new scanners bad?",
"a": "Not much worse than 0.70 on the scanners BIANCA knew, and one of the two new scanners was even as good as the known ones. The gap is small here. But you only know that after testing on scans from the new scanner, and another tool or scanner can drop much more."
},
{
"q": "Why are small microbleeds missed more often?",
"a": "A small microbleed covers only a few voxels, has less contrast and looks more like noise or a small vessel. Thick slices blur it further. So a detector finds 6 of 8 large ones but only 4 of 10 under 2 mm. The same is true for small white matter lesions with BIANCA."
},
{
"q": "How was 'found' decided for the detector?",
"a": "With the rule of the microbleed exercise: the centre of a detection must lie at most 2 mm from a microbleed within the slice and at most one slice above or below. Each microbleed counts once. Each scan was judged by a model that had not been trained on it."
},
{
"q": "Why do follow-up scans need the same scanner and protocol?",
"a": "Real change is small: whole-brain volume falls by about 0.45 % per year in older people without dementia (Fotenos 2005). In our run on public scans, repeat measurements of the thalamus varied by 3.4 %. A new scanner or protocol can shift volumes by more than years of change, so keep both fixed and use a longitudinal pipeline."
}
],
"two_ways": [
{
"q": "When do I need to adapt a tool at all?",
"a": "Only when testing shows a drop. First mark a few of your own scans by hand and score the tool on them. If the score is close to the published one, use the tool and keep checking by eye. Adapting costs time and marked scans."
},
{
"q": "What does mixing mean?",
"a": "You put a few of your own hand-marked scans into the training pool, together with the public training data, and train the tool again from the start. The tool then learns both the old and the new scanner at the same time."
},
{
"q": "What does fine-tuning mean?",
"a": "You take the trained model, its weights, and go on training it for a while on your own marked scans, with a small learning rate. It keeps most of what it knew and adjusts to your scanner. You do not need the original training data."
},
{
"q": "Why can I not always mix?",
"a": "Mixing needs the original training data. Many models are shared only as weights; the training scans may not be allowed to leave the hospital or the study. Then fine-tuning is the only way. For BIANCA you always have the training data, because you train BIANCA yourself."
},
{
"q": "What is forgetting?",
"a": "When a network is trained further on new data only, its weights move towards the new task and it can get worse on the old one. This is called catastrophic forgetting. Mixing avoids it, because the old data stay in the training."
},
{
"q": "Does forgetting matter for me?",
"a": "Only if the model must still work on the old scanners. If you only want to use it on your own scanner, a fine-tuned model that forgot a little about the old scanners is fine. If you share it with other centres, mixing is safer."
},
{
"q": "Which way gives better results?",
"a": "It depends on the data and the tool; there is no general winner. Mixing needs more computing because the whole pool is trained again. Fine-tuning is quick. Both must be tested on your own scans that were not used for adapting."
},
{
"q": "How does your microbleed detector use both ways?",
"a": "It has two stages. The first stage, a U-Net that finds candidates, is fine-tuned from the model trained on the public data. The second stage, a classifier that rejects mimics, is retrained on public and local candidates together, so nothing learned from the public data is overwritten there."
},
{
"q": "How many of my own scans do I need to mark?",
"a": "Fewer for fine-tuning than for training from scratch, but how many depends on your data. Measure it with a learning curve on your own scans; the next slide shows how. In one study on white matter lesions, two scans of the new scanner already helped a lot."
},
{
"q": "Can I adapt a tool without marking anything?",
"a": "Partly. Some tools have settings you can choose on your own data, such as the threshold. With scans that you know contain no lesions, you can set the threshold so that the tool makes few false alarms. To check how many lesions it finds, you need marked scans."
}
],
"bianca_mix": [
{
"q": "Why is BIANCA's model just a set of points?",
"a": "BIANCA is a k-nearest-neighbour method. Training means storing example voxels from the marked training scans, each with its features (FLAIR and T1 brightness, position). A new voxel is judged by a vote of the 40 stored points nearest to it. There are no weights to learn."
},
{
"q": "Why can a new scanner make the neighbours vote wrong?",
"a": "Another scanner gives other brightness values for the same tissue. A lesion voxel can then fall where the stored points are mostly healthy tissue, and the 40 nearest neighbours vote 'healthy'. The picture on the slide draws such a shift as an illustration; it is not measured."
},
{
"q": "Why does adding marked scans from the new scanner help?",
"a": "Their voxels are stored as new example points with the new brightness. A lesion voxel from the new scanner then finds lesion examples from the same scanner among its nearest neighbours, and the vote can be right again."
},
{
"q": "Is this mixing or fine-tuning?",
"a": "Mixing. For BIANCA you always have the training data, because you train it yourself: you add your marked scans to the stored examples and train again. There are no weights that could be fine-tuned."
},
{
"q": "How long does retraining BIANCA take?",
"a": "In our runs, training BIANCA on the 60 challenge scans plus up to five local scans took about half a minute on a normal processor, and each new scan about 15 seconds. Most of the work is marking the scans by hand."
},
{
"q": "Why were five scans of each new scanner kept aside?",
"a": "To test fairly: the scans used for training must not be the scans used for scoring. Each scanner's 10 test scans were split into 5 local scans that could be added and 5 held-out scans for the score, in several random splits."
},
{
"q": "Why compare with a model trained on the local scans only?",
"a": "It shows whether the 60 public scans still help. Five local scans alone gave about the same mean, 0.68, but 7 of 20 scans got worse and small lesions were found less often. The mix was the safer choice."
},
{
"q": "Should I always add local scans to BIANCA?",
"a": "Check first. In our test on the two new scanners of the challenge, adding five marked scans raised the Dice only from 0.66 to 0.68; five scans got better, none worse. Here BIANCA carried over well. On another scanner the drop can be larger; then adding scans is cheap."
},
{
"q": "Does adding scans change BIANCA's best threshold?",
"a": "It can. The probability map changes when the stored examples change, so the cut-off that gave the best Dice may move. In the lecture the cut-off stayed fixed at 0.90, the value chosen on the training split."
},
{
"q": "Why are there small differences between splits?",
"a": "With only five test scans per split, one patient with many or very few lesions changes the mean. That is why the experiment repeats random splits and reports the mean over them; with so few scans, small differences are not reliable."
}
],
"finetune": [
{
"q": "What are the weights of a network?",
"a": "The numbers inside the network that are learned during training: how strongly each part reacts to each pattern. A trained model is just the network plus its weights. Fine-tuning changes these numbers a little; training from scratch starts with random numbers."
},
{
"q": "What is the learning rate?",
"a": "How big each step is when the weights are changed during training. A small learning rate in fine-tuning means small steps, so the model keeps what it already knows and only adjusts it to your scans."
},
{
"q": "Why does starting from a trained model help?",
"a": "The model already knows what a microbleed looks like in general: a small dark round dot. It only needs to learn how your scanner shows it, for example another contrast or more noise. That needs far fewer examples than learning everything from random weights."
},
{
"q": "Why is choosing a new threshold the cheapest step?",
"a": "The network gives each voxel a probability; the threshold decides what counts as a detection. On a new scanner, the probabilities can be higher or lower overall. Moving the threshold costs no training, and scans without microbleeds are enough to set it so that false alarms stay low."
},
{
"q": "What are normalisation layers?",
"a": "Layers inside the network that rescale the values passing through, so that the next layer gets numbers in a familiar range. Adapting only them, and leaving the rest fixed, can absorb a change in brightness and contrast with very few scans."
},
{
"q": "Why test on scans that were not used for training?",
"a": "A model always looks good on the scans it was adapted on; it may simply have learned them. Only scans it has never seen tell you how it will do on the next patient. Keep a few marked scans aside for testing."
},
{
"q": "What is a learning curve?",
"a": "A plot of how good the model is against how many marked scans it was trained with. Train with 3, 5, 10, 20 scans, and each time test on the rest. Where the curve stops rising, more marking does not pay."
},
{
"q": "Why does the slide show question marks instead of a curve?",
"a": "Because the curve depends on your data, your scanner and your tool. Any curve we drew would look like data from somewhere. You have to measure your own."
},
{
"q": "Which scans should I mark for fine-tuning?",
"a": "Typical patients from your own scanner, with a usual number of lesions, are the best use of your time. Scans without any lesions teach the model nothing about what to find, and a few patients with very many lesions cost a lot of marking."
},
{
"q": "Is fine-tuning the same as training from scratch with fewer scans?",
"a": "No. Training from scratch starts from random weights and must learn everything from your scans, so it needs many more of them. Fine-tuning starts from a model that already works on other data. With many marked scans the two can end up similar."
}
],
"exam": [
{
"q": "Which tool was trained on which data?",
"a": "FreeSurfer's atlas: about 40 hand-labelled brains. SynthSeg: label maps of about 1,000 brains, young and old, with simulated white-matter-like lesions. CAT12: an average of healthy adults (IXI). BIANCA: your own marked patients. The WMH challenge U-Nets: 60 patients from 3 scanners. VALDO microbleed models: 72 older people."
},
{
"q": "Why fill or mask a stroke lesion?",
"a": "None of these tools was trained on brains with large stroke lesions. A lesion looks like nothing the tool knows, so it labels it wrongly and disturbs the regions next to it. Filling paints it with normal-looking tissue; masking leaves it out of the measurement."
},
{
"q": "What do I do with a new scanner?",
"a": "Mark a few of your own scans and score the tool on them. If the score is close to the published one, use it and keep checking by eye. If it drops, mix your marked scans into the training, or fine-tune the model if you only have its weights."
},
{
"q": "Does SynthSeg need fine-tuning on a new scanner?",
"a": "It was designed not to: it was trained on synthetic images with random contrast and resolution, so a new scanner is just one more variation. You still check the result with the QC scores and by eye."
},
{
"q": "Is BIANCA fine-tuned?",
"a": "No. BIANCA has no pretrained model: you train it on your own hand-marked scans. To adapt it, you add marked scans from the new scanner to its training set and train again, which takes minutes."
},
{
"q": "Why check with my own eyes if there are QC scores?",
"a": "Scores catch many failures, but not all: the stroke scan passed every SynthSeg QC value, yet the labels near the lesion were wrong. A quick look at each scan finds what the numbers miss."
},
{
"q": "Why are small lesions always the problem?",
"a": "A small lesion has few voxels, little contrast and many lookalikes. One voxel of disagreement costs a small lesion much of its Dice. BIANCA found 24 % of lesions under 10 voxels, our microbleed detector 4 of 10 microbleeds under 2 mm."
},
{
"q": "Why several raters?",
"a": "Even experts disagree: a second expert reached a Dice of only about 0.77 to 0.79 against the reference. With several raters you can see where the reference itself is uncertain, and a program cannot be expected to beat that agreement."
},
{
"q": "Which numbers are worth remembering?",
"a": "A SynthSeg QC score below 0.65 means failed. A Dice of about 0.8 is the level of a second expert. The best microbleed program reached an F1 of about 0.7. More than 4 microbleeds is the limit in the drug recommendations."
},
{
"q": "What is the one rule behind all five points?",
"a": "Never trust a segmentation you have not checked: know what the tool learned from, test it on your own scans, look at the result, and expect trouble with small lesions."
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
