const https = require('follow-redirects').https;
const fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'api.yelp.com',
  'path': '/v3/businesses/search?location=30326',
  'headers': {
    'Authorization': 'Bearer e1igrlOBCl2OLF2gvBQxvruvm8U0p1r_fyb-J6ELqw9zldWhE8YpTAHlXyXezJWxI6L-vYl5OB1mC9GvcFS_NGXlDm9RBG8hlv_7HN2wnnL5nboFkfC4-i7sOisgX3Yx'
  },
  'maxRedirects': 20
};

const loginCall = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

loginCall.end();

exports.loginCall = loginCall;