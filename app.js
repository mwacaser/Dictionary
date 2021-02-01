const express = require('express');
const app = express();
const port = 3000;

var cors = require('cors');
app.use(cors());

var inc = require('./include').replacer;
app.get('/', (req, res) => {
    inc.include('index.html', __dirname, (data) => {
        res.send(data);
    });
});

var dictRoutes = require('./dictionary/routes');
app.use('/dictionary', dictRoutes);

app.get('/puzzle', (req, res) => {
    res.sendFile('/puzzle/index.html', err => {
        console.log('Could not find puzzle');
        res.redirect('/');
    });
});
app.use('/puzzle', express.static(__dirname + '/puzzle'));

app.use('/public', express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Site app listening at http://localhost:${port}`)
});
