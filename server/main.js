const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { WebappMiddleware } = require('./middleware/webapp');

const app = express();
const PORT = 3000;
const serverPort = Number(process.env.SERVER_PORT || PORT);

WebappMiddleware('/', app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

server.listen(serverPort);
module.exports = { app, server };
