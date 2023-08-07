var express = require('express');
var router = express.Router();
const axios = require('axios');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async function (req, res, next) {
    try {
        let authenticated = !!req.cookies.authenticationString;
        let userCookie = JSON.parse(req.cookies.authenticationString);

        const apiResponse = await axios.get('/users/' + userCookie.id);

        if (apiResponse.status !== 200) {
            return res.redirect('/signin');
        }

        let base64Image = null;

        if (apiResponse.data.avatar) {
            const buffer = Buffer.from(apiResponse.data.avatar.data);
            base64Image = 'data:image/png;base64,' + buffer.toString('base64');
        }

        res.render('account', {
            title: 'Account',
            authenticated: authenticated,
            primaryEmail: apiResponse.data.primaryEmail,
            avatar: base64Image
        });
    } catch (error) {
        console.log("Error:", error);
        res.redirect('/signin');
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