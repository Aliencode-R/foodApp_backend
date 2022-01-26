let reviewModel = require("../Models/reviewModel"); 
let planModel = require("../Models/planModel"); 
// TODO: populate user and plan
module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            res.json({
                message: "reviews found",
                data: reviews
            })
        }
        else {
            res.json({
                message: "reviews not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}
// TODO: populate user and plan
module.exports.getPlanReviews = async function (req, res) {
    try {
        let planId = req.params.id;
        let reviews = await reviewModel.find({plan: planId}); 
        res.json({
            message: "reviews retrieved successfully", 
            data: reviews
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.createReview = async function (req, res) {
    try {
        let planId = req.params.id;
        let plan = await planModel.findById(planId); 
        let review = await reviewModel.create(req.body); 
        plan.reviews.push(review._id); 
        if(plan.averageRating) {
            let sum = plan.averageRating * plan.reviews.length; 
            let finalAvgRating = (sum + review.rating) / (plan.review.length + 1);
            plan.averageRating = finalAvgRating; 
        } else {
            plan.averageRating = reivew.rating; 
        }
        await plan.save();  
        res.json({
            message: "review created", 
            review
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.deleteReview = async function (req, res) {
    try {
        let review = await reviewModel.findById(req.params.id); 
        let planId = reivew.plan; 
        let plan = await planModel.findById(planId); 
        let idxOfReview = plan.reviews.indexOf(review._id); 
        plan.reivews.splice(idxOfReview, 1); 
        if(plan.reviews.length == 0) {
            plan.averageRating = undefined; 
        } else {
            let sum = (plan.averageRating * (plan.reivews.length + 1)); 
            sum -= review.rating; 
            plan.averageRating = sum / plan.reviews.length; 
        }
        await plan.save(); 
        res.json({
            message: "review deleted successfully", 
            review
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.updateReview = async function (req, res) {
    try {
        let review = await reviewModel.findById(req.params.id); 
        if(req.body.includes("rating")) {
            return res.json({
                message: "ratings can not update"
            })
        }
        for(let key in req.body) {
            review[key] = req.body[key]; 
        }
        await review.save(); 
        res.json({
            message: "review updated", 
            review
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}
