const pgp = require('pg-promise')();
const db = pgp('postgres://refrxuce:ROqL7x5m8aoDKNG5BewWMJ2sJWSOJcru@ruby.db.elephantsql.com:5432/refrxuce');
const dbfunctions = require('dbfunctions.js');

let hi = dbfunctions.loadUser(db, 'Jeremy Wade')

function myfunction() {
    //let name = document.getElementById
}