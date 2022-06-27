'use strict';

const express = require('express');
const router = express.Router();

const { Users } = require('../models');

// Auth
const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl');

router.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await Users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

router.get('/users', bearerAuth, async (req, res, next) => {
  const userRecords = await Users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

// RBAC ROUTES
router.get('/read', bearerAuth, permissions('read'), (req, res, next) => {
  res.status(200).send('Success! I have read permissions!');
});

router.get('/create', bearerAuth, permissions('create'), (req, res, next) => {
  res.status(200).send('Success! I have create permissions!');
});

router.get('/update', bearerAuth, permissions('update'), (req, res, next) => {
  res.status(200).send('Success! I have update permissions!');
});

router.get('/delete', bearerAuth, permissions('delete'), (req, res, next) => {
  res.status(200).send('Success! I have delete permissions!');
});

module.exports = router;