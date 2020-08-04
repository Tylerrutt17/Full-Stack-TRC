//you can give a sample of the type of data the config needs
const database =
  "postgres://dghqeslf:mNRbeXOviur1ep7cTdIZ2Gt0lzDs2UNi@ruby.db.elephantsql.com:5432/dghqeslf";

let userZip = "";

module.exports = {
  //config data objects go here
  bearer:
    "e1igrlOBCl2OLF2gvBQxvruvm8U0p1r_fyb-J6ELqw9zldWhE8YpTAHlXyXezJWxI6L-vYl5OB1mC9GvcFS_NGXlDm9RBG8hlv_7HN2wnnL5nboFkfC4-i7sOisgX3Yx",
  host: "api.yelp.com",
  mainPath: `/v3/businesses/search?location=${userZip}`,
  dbConn:
    "postgres://dghqeslf:mNRbeXOviur1ep7cTdIZ2Gt0lzDs2UNi@ruby.db.elephantsql.com:5432/dghqeslf",
  database: database,
};
