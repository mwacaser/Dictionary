var express = require('express');
var dict = express.Router();

var inc = require('../include').replacer;
inc.dir = '/dictionary';

dict.get('/', (req, res) => {
    inc.include('index.html', __dirname, (data) => {
        res.send(data);
    });
});

var dictDB = require('./dbAccess');

dict.get('/search/:term?', (req, res) => {
    var searchTerm = req.params && req.params.term ? req.params.term : "";
    console.error("Searching for: " + searchTerm);
    dictDB.searchWords(searchTerm, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

dict.get('/add/:list/:desc', (req, res) => {
    dictDB.addWord(req.params.list, req.params.desc, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = dict;