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

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    let body = Buffer.concat(chunks);
    let returns = body.toString();
    console.log(returns)
  });

  res.on("error", function (error) {
    console.error(error);
  });
  // console.log(chunks);
});

module.exoprts = loginCall.end()
// loginCall.end();
