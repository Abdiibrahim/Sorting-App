var sqlite3 = require('sqlite3').verbose() // import sqlite3

const DBSOURCE = "sqlite.db"; // db file location

// create db connection
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to SQlite database.');
});

// export db
module.exports = db;
