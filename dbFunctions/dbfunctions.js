const bcrypt = require('bcrypt')
const pgp = require('pg-promise')()

const uploadNewUser = async (db, name, email, username, favorite_foods, zipcode, rawpassword, callback)=>{
    // Hashes the raw password using bcrypt.
    const hashedPassword = await bcrypt.hash(rawpassword, 10)

    // Username is unique, will error out if it conflicts with a previous username
    db.none(`INSERT INTO users (name, username, email, favorite_foods, zipcode, password) VALUES ('${name}', '${username.toLowerCase()}', '${email}', '${favorite_foods}', '${zipcode}', '${hashedPassword}')`)
    .then((log)=>{
        console.log("Successfully created and instantiated user into the DB! "+log)
        callback()
    })
    //.catch(() => console.log("Error Uploading User To DB. :("))
}

//uploadNewUser(db, 'test name', 'testuser1', 'grass, flowers', '30243', '123456', callback)

// Based on a users username you can load that specific users information
const loadUser = async (db, username, callback) => {
    db.one(`SELECT * FROM users WHERE username = '${username.toLowerCase()}'`)
    .then(user =>{
        console.log(`loaded user ${user.name}`)
        return user
    })
    .catch(err=>console.log("Error finding that user...", err))
}

const attemptLogin = async (db, username, password, callback)=> {
    db.one(`SELECT * FROM users WHERE username='${username.toLowerCase()}'`)
    .then((user)=> {
        console.log(user.favorite_foods)
        // compares the users entered password to the password to the user in the database if a user with that username exists
        bcrypt.compare(password, user.password,(err,isMatch)=>{
          if(err)throw err;
            if (isMatch === true) {
              console.log("Correct PASSWORD! "+ user.name)
              callback()
            } else {
              console.log("Wrong Passcode")
            }
        }) 
    })
    .catch(err=> {
        console.log("Error finding user with that username "+err)
        
    })
}


//attemptLogin(db, 'testuser', '123456')

module.exports = {
    uploadNewUser, loadUser, attemptLogin
}