var mysql = require('mysql');
var colors = require('colors');
var mysqlPromise = require('mysql-promise');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});


connection.query("SHOW DATABASES", function(err, result) {
    if(err) {
        console.log(err);
    }
    else{
        result.forEach(function(results, i) {
            console.log("Database".toUpperCase() + " " + results.Database.blue.bold);
        });
    }
    connection.end();
});