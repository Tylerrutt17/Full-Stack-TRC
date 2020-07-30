const src = require("./config.js");
const express = require("express");
const f = require("./calls");
const app = express();
const pgp = require('pg-promise')();
const db = pgp(src.dbConn)


let user = {
  id: 3,
  name: 'demo2',
  username: 'Jeremy Wade',
  favorite_foods: 'broccoli, carrots',
  zipcode: '69420',
  password: '$2y$10$2Xq4WT4fHapnlje5tLmmlePsw9YfNARyxUgYKv.mfGGXKVJ38gmSK',
  email: null
}

require("./api-routes")(app); //sets the api

db.any(`SELECT * FROM  users WHERE username = '${user.username}'`).then(data =>{
  console.log(data)
})

app.use(express.static("public"));

const port = 5434;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

f;
