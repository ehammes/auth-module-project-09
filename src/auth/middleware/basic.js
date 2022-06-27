'use strict';

const base64 = require('base-64');
const { Users } = require('../models');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid Login');
  }
  
  try {
    let basic = req.headers.authorization.split(' ').pop();
    let [username, password] = base64.decode(basic).split(':');
    req.user = await Users.authenticateBasic(username, password);
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};
