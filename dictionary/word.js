var express = require('express');
var routes = express.Router();

var wordData = require('./dbAccess');

routes.get('/:term?', (req, res) => {
    var searchTerm = req.params && req.params.term || '';
    console.error("Searching for: " + searchTerm);
    wordData.searchWords(searchTerm, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

routes.post('/:list', (req, res) => {
    console.error("Adding: ", req.body);
    wordData.addWord(req.params.list, req.body.desc, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

routes.delete('/:id', (req, res) => {
    console.error("Deleting: ", req.params);
    wordData.delWord(req.params.id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = routes;