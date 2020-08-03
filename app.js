const src = require("./config.js");
const express = require("express");
const calls = require("./calls");
const app = express();
const pgp = require('pg-promise')();
const db = pgp(src.database) // Connection to Elephant SQL database   // Pg proimse
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var path = require('path');
var bodyParser = require('body-parser') 
var dbfunctions = require('./dbFunctions/dbfunctions.js')

// User instance if logged in
var currentUser = [];

app.use(flash())
app.use(express.static("dbFunctions"));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.use(express.static(__dirname + '/styles')); // Static Files
app.use(express.static(__dirname + '/styles/images')); // For loading image Files
app.use(express.static(__dirname + 'templates')); // Static Files


app.use(session({
    // Key that is kept secret that is going to encrypt all of the information
    secret: 'keyboard cat',
    // disable resaving of session variables if nothings changed
    resave: false,
    saveUninitialized: false
}))

// Uses the dbfunctions
const attemptLogin = (req, res, next) => {
    dbfunctions.attemptLogin(db, req.body.username, req.body.password, next)
}
// Uses the dbfunctions
const addUser = (req, res, next) => {
    dbfunctions.uploadNewUser(db, req.body.fullname, req.body.email, req.body.username, req.body.foods, req.body.zipcode, req.body.password, next)
}

const setUser = async (req, res, next)=> {
    db.one(`SELECT * FROM users WHERE username = '${req.body.username.toLowerCase()}'`)
    .then(user=> {
        currentUser[0] = user  // Set user as current user
        module.exports = user
        next()
    }).catch(err=>console.log('ERROR '+ err))    
}

app.get('/', checkAuthenticated, (req, res) => {
    //res.render('index.ejs', { name: req.user.name, id: req.user.id })
    console.log('Loading Index')

    res.sendFile(path.join(__dirname + '/templates/profile.html'));

})
  
// Can't go to the login page if not authenticated
app.get('/login',(req, res) => {
    res.sendFile(path.join(__dirname + '/templates/login.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/signup.html'));
    //res.sendfile('./main.html');
})

app.post('/registernewuser', addUser, async (req, res) => {
    // Name is used in the initiation of fields in each view, ID of sorts
    res.redirect('/login')
})

app.post('/attemptlogin', attemptLogin, setUser, (req, res) => {
    res.redirect('/')
})

app.delete('/logout', (req, res) => {
    console.log('Logged Out')
    currentUser = []
    currentUser.length = 0
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (!currentUser || !currentUser.length) {
        console.log('There is not a user')
        return res.redirect('/login')
    }
    console.log('There IS a user')
    next()
}

const port = 5000;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})

console.log("USER: ", currentUser)
//module.exports = user
