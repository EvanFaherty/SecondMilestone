const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {

    var message = "";
    if (req.cookies.tracking){

        var message = "Welcome back user!";
    }
    res.cookie ('tracking', true);
    res.render('home', {'message': message});
});


router.get('/about',  (req, res) => {

    
    res.render('about');
});

router.get('/contact',  (req, res) => {
    res.render('contact');
});

router.get('/icons',  (req, res) => {
    res.render('icons');
});

router.get('/player/personlist',  (req, res) => {
    res.render('personlist');
});
module.exports = router;