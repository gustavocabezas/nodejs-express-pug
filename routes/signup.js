var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function (req, res, next) {
    res.render('signup', { title: 'Sign Up', authenticated: req.session.authenticated });
});

router.post('/', async function (req, res, next) {
    try {
        const apiResponse = await axios.post('/users', {
            primaryEmail: req.body.email,
            password: req.body.password
        });

        console.log(apiResponse);
        if (apiResponse.status = 200) {
            res.redirect('/signin');
        } else {
            res.render('signup', {
                title: 'Sign Up',
                authenticated: false,
                error: 'An error occurred'
            });
        }

    } catch (error) {
        console.log(error);
        res.render('signup', {
            title: 'Sign Up',
            authenticated: false,
            error: 'An error occurred'
        });
    }
});

module.exports = router;