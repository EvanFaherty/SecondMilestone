const mongoose = require('mongoose');

const Staff = require('../models/player.js');

const connectionString = 'mongodb://127.0.0.1:27017/ssdemo'

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    'useCreateIndex': true
}).
    catch(error => {
        console.log('Database connection refused' + error);
        process.exit(2);
    })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});

Staff.find((err, staff) => {
    if (err) return console.error(err);

    if (staff.length) return;

    new Staff({
        "name": "Messi",
        "dob": "24/06/1987",
        "imageurl": "/images/messiimage1.jpg"
    }).save();

    new Staff({
        "name": "Neymar",
        "dob": "05/02/1992",
        "imageurl": "/images/neymarimage1.jpg"
    }).save();

    new Staff({
        "name": "Kane",
        "dob": "28/07/1993",
        "imageurl": "/images/kaneimage1.jpg"
    }).save();

});

async function createStaff (data){
    let staffDoc = new Staff(data);
    await staffDoc.save()
}


async function deleteStaff (name){
    staff = await Staff.findOne({name : name});
    await staff.remove();    
}

async function updateStaff(data){
    var id = data._id;
    console.log(id);
    await Staff.findByIdAndUpdate({_id: id}, {...data})
}

async function readStaff ( options = {}){

 //lean returns a json object rather than a mongoose document.
    return Staff.find(options).lean();
}

module.exports = {
     readStaff: readStaff, 
     createStaff: createStaff,
     deleteStaff: deleteStaff,
     updateStaff: updateStaff
}