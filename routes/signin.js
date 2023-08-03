var express = require('express');
var router = express.Router();
const axios = require('axios'); 

router.get('/', function (req, res, next) {
    res.render('signin', { title: 'Sign In', authenticated: req.session.authenticated });
});

router.post('/', async function (req, res, next) {
    try { 
        const apiResponse = await axios.post('/security/authenticate', {
            primaryEmail: req.body.email,
            password: req.body.password
        }); 

        if (apiResponse.status = 200) {
            req.session.authenticated = true;
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
