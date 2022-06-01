const mysql = require('mysql2');

const join = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kirin@1988',
    database: 'wts_db'
});

join.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('\nConnection Success!');
}});

module.exports = join;