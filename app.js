const express = require('express');
const config = require('./config.js');
const path = require('path');
const apiRouter = require('./routes/api');
const morgan = require('morgan');
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

app.use('/api', apiRouter(app, express));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.server_port);
console.log(`Server is listenning port ${config.server_port}`);

module.exports = app;