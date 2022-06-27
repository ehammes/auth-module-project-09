'use strict';

const { Users } = require('../models/index.js');

module.exports = async (req, res, next) => {


  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    try {
      const token = req.headers.authorization.split(' ').pop();
      console.log('bearer auth token', token);
      const validUser = await Users.authenticateToken(token);

      req.user = validUser;
      req.token = validUser.token;
      next();
    } catch (e) {
      console.error(e);
      res.status(403).send('Invalid Login');
    }
  }
};