const express = require('express');
const app = express();
require("./api-routes")(app);//sets the api
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const pgp = require('pg-promise')() // Sql
var path = require('path');
var bodyParser = require('body-parser') 
var dbfunctions = require('./dbFunctions/dbfunctions.js')
const bcrypt = require('bcrypt')
const es6Renderer = require('express-es6-template-engine');

const db = require('./config').database // Connection to Elephant SQL database   // Pg proimse

// User instance if logged in
var currentUser = [];

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

app.use(session({
    // Key that is kept secret that is going to encrypt all of the information
    secret: 'keyboard cat',
    // disable resaving of session variables if nothings changed
    resave: false,
    saveUninitialized: false
}))

const attemptLogin = (req, res, next) => {
    dbfunctions.attemptLogin(db, req.body.username, req.body.password, next)
}
const addUser = (req, res, next) => {
    dbfunctions.uploadNewUser(db, req.body.fullname, req.body.email, req.body.username, req.body.foods, req.body.zipcode, req.body.password, next)
}

app.get('/', checkAuthenticated, (req, res) => {
    //res.render('index.ejs', { name: req.user.name, id: req.user.id })
    console.log('Loading Index')
    res.sendFile(path.join(__dirname + '/public/home.html'));
})
  
// Can't go to the login page if not authenticated
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/login.html'));
})

const setUser = async (req, res, next)=> {
    db.one(`SELECT * FROM users WHERE username = '${req.body.username.toLowerCase()}'`)
    .then(user=> {
        // Add user to users array
        currentUser[0] = user
        next()
    })
    .catch(err=>console.log('ERROR '+ err));
         
}

app.post('/attemptlogin', attemptLogin, setUser, (req, res) => {
    res.redirect('/')
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
    //res.sendfile('./main.html');
})

app.post('/registernewuser', addUser, async (req, res) => {
    // Name is used in the initiation of fields in each view, ID of sorts
    res.redirect('/login')
})

app.delete('/logout', (req, res) => {
    console.log('Logged Out')
    currentUser = []
    currentUser.length = 0
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (!currentUser || !currentUser.length) {
        console.log('checkauth1 '+ currentUser + " " + currentUser.length)
        return res.redirect('/login')
    }
    console.log('There is not a user')
    next()
}

function checkNotAuthenticated(req, res, next) { 
    if (currentUser || currentUser.length) {
        return res.redirect('/')
    }
    console.log('There is a user')
    next()
    
}
  
const authenticateUser = async (email, password) => {
    console.log("authenticate user "+email.toLowerCase())

    // Process of initializing a new user
    db.one(`SELECT * FROM users WHERE username='${email.toLowerCase()}'`)
    .then(user=> {
        console.log(user.password + " aaa " + password)

        bcrypt.compare(password,user.password,(err,isMatch)=>{
        if(err)throw err;
            if (isMatch === true) {
            console.log("Correct PASSWORD! "+ user.name)
            currentUser.push(user)
            } else {
            console.log("Wrong Passcode")
            }
        })
    })
    .catch(err=>console.log('help '+err));
  }
  


const port = 5000;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})
