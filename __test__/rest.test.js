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

const customer = {
    id: 1,
    customerName: 'Sean'
}

describe('Testing customer routes', () => {
    test('Create customer', async () => {
        const response = await mockRequest.post('/customer').send(customer);

        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(1);
        expect(response.body.customerName).toEqual('Sean');
    });

    test('Get a specific customer using Id', async () => {
        const response = await mockRequest.get('/customer/1');

        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(1);
        expect(response.body.customerName).toEqual('Sean');
    });

    test('Get all customers', async () => {
        const response = await mockRequest.get('/customer');

        expect(response.status).toEqual(200);
        expect(response.body[0].customerName).toEqual('Sean');
    });

    test('Update customer', async () => {
        const updatedName = { customerName: 'Sam' };
        const response = await mockRequest.put('/customer/1').send(updatedName);

        expect(response.status).toEqual(200);
        expect(response.body.customerName).toEqual('Sam');
    });

    test('Delete customer', async () => {
        const response = await mockRequest.delete('/customer/1');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
    });
});

const review = {
    date: '06-26-22',
    restaurantName: 'McDonalds',
    cuisineType: 'fastfood',
    rating: 3,
    customerId: 1
};

// tests pass when the associations from models/index.js line 22-23 commented out
describe('Testing review routes', () => {
    test('Create review', async () => {
        const response = await mockRequest.post('/review').send(review);

        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(1);
        expect(response.body.restaurantName).toEqual('McDonalds');
        expect(response.body.date).toEqual('06-26-22');
        expect(response.body.cuisineType).toEqual('fastfood');
        expect(response.body.rating).toEqual(3);
        expect(response.body.customerId).toEqual(1);
    })

    test('Get a specific review by using its Id', async () => {
        const response = await mockRequest.get('/review/1');

        expect(response.status).toEqual(200);
        expect(response.body.restaurantName).toEqual('McDonalds');
        expect(response.body.date).toEqual('06-26-22');
        expect(response.body.cuisineType).toEqual('fastfood');
        expect(response.body.rating).toEqual(3);
        expect(response.body.customerId).toEqual(1);
    })

    test('Get all reviews', async () => {
        const response = await mockRequest.get('/review');

        expect(response.status).toEqual(200);
        expect(response.body[0].restaurantName).toEqual('McDonalds');
    })

    test('Update review', async () => {
        const updatedName = { restaurantName: 'Burger King' };
        const response = await mockRequest.put('/review/1').send(updatedName);

        expect(response.status).toEqual(200);
        expect(response.body.restaurantName).toEqual('Burger King');
    })

    test('Delete review', async () => {
        const response = await mockRequest.delete('/review/1');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({})
    })
});
