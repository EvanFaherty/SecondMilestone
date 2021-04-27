const mongoose = require('mongoose');

const Player = require('../models/player.js');

const connectionString = 'mongodb://127.0.0.1:27017/evandb'

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

Player.find((err, player) => {
    if (err) return console.error(err);

    if (player.length) return;

    new Player({
        "name": "Messi",
        "dob": "24/06/1987",
        "imageurl": "/images/messiimage1.jpg"
    }).save();

    new Player({
        "name": "Neymar",
        "dob": "05/02/1992",
        "imageurl": "/images/neymarimage1.jpg"
    }).save();

    new Player({
        "name": "Kane",
        "dob": "28/07/1993",
        "imageurl": "/images/kaneimage1.jpg"
    }).save();

    new Player({
        "name": "Reus",
        "dob": "31/05/1989",
        "imageurl": "/images/reusimage1.jpg"
    }).save();

    new Player({
        "name": "Ronaldo",
        "dob": "05/02/1985",
        "imageurl": "/images/ronaldoimage1.jpg"
    }).save();

    new Player({
        "name": "Lewandowski",
        "dob": "21/08/1988",
        "imageurl": "/images/lewandowskiimage1.jpg"
    }).save();

});

async function createPlayer (data){
    let playerDoc = new Player(data);
    await playerDoc.save()
}


async function deletePlayer (name){
    Player = await Player.findOne({name : name});
    await Player.remove();    
}

async function updatePlayer(data){
    var id = data._id;
    console.log(id);
    await Player.findByIdAndUpdate({_id: id}, {...data})
}

async function readPlayer ( options = {}){
    return Player.find(options).lean();
}

module.exports = {
     readPlayer: readPlayer, 
     createPlayer: createPlayer,
     deletePlayer: deletePlayer,
     updatePlayer: updatePlayer
}