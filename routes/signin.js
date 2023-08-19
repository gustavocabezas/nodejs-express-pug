var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function (req, res, next) {
    let authenticated = !!req.cookies.authenticationString;
    res.render('signin', { title: 'Sign In', authenticated: authenticated });
});

router.post('/', async function (req, res, next) {
    try { 
        console.log("Entro en el post");
        const apiResponse = await axios.post('/security/authenticate', {
            primaryEmail: req.body.email,
            password: req.body.password
        }); 
        console.log(apiResponse);
        if (apiResponse.status == 200) {
            const authenticationString = JSON.stringify(apiResponse.data);
            res.cookie('authenticationString', authenticationString, { httpOnly: true });
            res.redirect('/');
        } else {
            res.render('signin', {
                title: 'Sign In',
                authenticated: false,
                error: 'Incorrect email or password'
            });
        }

    } catch (error) {
        console.log(req.body.email);
        res.render('signin', {
            title: 'Sign In',
            authenticated: false,
            error: 'An error occurred while signing in'
        });
    }
});

module.exports = router;
