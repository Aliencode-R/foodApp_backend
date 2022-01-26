let mongoose = require("mongoose")
let { DB_LINK } = require("../secrets");

mongoose.connect(DB_LINK)
    .then((db) => console.log("db connected"))
    .catch((err) => err.message);

let reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review can't be empty"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Review must contain some rating"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        // info
        type: mongoose.Schema.ObjectId,
        required: [true, "Review must belong to a user"],
        ref: "personModel"
    },
    plan: {
        // info
        type: mongoose.Schema.ObjectId,
        required: [true, "Review must belong to a plan "],
        ref: "planModel"
    }
})

const ReviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = ReviewModel;