const express = require('express');
const router = express.Router();

// Import Data
const testData = require('../lib/data.js');
console.table(testData.getPeopleData());

router.get('/', (req, res) =>
    res.render('personlist', { personlist: testData.getPeopleData() }));

    //Sessions
    router.get('/addnew', (req, res) =>
    res.render('personform'))

    router.get('/addnew', (req, res) => {
        let fname = req.query.firstname;
        let sname = req.query.surname;
        console.log('Date entered ' + fname + ' ' + sname);
        let data = {}
    
        res.render('personform', {firstname: fname, surname: sname})  
    })

    router.get('/personadded', (req, res) =>
    res.render('personadded'))

    router.post('/addnew', (req, res) => {
        console.log("Data received from a  post");
        console.table(req.body);
        req.session.flash = 
        { type: 'success', intro: 'Data Saved:', message:  "Data for <strong>" + req.body.firstname + " " + req.body.surname + "</strong> has been added"}
        res.redirect(303, '/player/personadded')
    })
    router.get('/personadded', (req, res) => {

        if (req.session.peopledata) {
            var newName = req.session.peopledata.name;
        }
        else {
            var newName = "";
        }
        res.render('personadded', { name: newName })
    })
    
    router.get('/:name',  (req, res) => {

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