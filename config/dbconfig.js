const mysql = require("mysql2");

const dbconn = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'students',
    password: ''
});
if(dbconn.connect()){
    console.log("Connected");
}

module.exports = dbconn