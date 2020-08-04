const https = require("follow-redirects").https;
const fs = require("fs");
const src = require("./config.js");
const pgp = require("pg-promise")();
const curUser = require("./app.js");
const fetch = require("node-fetch");


var requestOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer e1igrlOBCl2OLF2gvBQxvruvm8U0p1r_fyb-J6ELqw9zldWhE8YpTAHlXyXezJWxI6L-vYl5OB1mC9GvcFS_NGXlDm9RBG8hlv_7HN2wnnL5nboFkfC4-i7sOisgX3Yx`,
  },
  //body: raw,
  redirect: "follow",
};

const fetchBusinesses = (callback) => {
  var foodtype = "burger"
  fetch(`https://api.yelp.com/v3/businesses/search?location=30269&term=${foodtype}&categories=food&limit=3`, requestOptions)
  .then(data => data.json())
  .then(result => {
    callback(result)
  })
  .catch(error => console.log('error', error));
}

module.exports = {
  fetchBusinesses:fetchBusinesses
}


const searchBusinesses = (foodtype, callback) => {
  fetch(
    `https://api.yelp.com/v3/businesses/search?location=30269&term=${foodtype}&categories=food&limit=3`,
    requestOptions
  )
    .then((data) => data.json())
    .then((result) => {
      callback(result);
    })
    .catch((error) => console.log("error", error));
};