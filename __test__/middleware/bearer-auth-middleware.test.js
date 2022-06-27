'use strict';

const bearer = require('../../src/auth/middleware/bearer');
const { sequelize, Users } = require('../../src/auth/models/index');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'foodreview';

let newUser = {
  admin: {
    username: 'jennifer',
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

  //Utilized lab07 for bearer auth tests

  describe('Bearer user authentication', () => {
    it('invalid user login for an admin user with incorrect token', () => {

      req.headers = {
        authorization: `Bearer badtoken`,
      };

      return bearer(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });
    });

    it('valid user login based on using the correct token', () => {
      const user = { username: 'jennifer' };
      const token = jwt.sign(user, SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return bearer(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });
    });

  });
});