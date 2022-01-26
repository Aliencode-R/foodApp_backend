let reviewModel = require("../Models/reviewModel"); 

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
