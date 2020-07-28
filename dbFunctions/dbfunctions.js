const bcrypt = require('bcrypt')
const pgp = require('pg-promise')()

const uploadNewUser = async (db, name, username, favorite_foods, zipcode, rawpassword, callback)=>{
    // Hashes the raw password using bcrypt.
    const hashedPassword = await bcrypt.hash(rawpassword, 10)

    // Username is unique, will error out if it conflicts with a previous username
    db.none(`INSERT INTO users (name, username, favorite_foods, zipcode, password) VALUES ('${name}', '${username}', '${favorite_foods}', '${zipcode}', '${hashedPassword}')`)
    .then(()=>{
        console.log("Successfully created and instantiated user into the DB!")
        callback()
    })
    .catch(() => console.log("Error Uploading User To DB. :("))
}

// On login, load users information
const loadUser = async (db, username) => {
    db.one(`SELECT * FROM users WHERE username = '${username}'`)
    .then(user =>{
        console.log(`loaded user ${user.favorite_foods}`)
        return user
    })
    .catch(err=>console.log("Error finding that user...", err))
}

module.exports = {
    uploadNewUser, loadUser
}