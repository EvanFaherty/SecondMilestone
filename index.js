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

app.get('/',  (req, res) => {
    res.cookie ('tracking', true);
    res.render('home');
});

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