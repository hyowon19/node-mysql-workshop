var mysql = require('mysql');
var colors = require('colors');
var mysqlPromise = require('mysql-promise')();
// const Colors = require('colors-promise');

// CALLBACK VERSION - uncomment code below to use it, comment it out to not use it
// var connection = mysql.createConnection({
//   host     : process.env.IP,
//   user     : process.env.C9_USER,
//   password : '',
//   database : 'addressbook'
// });

// function showDataBase() {
//     connection.query("SHOW DATABASES", function(err, result) {
//         if(err) {
//             console.log(err);
//         }
//         else
//         {
//             console.log("Database".toUpperCase());
//             result.forEach(function(results, i) {
//                 console.log(results.Database.blue.bold);
//             });
//         }
//         connection.end();
//     });
// }
// showDataBase();
// END OF CALLBACK VERSION


//PROMISE VERSION - uncomment code below to use it, comment it out to not use it
mysqlPromise.configure({
	"host": process.env.IP,
	"user": process.env.C9_USER,
	"password": '',
	"database": "addressbook"
});

function showDataBase() {
    return mysqlPromise.query("SHOW DATABASES");
}

showDataBase()
.then(function(result){
    console.log("Database".toUpperCase());
    result[0].forEach(function(results,i){
        console.log((results.Database).bold.blue);
    });
    mysqlPromise.end();
})
.catch(function(err){
    console.log(err);
    mysqlPromise.end();
})
// END OF PROMISE VERSION