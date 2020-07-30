const express = require('express');
const app = express();
require("./api-routes")(app);//sets the api
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const pgp = require('pg-promise')() // Sql
var path = require('path');
var bodyParser = require('body-parser') 
var dbfunctions = require('./dbFunctions/dbfunctions.js')
//var initialize = require('./passport-config.js')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const es6Renderer = require('express-es6-template-engine');

app.use(flash())
app.use(express.static("dbFunctions"));
// Static Files
app.use(express.static(__dirname + 'public'));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Whenever html is called, it is going to run everything through this template instead
app.engine('html', es6Renderer)

// Tells the renderer where the views are going to be  views are in templates
app.set('views', "templates")
app.set('view engine', 'html')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var currentUser = [];

initialize(
    passport,
    email => currentUser[0].username, //users.find(user => user.email === email),
    id => currentUser[0].id,//users.find(user => user.id === id)
)

// Connection to Elephant SQL database   // Pg proimse
//


app.use(session({
    // Key that is kept secret that is going to encrypt all of the information
    secret: 'keyboard cat',
    // disable resaving of session variables if nothings changed
    resave: false,
    saveUninitialized: false
}))

const attemptLogin = (req, res, next) => {
    dbfunctions.attemptLogin(db, req.body.username, req.body.password, passport, next)
}
const addUser = (req, res, next) => {
    dbfunctions.uploadNewUser(db, req.body.fullname, req.body.email, req.body.username, req.body.password, req.body.zipcode, req.body.foods)
}


app.get('/', checkAuthenticated, (req, res) => {
    //res.render('index.ejs', { name: req.user.name, id: req.user.id })
    console.log('get index')
    res.render("index", {name: req.user.username})
})
  
// Can't go to the login page if not authenticated
app.get('/login', checkNotAuthenticated, (req, res) => {
    console.log('get login')
    res.sendFile(path.join(__dirname + '/public/login.html'));
})

const setUser = async (req, res, next)=> {
    console.log("USERNAEEMe "+req.body.username.toLowerCase())
    db.one(`SELECT * FROM users WHERE username = '${req.body.username.toLowerCase()}'`)
    .then(user=> {
        // Add user to users array
        console.log('current user '+user.name)
        currentUser.push(user)
        //res.locals.user = user
        next()
    })
    .catch(err=>console.log('ERROR ERROR ERROR'));
         
}

app.post('/login', setUser, passport.authenticate('local',{
    // where does it go when there is a success
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
  
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
    //res.sendfile('./main.html');
})

app.post('/register', checkNotAuthenticated, addUser, async (req, res) => {
    // Name is used in the initiation of fields in each view, ID of sorts
    res.redirect('/')
})

app.delete('/logout', (req, res) => {
    req.logOut()
    console.log('Logged Out')
    currentUser = []
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}
  
  
  function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {

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
                return done(null, user)
              } else {
                console.log("Wrong Passcode")
                return done(null, false, { message: 'Password incorrect' })
              }
          })
        
         })
         .catch(err=>console.log('help '+err));
    
        }
        passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
        passport.serializeUser((user, done) => done(null, user.id))
        passport.deserializeUser((id, done) => {
            console.log('deserialize')
        return done(null, getUserById(id))
        })
    
  }

    // passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    // passport.serializeUser((user, done) => done(null, user.id))
    // passport.deserializeUser((id, done) => {
    //   return done(null, getUserById(id))
    // })
  


const port = 5000;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})
