const src = require("./config.js");
const express = require("express");
const calls = require("./calls");
const app = express();
const pgp = require('pg-promise')();
<<<<<<< HEAD
const db = pgp(src.database) // Connection to Elephant SQL database   // Pg proimse
=======
const db = pgp(src.dbConn)
require("./api-routes")(app);//sets the api
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var path = require('path');
var bodyParser = require('body-parser') 
var dbfunctions = require('./dbFunctions/dbfunctions.js')
<<<<<<< HEAD
const https = require("follow-redirects").https;

app.use(flash())
app.use(express.static("dbFunctions"));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.use(express.static(__dirname + '/styles')); // Static Files
app.use(express.static(__dirname + '/styles/images')); // For loading image Files
app.use(express.static(__dirname + '/js')); // Static Files

=======
const bcrypt = require('bcrypt')
const es6Renderer = require('express-es6-template-engine');

const db = require('./config').database // Connection to Elephant SQL database   // Pg proimse

// User instance if logged in
var currentUser = [];
let user = currentUser[0];

app.use(flash())
app.use(express.static("dbFunctions"));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.engine('html', es6Renderer) // Whenever html is called, it is going to run everything through this template instead
app.set('views', "templates") // Tells the renderer where the views are going to be  views are in templates
app.set('view engine', 'html')

app.use(express.static(__dirname + 'public')); // Static Files
app.use(express.static(__dirname + '/public')); // Static Files

>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
app.use(session({
    // Key that is kept secret that is going to encrypt all of the information
    secret: 'keyboard cat',
    // disable resaving of session variables if nothings changed
    resave: false,
    saveUninitialized: false
}))

// Uses the dbfunctions
const attemptLogin = (req, res, next) => {
<<<<<<< HEAD
    dbfunctions.attemptLogin(db, req.body.username, req.body.password, next)
}

=======
    dbfunctions.attemptLogin(db, req.body.username, req.body.password, next, res)
}
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
// Uses the dbfunctions
const addUser = (req, res, next) => {
    dbfunctions.uploadNewUser(db, req.body.fullname, req.body.email, req.body.username, req.body.foods, req.body.zipcode, req.body.password, next)
}

const setUser = async (req, res, next)=> {
    db.one(`SELECT * FROM users WHERE username = '${req.body.username.toLowerCase()}'`)
    .then(user=> {
<<<<<<< HEAD
        res.user = user
        next()
    }).catch(err=>console.log('ERROR '+ err))    
=======
        currentUser[0] = user // Set user as current user
        next()
    })
    .catch(err=>console.log('ERROR '+ err))    
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
}

app.get('/', checkAuthenticated, (req, res) => {
    //res.render('index.ejs', { name: req.user.name, id: req.user.id })
    console.log('Loading Index')
<<<<<<< HEAD
    res.sendFile(path.join(__dirname + '/profile.html'));
=======
    res.sendFile(path.join(__dirname + '/public/home.html'));
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
})
  
// Can't go to the login page if not authenticated
app.get('/login',(req, res) => {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname + '/login.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/signup.html'));
=======
    res.sendFile(path.join(__dirname + '/public/login.html'));
})

app.post('/attemptlogin', attemptLogin, setUser, (req, res) => {
    res.redirect('/')
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
    //res.sendfile('./main.html');
})

app.post('/registernewuser', addUser, async (req, res) => {
    // Name is used in the initiation of fields in each view, ID of sorts
    res.redirect('/login')
})

<<<<<<< HEAD
app.post('/attemptlogin', attemptLogin, setUser, (req, res) => {
    console.log(res.user)
    res.send(res.user)
})

app.get('/me/:username', (req, res)=> {
    //calls.
    dbfunctions.loadUser(db, req.params.username, (user)=> {
        res.send(user)
    })
})

app.get('/fetchrestaurants/:ff', (req, res)=> {
    // ff is the favorite_food
    calls.fetchBusinesses(req.params.ff, result=> {
        res.send(result)
    })
})

app.delete('/logout', (req, res) => {
    console.log('Logged Out')
=======
app.delete('/logout', (req, res) => {
    console.log('Logged Out')
    currentUser = []
    currentUser.length = 0
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
<<<<<<< HEAD
=======
    if (!currentUser || !currentUser.length) {
        console.log('There is not a user')
        return res.redirect('/login')
    }
    console.log('There IS a user')
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
    next()
}

const port = 5000;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})

<<<<<<< HEAD
//module.exports = user
=======

module.exports = user
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
