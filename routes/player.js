const express = require('express');
const router = express.Router();

// import the data we need
const testData = require('../lib/data.js');

router.get('/', (req, res) =>
    res.render('personlist', { personlist: testData.getPeopleData() }));

// Sessions 
router.get('/addnew', (req, res) => {
    res.render('personform')})

router.get('/personadded', (req, res) => {

    if (req.session.peopleData) {
        var newName = req.session.peopleData.name;
    }
    else {
        var newName = "";
    }
    res.render('personadded', { name: newName })
})
router.post('/addnew', (req, res) => {
    console.log("Data received from a  post");
    console.table(req.body);
    req.session.flash = 
    { type: 'success', intro: 'Data Saved:', message:  "Data for <strong>" + req.body.firstname + " " + req.body.surname + "</strong> has been added"}
    res.redirect(303, '/player/personadded')
})

router.get('/:name', (req, res) => {

    var name = req.params.name;
    var data = testData.getPeopleData();

    if (data[name] == null) {
        res.render('404');
    }
    else {
        res.render('person', { person: data[name] })
    }
})

module.exports = router;