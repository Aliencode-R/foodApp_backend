const express = require("express");
const reviewRouter = express.Router();

reviewRouter
    .route('/')
    .get(getAllReviews)
    


reviewRouter
    .route('/:id')
    .get(getPlanReviews)
    .post(createReview)
    .patch(updateReview)
    .delete(deleteReview); 


module.exports = reviewRouter;