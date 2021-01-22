const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

var dictRoutes = require('./dictionary/dictionary');

app.use('/dictionary', dictRoutes);

app.listen(port, () => {
    console.log(`Site app listening at http://localhost:${port}`)
})
