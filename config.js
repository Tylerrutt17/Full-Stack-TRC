//you can give a sample of the type of data the config needs
const pgp = require('pg-promise')();
const database = pgp('postgres://dghqeslf:mNRbeXOviur1ep7cTdIZ2Gt0lzDs2UNi@ruby.db.elephantsql.com:5432/dghqeslf');

module.exports = {
    //config data objects go here
    database
}