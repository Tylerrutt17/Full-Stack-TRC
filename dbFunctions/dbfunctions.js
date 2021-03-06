const bcrypt = require("bcrypt");
const pgp = require("pg-promise")();

const uploadNewUser = async (db,name,email,username,favorite_foods,zipcode,rawpassword,callback) => {
  // Hashes the raw password using bcrypt.
  const hashedPassword = await bcrypt.hash(rawpassword, 10);

  // Username is unique, will error out if it conflicts with a previous username
  db.none(
    `INSERT INTO users (name, username, email, favorite_foods, zipcode, password) VALUES ('${name}', '${username.toLowerCase()}', '${email}', '${favorite_foods}', '${zipcode}', '${hashedPassword}')`
  ).then((log) => {
    console.log(
      "Successfully created and instantiated user into the DB! " + log
    );
    callback();
  });
};

// Based on a users username you can load that specific users information
const loadUser = (db, username, callback) => {
  console.log("Loading User NOw!!");
  db.one(`SELECT * FROM users WHERE username = '${username.toLowerCase()}'`)
    .then((user) => {
      console.log(`loaded user ${user.name}`);
      callback(user);
      return;
    })
    .catch((err) => console.log("Error finding that user...", err));
};

const savePreference = (db, foodType, restaurantId, userId) => {
    console.log("Saving Preferences Now", foodType, restaurantId, userId)
    db.none(`INSERT INTO user_preferences (userid, food_category, restaurant_id) VALUES ('${userId}', '${foodType}', '${restaurantId}')`)
    .then((log)=>{
        console.log("Successfully added a user preference "+log)
        
        //callback()
    })
}
const checkPreferenceState = (db, restaurantId) => {
  db.one(`SELECT * FROM user WHERE restaurant_id = '${restaurantId}'`)
  .then((checkmark) => {
    console.log(`loaded bookmark ${checkmark.userid}`);
    callback(true);
    return;
  })
  .catch((err) => {
    callback(false);
    return;
  });
}

const attemptLogin = async (db, username, password, callback) => {
  console.log("To Lowercase " + username.toLowerCase(), password);
  db.one(`SELECT * FROM users WHERE username = '${username.toLowerCase()}'`)
    .then((user) => { 
      console.log(user.favorite_foods);
      // compares the users entered password to the password to the user in the database if a user with that username exists
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch === true) {
          console.log("Correct PASSWORD! " + user.name);
          callback();
          //return
        } else {
          console.log("Wrong Passcode");
          //return
        }
      });
    })
    .catch((err) =>
      console.log("Error finding user with that username " + err)
    );
};


module.exports = {
  uploadNewUser,
  loadUser,
  attemptLogin,
  savePreference,
};
