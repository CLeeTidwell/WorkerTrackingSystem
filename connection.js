const mysql = require('mysql2');

const db = mysql.createConnection(
    {
     host: 'localhost',
     user: 'root',
     password: 'Kirin@1988',
     database: 'wts_db'
    }
);

db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('\nConnection Success!');
}});

module.exports = db;