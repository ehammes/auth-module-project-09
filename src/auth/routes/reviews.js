'use strict';

const express = require('express');
const { Reviews } = require('../models/index');
const router = express.Router();

router.post('/review', async(request, response) => {
    const review = request.body;
    try {
        const newReview = await Reviews.create(review);
        response.status(200).send(newReview);
    } catch (error) {
        response.status(404).send('Could not create a review');
    }
});

router.get('/review/:id', async(request, response) => {
    const id = request.params.id;
    try {
        const selectedReview = await Reviews.findOne({where: {id}});
        response.status(200).send(selectedReview);
    } catch (error) {
        response.status(404).send(`Could not find the review with id of ${id}`);
    }
});

router.get('/review', async(request, response) => {
    try {
        const allReviews = await Reviews.findAll({});
        response.status(200).send(allReviews);
    } catch (error) {
        response.status(404).send(`Could not find a list of reviews`);
    }
});

router.put('/review/:id', async(request, response) => {
    const id = request.params.id;
    const updatedReview = request.body;
    try {
        const selectedReview = await Reviews.findOne({where: {id}});
        await selectedReview.update(updatedReview);
        await selectedReview.save();
        response.status(200).send(selectedReview);
    } catch (error) {
        response.status(404).send(`Could not update the review with id of ${id}`);
    }
});

router.delete('/review/:id', async(request, response) => {
    const id = request.params.id;
    try {
        const reviewToDelete = await Reviews.findOne({where: {id}});
        await reviewToDelete.destroy();
        response.status(200).send({});
    } catch (error) {
        response.status(404).send(`Could not delete the review with id of ${id}`);
    }
});

module.exports = router;
