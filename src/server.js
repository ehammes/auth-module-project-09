'use strict';

const express = require('express');
const app = express();
const notFoundHandler = require('./middleware/404');
const internalError = require('./middleware/500');
const customerRoute = require('./auth/routes/customer');
const reviewRoute = require('./auth/routes/reviews');
require('dotenv').config();


const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(customerRoute);
app.use(reviewRoute);
app.use('*', notFoundHandler);
app.use(internalError);

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('listening on port', PORT)),
};
