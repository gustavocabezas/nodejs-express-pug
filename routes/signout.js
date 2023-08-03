var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        } else {
            console.log("Session destroyed successfully");
            res.redirect('/');
        }
    });
});


module.exports = router;