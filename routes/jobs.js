var express = require('express');
var router = express.Router();
const axios = require('axios'); 

router.get('/', async function (req, res, next) {
    try {
        const apiResponse = await axios.get('/jobs');

        if (apiResponse.status !== 200) {
            return res.redirect('/signin');
        } 

        const jobList = apiResponse.data;

        res.render('jobs', {
            title: 'Jobs',
            jobs: jobList
        });
    } catch (error) {
        console.log("Error:", error);
        res.redirect('/signin');
    }
});

module.exports = router;