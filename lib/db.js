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
        "goals": "696",
        "Clubs": ["Barcelona", "La Liga", "Argentina"],
        "imageurl": "/images/messiimage1.jpg"
    }).save();

    new Player({
        "name": "Neymar",
        "dob": "05/02/1992",
        "goals": "269",
        "Clubs": ["PSG", "Ligue 1", "Brazil"],
        "imageurl": "/images/neymarimage1.jpg"
    }).save();

    new Player({
        "name": "Kane",
        "dob": "28/07/1993",
        "goals": "237",
        "Clubs": ["Tottenham Hotspurs", "Premier League", "England"],
        "imageurl": "/images/kaneimage1.jpg"
    }).save();

    new Player({
        "name": "Reus",
        "dob": "31/05/1989",
        "goals": "204",
        "Clubs": ["Dortmund", "Bundesliga", "Germany"],
        "imageurl": "/images/reusimage1.jpg"
    }).save();

    new Player({
        "name": "Ronaldo",
        "dob": "05/02/1985",
        "goals": "760",
        "Clubs": ["Juventus", "Serie A", "Portugal"],
        "imageurl": "/images/ronaldoimage1.jpg"
    }).save();

    new Player({
        "name": "Lewandowski",
        "dob": "21/08/1988",
        "goals": "445",
        "Clubs": ["Bayern Munich", "Bundesliga", "Poland"],
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