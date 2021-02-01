var express = require('express');
var routes = express.Router();

var inc = require('../include').replacer;
inc.dir = '/dictionary';
var words = require('./word');

routes.get('/', (req, res) => {
    inc.include('index.html', __dirname, (data) => {
        res.send(data);
    });
});

routes.use('/word', words);

module.exports = routes;