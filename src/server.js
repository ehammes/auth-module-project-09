'use strict';

const express = require('express');
const app = express();
const notFoundHandler = require('./middleware/404');
const internalError = require('./middleware/500');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use('*', notFoundHandler);
app.use(internalError);

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('listening on port', PORT)),
};