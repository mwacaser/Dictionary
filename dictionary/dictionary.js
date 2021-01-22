var express = require('express'),
    dict = express.Router();

dict.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

module.exports = dict;

// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     port: "3306",
//     user: "michael_dictionary_user",
//     password: "michael_dictionary_user",
//     database: "michael_dictionary"
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// con.query("SELECT * FROM KeyWord", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });