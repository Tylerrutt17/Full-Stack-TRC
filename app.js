const express = require('express');
const app = express();
require("./api-routes")(app);//sets the api

app.use(express.static("public"));
app.use(express.static("dbFunctions"));


const port = 5000;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})