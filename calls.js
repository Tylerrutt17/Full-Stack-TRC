const https = require("follow-redirects").https;
const fs = require("fs");


let options = {
  method: "GET",
  hostname: host,
  path: path,
  headers: {
    Authorization:
      `Bearer ${bearer}`,
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
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

loginCall.end();

exports.loginCall = loginCall;
