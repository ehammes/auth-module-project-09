'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { sequelize } = require('../src/auth/models/index');
const mockRequest = supertest(server);

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.drop({});
    await sequelize.close();
});

const review = {
    date: '06-23-22',
    restaurantName: 'McDonald',
    cuisineType: 'fastfoods',
    rating: 3,
    customerId: 1
};

describe('Testing routes', () => {
    describe('Route test', () => {
        test('Create customer', async () => {
            const customer = { customerName: 'xyz' };
            const response = await mockRequest.post('/customer').send(customer);
            const reviewResponse = await mockRequest.post('/review').send(review);
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(1);
            expect(response.body.customerName).toEqual('xyz');

            expect(reviewResponse.status).toEqual(200);
            expect(reviewResponse.body.id).toEqual(1);
            expect(reviewResponse.body.restaurantName).toEqual('McDonald');
            expect(reviewResponse.body.date).toEqual('06-23-22');
            expect(reviewResponse.body.cuisineType).toEqual('fastfoods');
            expect(reviewResponse.body.rating).toEqual(3);
            expect(reviewResponse.body.customerId).toEqual(1);
        })

        test('Get from ID', async () => {
            const response = await mockRequest.get('/customer/1');
            const reviewResponse = await mockRequest.get('/review/1');
            expect(response.status).toEqual(200);
            expect(response.body.customerName).toEqual('xyz');

            expect(reviewResponse.status).toEqual(200);
            expect(reviewResponse.body.restaurantName).toEqual('McDonald');
            expect(reviewResponse.body.date).toEqual('06-23-22');
            expect(reviewResponse.body.cuisineType).toEqual('fastfoods');
            expect(reviewResponse.body.rating).toEqual(3);
            expect(reviewResponse.body.customerId).toEqual(1);
        })

        test('Get all customers', async () => {
            const response = await mockRequest.get('/customer');
            expect(response.status).toEqual(200);
            expect(response.body[0].customerName).toEqual('xyz');
        })

        test('Update customer', async () => {
            const name = { customerName: 'zyx' };
            const response = await mockRequest.put('/customer/1').send(name);
            expect(response.status).toEqual(200);
            expect(response.body.customerName).toEqual('zyx');
        })

        test('Delete customer', async () => {
            const response = await mockRequest.delete('/customer/1');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({})
        })

    });
});
