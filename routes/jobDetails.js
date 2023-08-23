var express = require('express');
var router = express.Router();
const axios = require('axios'); 
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:jobId', async function (req, res, next) {
    try {
        const jobId = req.params.jobId; 

        const apiResponse = await axios.get(`/jobs/${jobId}`);

        if (apiResponse.status !== 200) {
            return res.redirect('/signin');
        }

        const job = apiResponse.data[0];
        console.log(job);
        res.render('jobDetails', {
            title: 'Job Details',
            job: job
        });
    } catch (error) {
        console.log("Error:", error);
        res.redirect('/signin');
    }
});

router.post('/:jobId', upload.fields([{ name: 'presentationLetter', maxCount: 1 }, { name: 'curriculum', maxCount: 1 }]), async (req, res) => {
    try {
        const jobId = req.params.jobId;
        let userCookie = JSON.parse(req.cookies.authenticationString);
        const presentationLetterFile = req.files.presentationLetter ? req.files.presentationLetter[0] : null;
        const curriculumFile = req.files.curriculum ? req.files.curriculum[0] : null;

        if (!presentationLetterFile || !curriculumFile) {
            throw new Error("Both files must be provided.");
        }

        const candidateDocumentData = {
            candidateId: userCookie.id,
            presentationLetter: presentationLetterFile.buffer,
            curriculum: curriculumFile.buffer,
            dateCreated: new Date()
        };

        const apiResponseCandidateDocuments = await axios.post('/candidateDocuments', candidateDocumentData);
        if (apiResponseCandidateDocuments.status !== 200) {
            throw new Error("Failed to create candidate documents.");
        } else {
            const jobsCandidates = {
                jobId: jobId,
                candidateId: userCookie.id,
                candidateDocumentId: apiResponseCandidateDocuments.data._id,
                dateCreated: new Date(),
                createdBy: userCookie.id
            };

            const apiResponseJobsCandidates = await axios.post('/jobscandidates', jobsCandidates);

            if (apiResponseJobsCandidates.status !== 200) {
                throw new Error("Failed to create jobs candidate.");
            }
        }

        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.render('jobDetails', {
            error: 'An error occurred while updating jobDetails'
        });
    }
});


router.put('/', upload.single('avatar'), async (req, res) => {
    try {
        let userCookie = JSON.parse(req.cookies.authenticationString);
        const file = req.file;
        let updatedUser;

        if (!file) {
            updatedUser = {
                primaryEmail: req.body.email
            };
        } else {
            updatedUser = {
                primaryEmail: req.body.email,
                avatar: file.buffer
            };
        }

        const apiResponse = await axios.put('/users/' + userCookie.id, updatedUser);

        console.log(apiResponse.status);
        /* if (apiResponse.status == 200) { */
        res.redirect('/');
        /* } else {
            res.render('account', {
                title: 'Account',
                authenticated: false,
                error: 'An error occurred while updating user data'
            });
        } */

    } catch (error) {
        console.log(error);
        res.render('account', {
            title: 'Account',
            authenticated: false,
            error: 'An error occurred while updating user data'
        });
    }
});

module.exports = router;