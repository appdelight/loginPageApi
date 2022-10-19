const mysql = require('mysql2');

const connection =  mysql.createConnection( {
    host: process.env.host,
    port: process.env.mysqlport,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
})
connection.connect(function (err) {
    if(err){
        console.log("error occurred while connecting",err);
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

module.exports = connection