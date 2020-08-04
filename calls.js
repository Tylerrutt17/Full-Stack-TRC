const https = require("follow-redirects").https;
const fs = require("fs");
const src = require("./config.js");
const pgp = require('pg-promise')();
//const db = pgp(src.database) // Connection to Elephant SQL database   // Pg proimse
const curUser = require('./app.js')
const fetch = require("node-fetch");

// let options = {
//   method: "GET",
//   hostname: src.host,
//   path: `/v3/businesses/search?location=30269`,
//   headers: {
//     Authorization: `Bearer ${src.bearer}`,
//   },
//   maxRedirects: 20,
// };

// fetch('https://covidtracking.com/api/states') 
//     .then(function(resp) { return resp.json() }) // Convert data to json
//      .then(function(data) {
     
//     console.log("dataaa", data)
//     })
var raw = "";

var requestOptions = {
  method: 'GET',
  headers: {
    Authorization: `Bearer e1igrlOBCl2OLF2gvBQxvruvm8U0p1r_fyb-J6ELqw9zldWhE8YpTAHlXyXezJWxI6L-vYl5OB1mC9GvcFS_NGXlDm9RBG8hlv_7HN2wnnL5nboFkfC4-i7sOisgX3Yx`,
  },
  //body: raw,
  redirect: 'follow',
};

const fetchBusinesses = (foodtype, callback) => {
  fetch(`https://api.yelp.com/v3/businesses/search?location=30269&term=${foodtype}&categories=food&limit=3`, requestOptions)
  .then(data => data.json())
  .then(result => {
    callback(result)
  })
  .catch(error => console.log('error', error));
}



//fetchBusinesses(testCallback)



let choices =[];



  // const request2 = http.request(options, function (error, response) {
  //   if (error) throw new Error(error);
  //   console.log(response.body);
  // });

  // fetch('https://api.yelp.com/v3/businesses/search?location=30274&term=burger&categories=food&limit=5')
  // .then(response => response.json())
  // .then(data => console.log(data));
  




// const loginCall = https.request(options, function (res) {
//   let chunks = [];
  
//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function (chunk) {
//     let body = Buffer.concat(chunks);
//     let a = body.toString();
//     let firstRet = JSON.parse(a);
//     let firstFinal = firstRet.businesses
    
//     let topThree = []
//     for (i = 0; i < 3; i++) {
//       var topRandom = firstFinal[Math.floor(Math.random() * Math.floor(firstFinal.length))]
//       topThree.push(topRandom)
//     } 
//     //callback(topThree)

//     firstFinal.forEach(e =>{choices.push(e)})
//   });

//   res.on("error", function (error) {
//     console.error(error);
//   });
//   //return
// });

// console.log("Running Calls", loginCall.end())


// let openNow = false; //HTML ELEMENT HERE
// let wantDel = false //HTML ELEMENT HERE

// let price = 3; //HTML CONNECTION HERE
// let pArr = Array.from({length: price}, (_, index) => index + 1);
// let pString = pArr.toString()
// //console.log(pString)



// let newZip ='30274' //HTML ELEMENT HERE
// let searchTerm ='burger'//HTML ELEMENT HERE
// options.path = `/v3/businesses/search?location=${newZip}&term=${searchTerm}&categories=food&limit=5`
// if(pString !== undefined){
//   options.path += `&price=${pString}`
// }
// if(openNow === true){
//   options.path += '&open_now=true'
// }
// // if(price){
// //   options.path += `&price=${price}`
// // }


// const specifyCall = https.request(options, function (res) {
//   let chunks = [];
  
//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function (chunk) {
//     let body = Buffer.concat(chunks);
//     let a = body.toString();
//     let searchRet = JSON.parse(a)
//     let newOpts = searchRet.businesses

//     let first = newOpts[0].id
//     //console.log(first)

//     //console.log(searchRet)
    
//     newOpts.forEach(e => {
//       let choice = [];
//       let doThey = e.transactions
//       if(wantDel === true){
//         if(doThey.indexOf('delivery') > -1){
//           choices.push(e)
//         }
//       } else {
//         choices.push(e)
//       }
//       //console.log(choices)
//     });
    
//     //console.log(options.path)
//   });
  
//   res.on("error", function (error) {
//     console.error(error);
//   });
  
// });
// loginCall.end()
module.exports = {
  fetchBusinesses:fetchBusinesses
}
// module.exports = {lc : loginCall, sc : specifyCall, choices : choices}

