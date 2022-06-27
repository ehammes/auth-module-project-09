'use strict';

const express = require('express');
const { Customers } = require('../models');
const router = express.Router();

router.post('/customer', async (request, response) => {
    const customer = request.body;
    try {
        const newCustomer = await Customers.create(customer);
        response.status(200).send(newCustomer);
    } catch (error) {
        response.status(404).send('Could not create a customer');
    }
});

router.get('/customer/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const selectedCustomer = await Customers.findOne({ where: { id } });
        response.status(200).send(selectedCustomer);
    } catch (error) {
        response.status(404).send(`Could not find the customer with id of ${id}`);
    }
});

router.get('/customer', async (request, response) => {
    try {
        const allCustomers = await Customers.findAll({});
        response.status(200).send(allCustomers);
    } catch (error) {
        response.status(404).send(`Could not find a list of customers`);
    }
});

router.put('/customer/:id', async (request, response) => {
    const id = request.params.id;
    const updatedCustomer = request.body;
    try {
        const selectedCustomer = await Customers.findOne({ where: { id } });
        await selectedCustomer.update(updatedCustomer);
        await selectedCustomer.save();
        response.status(200).send(selectedCustomer);
    } catch (error) {
        response.status(404).send(`Could not update the customer with id of ${id}`);
    }
});

router.delete('/customer/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const customerToDelete = await Customers.findOne({ where: { id } });
        await customerToDelete.destroy();
        response.status(200).send({});
    } catch (error) {
        response.status(404).send(`Could not delete the customer with id of ${id}`);
    }
});

module.exports = router;
