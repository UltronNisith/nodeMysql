var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyparser = require('body-parser');
var host = "localhost";
var port = 3001;


var server = app.listen(port, host, function () {

    console.log(`Example app listening at http://${host}:${port}`);
  
  });

  var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root', 
   password : 'Nisith@123',
   database : 'employeeDb' 
 });
 
 connection.connect(function(err) {
   if (err) throw err
   console.log('Connection DOne....!')
 });

 
app.use( bodyparser.json() );       
app.use(bodyparser.urlencoded({     
}));

     app.get('/', function (req, res) {

       res.end('<html> <h1> Server Connection Successfull </h1> <br> "/getEmp" ;"/getEmp/:id";"/addEmp"; </html ');

 });

   app.get('/getEmp', function (req, res) {
    connection.query('SELECT * FROM emp_table', function (error, rows, fields) {
       if (error) throw error;
       res.end(JSON.stringify(rows));
     });
 });

 app.get('/getEmp/:id', function (req, res) {
    console.log(req);
    connection.query('select * from emp_table where empId = ?', [req.params.id], function (error, rows, fields) {
       if (error) throw error;
       res.end(JSON.stringify(rows));
     });
 });

 app.post('/addEmp', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO emp_table SET ?', postData, function (error, rows, fields) {
       if (error) throw error;
       res.end(JSON.stringify(rows));
     });
 });