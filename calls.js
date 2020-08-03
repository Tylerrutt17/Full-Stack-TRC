const https = require("follow-redirects").https;
const fs = require("fs");
const src = require("./config.js");
const curUser = require('./app.js')

let options = {
  method: "GET",
  hostname: src.host,
  path: `/v3/businesses/search?location=${curUser.zipcode}`,
  headers: {
    Authorization: `Bearer ${src.bearer}`,
  },
  maxRedirects: 20,
};


const loginCall = https.request(options, function (res) {
  let chunks = [];
  let choices =[];
  

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    console.log('Trouble!!!!!!!!!!')
    let body = Buffer.concat(chunks);
    let a = body.toString();
    let firstRet = JSON.parse(a);
    let firstFinal = firstRet.businesses

    firstFinal.forEach(e =>{
      choices.push(e)
    })

  });

  res.on("error", function (error) {
    console.error(error);
  });

});

let openNow = false; //HTML ELEMENT HERE
let wantDel = false //HTML ELEMENT HERE

let price = 3; //HTML CONNECTION HERE
let pArr = Array.from({length: price}, (_, index) => index + 1);
let pString = pArr.toString()
console.log(pString)



let newZip ='30274' //HTML ELEMENT HERE
let searchTerm ='burger'//HTML ELEMENT HERE
options.path = `/v3/businesses/search?location=${newZip}&term=${searchTerm}&categories=food&limit=5`
if(pString !== undefined){
  options.path += `&price=${pString}`
}
if(openNow === true){
  options.path += '&open_now=true'
}
// if(price){
//   options.path += `&price=${price}`
// }


const specifyCall = https.request(options, function (res) {
  let chunks = [];
  
  
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    let body = Buffer.concat(chunks);
    let a = body.toString();
    let searchRet = JSON.parse(a)
    let newOpts = searchRet.businesses

    console.log(searchRet)
    
    newOpts.forEach(e => {
      let choices = [];
      let doThey = e.transactions
      if(wantDel === true){
        if(doThey.indexOf('delivery') > -1){
          choices.push(e)
        }
      } else {
        choices.push(e)
      }
      console.log(choices)
    });
    
    console.log(options.path)
  });
  
  res.on("error", function (error) {
    console.error(error);
  });
  
});
module.exports = {lc : loginCall.end(), sc : specifyCall.end()}

