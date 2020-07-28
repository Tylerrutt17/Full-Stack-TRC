const express = require('express');
const { loginCall } = require('./calls');
const app = express();
require("./api-routes")(app);//sets the api

// const apiKey = "e1igrlOBCl2OLF2gvBQxvruvm8U0p1r_fyb-J6ELqw9zldWhE8YpTAHlXyXezJWxI6L-vYl5OB1mC9GvcFS_NGXlDm9RBG8hlv_7HN2wnnL5nboFkfC4-i7sOisgX3Yx"
// const https = require('https');
// const options = 


app.use(express.static("public"));


const port = 5434;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})


// loginCall()