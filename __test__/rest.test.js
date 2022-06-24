'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { sequelize } = require('../src/auth/models/index');
const mockRequest = supertest(server);

beforeAll(async () => {
    await  sequelize.sync();
});

afterAll(async () => {
    await sequelize.drop({});
    await sequelize.close();
});

describe('Testing routes', () => {
    describe('Route test', () => {
        test('Create customer', async () => {
            const customer = { customerName: 'xyz' };
            const response = await mockRequest.post('/customer').send(customer);
            expect(response.status).toEqual(200);
            expect(response.customer.customerName).toEqual('xyz');
        })

        test('Get from ID', async () => {
            const response = await mockRequest.get('/customer/1');
            expect(response.status).toEqual(200);
            expect(response.customer.customerName).toEqual('xyz');
        })

        test('Get all customers', async () => {
            const response = await mockRequest.get('/customer');
            expect(response.status).toEqual(200);
            expect(response.customer[0].customerName).toEqual('xyz');
        })

        test('Update customer', async () => {
            const name = { customerName: 'zyx' };
            const response = await mockRequest.put('/customer/1').send(name);
            expect(response.status).toEqual(200);
            expect(response.name.customerName).toEqual('zyx');
        })

        test('Delete customer', async () => {
            const response = await mockRequest.delete('/customer/1');
            expect(response.status).toEqual(200);
            expect(response.name).toEqual({})
        })

    });
});
