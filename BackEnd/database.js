const mysql = require('mysql');



var pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shivamsingh",
    database : "JobPortal"
  });
  

module.exports = pool;

