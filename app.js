const express = require('express');
const app = express();
require("./api-routes")(app);//sets the api

app.use(express.static("public"));


const port = 5434;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})