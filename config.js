//you can give a sample of the type of data the config needs
<<<<<<< HEAD
const database = 'postgres://dghqeslf:mNRbeXOviur1ep7cTdIZ2Gt0lzDs2UNi@ruby.db.elephantsql.com:5432/dghqeslf'

let userZip = "";

module.exports = {
    //config data objects go here
    bearer:
    "e1igrlOBCl2OLF2gvBQxvruvm8U0p1r_fyb-J6ELqw9zldWhE8YpTAHlXyXezJWxI6L-vYl5OB1mC9GvcFS_NGXlDm9RBG8hlv_7HN2wnnL5nboFkfC4-i7sOisgX3Yx",
    host: "api.yelp.com",
    mainPath: `/v3/businesses/search?location=${userZip}`,
    dbConn : "postgres://dghqeslf:mNRbeXOviur1ep7cTdIZ2Gt0lzDs2UNi@ruby.db.elephantsql.com:5432/dghqeslf",
    database: database
=======
const pgp = require('pg-promise')();
const database = pgp('postgres://dghqeslf:mNRbeXOviur1ep7cTdIZ2Gt0lzDs2UNi@ruby.db.elephantsql.com:5432/dghqeslf');

module.exports = {
    //config data objects go here
    database
>>>>>>> 5b4ecf0ef42cd608b598e94ddd9bf0fd96fae919
}