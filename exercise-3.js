var mysql = require('mysql');
var color = require('colors');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});


var query = `
SELECT
  Account.id AS accountId,
  Account.email AS accountEmail,
  AddressBook.id AS addressbookId,
  AddressBook.name AS addressbookName
FROM Account
JOIN AddressBook on Account.id = AddressBook.accountId`;

connection.query(query, function(err, result){
  if(err) {
    console.log('There is an error!');
  }
  else {
    var accounts = [];
    result.forEach(function(row) {
      var account = accounts.find(function(account) {
        return account.accountId === row.accountId;
      });
      
      if(!account) {
        account = {
          accountId: row.accountId,
          accountEmail: row.accountEmail,
          addressbooks: []
        };
        accounts.push(account);
      }
      
      var addressBook = account.addressbooks.find(function(addressbook) {
        return addressbook.addressbookId === row.addressbookId;
      });
      
      if(!addressBook) {
        addressBook = {
          name: row.addressbookName
        };
        account.addressbooks.push(addressBook);
      }
      
    });
    accounts.forEach(function(account){
      console.log(('#' + account.accountId + ' ').bold.green + account.accountEmail.bold.blue);
      for(var i = 0; i < account.addressbooks.length; i++) {
        console.log('   (' + (i+1) + ') ' + account.addressbooks[i].name);
      }
    });
  }
  connection.end();
});