'use strict';

const base64 = require('base-64');
const basicAuth = require('../../src/auth/middleware/basic');
const { sequelize, Users } = require('../../src/auth/models/index');

let newUser = {
  admin: {
    username: 'Jennifer',
    password: 'password123',
  },
};

beforeAll(async () => {
  await sequelize.sync();
  await Users.create(newUser.admin);
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Test Auth Middleware', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  //Utilized lab07 for basic auth tests

  describe('Basic user authentication', () => {
    it('invalid user login for an admin user with the wrong credentials', () => {
      const basicAuthString = base64.encode('username:pass');

      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      return basicAuth(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });
    });

    it('valid user login based on the correct login credentials', () => {
      const basicAuthString = base64.encode(`${newUser.admin.username}:${newUser.admin.password}`);

      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      return basicAuth(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });
    });

  });
});