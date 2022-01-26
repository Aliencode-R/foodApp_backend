const express = require("express");
const reviewRouter = express.Router();
let {getAllReviews, getPlanReviews, createReview, updateReview, deleteReview} = require("../controller/reviewController"); 

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