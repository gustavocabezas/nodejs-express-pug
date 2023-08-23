var express = require('express');
var router = express.Router();
const axios = require('axios');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async function (req, res, next) {
    try {
        const apiResponse = await axios.get('/candidateDocuments');

        if (apiResponse.status !== 200) {
            return res.redirect('/signin');
        }

        const candidateDocumentsList = apiResponse.data;

        res.render('candidateDocuments', {
            title: 'Candidate Documents',
            candidateDocuments: candidateDocumentsList
        });
    } catch (error) {
        console.log("Error:", error);
        res.redirect('/signin');
    }
});

router.get('/:candidateDocumentId', async function (req, res, next) {
    try {
        const candidateDocumentId = req.params.candidateDocumentId;
        const apiResponse = await axios.get(`/candidateDocuments/${candidateDocumentId}`);

        if (apiResponse.status !== 200) {
            return res.redirect('/signin');
        }

        const candidateDocument = apiResponse.data;

        let base64PresentationLetter = candidateDocument.presentationLetter ? candidateDocument.presentationLetter.toString('base64') : null;
        let base64Curriculum = candidateDocument.curriculum ? candidateDocument.curriculum.toString('base64') : null;

        candidateDocument.PresentationLetter = base64PresentationLetter;
        candidateDocument.Curriculum = base64Curriculum;

        res.render('CandidateDocuments', {
            title: 'Candidate Document',
            candidateDocument: candidateDocument
        });
    } catch (error) {
        console.log("Error:", error);
        res.redirect('/signin');
    }
});

router.post('/:candidateDocumentId', upload.fields([{ name: 'PresentationLetter', maxCount: 1 }, { name: 'Curriculum', maxCount: 1 }]), async (req, res) => {
    try {
        const candidateDocumentId = req.params.candidateDocumentId;
        const updatedFields = {};

        if (req.files != undefined) {
            if (req.files.PresentationLetter) {
                updatedFields.presentationLetter = req.files.PresentationLetter[0].buffer;
            }

            if (req.files.Curriculum) {
                updatedFields.curriculum = req.files.Curriculum[0].buffer;
            }
        }

        console.log("\nupdatedFields.presentationLetter:", updatedFields.presentationLetter);
        console.log("\nupdatedFields.curriculum:", updatedFields.curriculum);

        const apiResponse = await axios.put(`/candidateDocuments/${candidateDocumentId}`, updatedFields);
        console.log("\napiResponse data:", apiResponse.data);

        res.redirect('/candidateDocuments');
    } catch (error) {
        console.log(error);
    }
});

router.get('/download/presentationLetter/:candidateDocumentId', async (req, res) => {
    try {
        const candidateDocumentId = req.params.candidateDocumentId;
        const apiResponse = await axios.get(`/candidateDocuments/${candidateDocumentId}`);

        if (apiResponse.status !== 200) {
            return res.status(400).send('Error fetching document');
        }

        const candidateDocument = apiResponse.data;
        if (!candidateDocument.presentationLetter) {
            return res.status(404).send('No presentation letter found');
        }

        const presentationLetterBuffer = Buffer.from(candidateDocument.presentationLetter.data); 
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=presentationLetter.pdf');
        res.send(presentationLetterBuffer);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send('Internal server error');
    }
});

router.get('/download/curriculum/:candidateDocumentId', async (req, res) => {
    console.log("\nEntro en el /download/curriculum/:candidateDocumentId");
    try {
        const candidateDocumentId = req.params.candidateDocumentId;
        const apiResponse = await axios.get(`/candidateDocuments/${candidateDocumentId}`);

        if (apiResponse.status !== 200) {
            return res.status(400).send('Error fetching document');
        }

        const candidateDocument = apiResponse.data;
        if (!candidateDocument.curriculum || !candidateDocument.curriculum.data) {
            return res.status(404).send('No curriculum found');
        }

        const curriculumBuffer = Buffer.from(candidateDocument.curriculum.data); 
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=curriculum.pdf');
        res.send(curriculumBuffer);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
