const express = require('express')
const app = express()
const port = 3000
const testData = require('./lib/data.js');

// Import Routes
const baseRouter = require('./routes/base');
const playerRouter = require('./routes/player');

// Cookie
const cookieParser = require('cookie-parser');
const { getPeopleData } = require('./lib/data.js');
app.use(cookieParser("My Website Cookie!"));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Get public Images
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/',  (req, res) => {
    res.type('text/plain');
    res.send('Champins League History');
});

app.get('/about',  (req, res) => {
    res.render('about', { playerRouter: getPeopleData});
});

app.get('/contact',  (req, res) => {
    res.type('text/plain');
    res.send('Contact Information for our website');
});
app.get('/personlist', (req,res) =>
    res.render('personlist', { personlist: data }))

app.get('/',  (req, res) => {
    res.cookie ('tracking', true);
    res.render('home');
});
    
var data = {"messi" : { "name": "messi",
         "dob": "24/06/1987",
         "goals": "696",
         "Clubs": ["Barcelona", "La Liga", "Argentina"],
        "imageurl": "/images/messiimage1.jpg"},

"ronaldo" : { "name:": "ronaldo",
        "dob": "05/02/1985",
        "goals": "760",
        "Clubs": ["Juventus", "Serie A", "Portugal"],
       "imageurl": "/images/ronaldoimage1.jpg"},

"neymar" : { "name": "neymar",
       "dob": "05/02/1992",
       "goals": "269",
       "Clubs": ["PSG", "Ligue 1", "Brazil"],
      "imageurl": "/images/neymarimage1.jpg"},

"lewandowski" : { "name": "lewandowski",
        "dob": "21/08/1988",
        "goals": "445",
        "Clubs": ["Bayern Munich", "Bundesliga", "Poland"],
        "imageurl": "/images/lewandowskiimage1.jpg"},

"reus" : { "name": "reus",
        "dob": "31/05/1989",
        "goals": "204",
        "Clubs": ["Dortmund", "Bundesliga", "Germany"],
       "imageurl": "/images/reusimage1.jpg"},

"kane" : { "name": "kane",
       "dob": "28/07/1993",
       "goals": "237",
       "Clubs": ["Tottenham Hotspur", "Premier League", "England"],
      "imageurl": "/images/kaneimage1.jpg"} }

app.get('/messi', (req,res) =>
    res.render('person', {person: data.messi} ))
app.get('/ronaldo', (req,res) =>
    res.render('person', {person: data.ronaldo} ))
app.get('/neymar', (req,res) =>
    res.render('person', {person: data.neymar} ))
app.get('/lewandowski', (req,res) =>
    res.render('person', {person: data.lewandowski} ))
app.get('/reus', (req,res) =>
    res.render('person', {person: data.reus} ))
app.get('/kane', (req,res) =>
    res.render('person', {person: data.kane} ))

// Use Routes
app.use('/', baseRouter);
app.use('/player', playerRouter);

// custom 404 page
app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.get('/', (req, res) => res.send('Welcome to the Uefa Champions League Archive!'))
app.listen(port, () => console.log(`Listening on port ${port}!`))