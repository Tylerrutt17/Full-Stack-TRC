const bcrypt = require('bcrypt')

const uploadNewUser = (db, name, username, favorite_foods, zipcode, rawpassword, callback)=>{
    // Hashes the raw password using bcrypt.
    const hashedPassword = await bcrypt.hash(rawpassword, 10)

    // Username is unique

    db.none(`INSERT INTO users (name, username, favorite_foods, zipcode, password) VALUES ('${name}', '${username}', '${favorite_foods}', '${zipcode}', '${hashedPassword}')`)
    .then(()=>{
        console.log("Successfully created and instantiated user into the DB!")
        callback()
    })
    .catch(() => console.log("Error Uploading User To DB. :("))
}

const loadUser = (db, username) => {
    db.one(`SELECT * FROM users WHERE username = '${username}'`)
    .then(user =>{
        console.log('loaded')
        return user
    })
    .catch(err=>console.log("Error finding that user...", err))
}



module.exports = {
    uploadNewUser, loadUser
}