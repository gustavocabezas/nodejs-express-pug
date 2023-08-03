var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function (req, res, next) {
    try {

        console.log(req.session);

        const apiResponse = await axios.get('/users/' + req.session.data.id);

        if (apiResponse.status === 200) {
            res.render('account', {
                title: 'Account',
                authenticated: req.session.authenticated,
                primaryEmail: req.session.data.primaryEmail,
                avatar: apiResponse.data.avatar ? 'data:image/png;base64,' + apiResponse.data.avatar.toString('base64') : null
            });
        } else {
            res.render('account', {
                title: 'Account',
                authenticated: false,
                primaryEmail: req.session.data.primaryEmail,
                error: 'An error occurred while fetching user data'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('account', {
            title: 'Account',
            authenticated: false,
            error: 'An error occurred while fetching user data'
        });
    }
});

router.post('/', async function (req, res, next) {
    try {
        let avatar = null;

        if (req.body.avatar) {
            try {
                avatar = Buffer.from(req.body.avatar.split(",")[1], 'base64');
            } catch (error) {
                console.log('Failed to process avatar data:', error);
            }
        }

        const updatedUser = {
            primaryEmail: req.body.email,
            avatar: avatar
        };

        const apiResponse = await axios.put('/users/' + req.session.data.id, updatedUser);

        console.log(apiResponse);

        if (apiResponse.status === 200) {
            res.redirect('/signin');
        } else {
            res.render('account', {
                title: 'Account',
                authenticated: false,
                error: 'An error occurred while updating user data'
            });
        }

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