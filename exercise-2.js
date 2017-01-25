var mysql = require('mysql');
var color = require('colors');
var mysqlPromise = require('mysql-promise')();

// CALLBACK VERSION - uncomment code below to use it, comment it out to not use it
// var connection = mysql.createConnection({
//   host     : process.env.IP,
//   user     : process.env.C9_USER,
//   password : '',
//   database : 'addressbook'
// });

// connection.query("SELECT * FROM Account LIMIT 5", function(err, rows, fields) {
//   rows.forEach(function(row) {
//     console.log(('#' + row.id + ': ').bold.blue + row.email);
//   });
//   connection.end();
// });
// END OF CALLBACK VERSION


//PROMISE VERSION - uncomment code below to use it, comment it out to not use it
mysqlPromise.configure({
	"host": process.env.IP,
	"user": process.env.C9_USER,
	"password": '',
	"database": "addressbook"
});

function fetchAccount() {
    return mysqlPromise.query("SELECT * FROM Account LIMIT 5");
}

fetchAccount()
.then(function(result){
    result[0].forEach(function(results,i){
        console.log(('#' + results.id + ': ').bold.blue + results.email);
    });
    mysqlPromise.end();
})
.catch(function(err){
    console.log(err);
    mysqlPromise.end();
});
// END OF PROMISE VERSION