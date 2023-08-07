var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    for (let cookie in req.cookies) {
        res.clearCookie(cookie);
    } 
    res.redirect('/');
});


module.exports = router;