const express = require('express');
const router = express.Router();
// import the data we need
const testData = require('../lib/db.js');
router.get('/', async (req, res) => {
    const data = await testData.readPlayer();
    console.table(data);

    res.render('personlist', { personlist: data })
}

);

router.get('/addnew', (req, res) => {
    res.render('personform')
}
)

router.post('/addnew', (req, res) => {
    
    console.log("Data received from a  post");
    console.table(req.body);

    testData.createPlayer(req.body)
        .then(() => {
            req.session.flash =
                { type: 'success', intro: 'Data Saved:', message: "Data for <strong>" + req.body.name + "</strong> has been added" }
            res.redirect(303, '/player')
        }
        )
        .catch(() => {
            req.session.flash =
                { type: 'danger', intro: 'Data not saved:', message: "Data for <strong>" + req.body.name + "</strong> has not been added" }
            res.redirect(303, '/player')
        }
        )
    })

    router.get('/player', (req, res) => {
        if (req.session.Playerdata) {
            var newName = req.session.Playerdata.name;
        }
        else {
            var newName = "";
        }
        res.render('player', { name: newName })
    })
       
router.get('/:name', async (req, res) => {
    var name = req.params.name;
    var data = await testData.readPlayer({ name: name });
    if (!data[0]) {
        res.render('404'); 
    }
    else {
        res.render('person', { person: data[0] })
    }
})
router.get('/:name/edit', async (req, res) => {
    var name = req.params.name;
    var data = await testData.readPlayer({ name: name });
    res.render('personform', { person: data[0] })


})
router.get('/:name/delete', async (req, res) => {
    var name = req.params.name;
    await testData.deletePlayer(name)
        .then(() => {
            req.session.flash =
                { type: 'success', intro: 'Data Removed:', message: "<strong>" + name + "</strong> has been removed" }
            res.redirect('/Player')
        })
        .catch(() => {
            req.session.flash =
                { type: 'danger', intro: 'Data not Removed:', message: "<strong>" + name + "</strong> has not been removed" }
            res.redirect('/Player')
        });
});
router.post('/:name/edit', async (req, res) => {
    console.log("Data received from a Edit post");
    console.table(req.body);
    testData.updatePlayer(req.body)
        .then(() => {
            req.session.flash =
                { type: 'success', intro: 'Data Edited:', message: "Data for <strong>" + req.body.name + "</strong> has been edited" }
            res.redirect(303, '/player')
        })
        .catch(() => {
            req.session.flash =
                { type: 'danger', intro: 'Data not Edited:', message: "Editing failed" }
            res.redirect('/Player')
        });
})
module.exports = router;