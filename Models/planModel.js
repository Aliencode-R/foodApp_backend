const mongoose = require("mongoose");
const { DB_LINK } = require("../secrets");

mongoose.connect(DB_LINK)
    .then((db) => console.log("db connected"))
    .catch((err) => err.message);

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kindly pass the name"],
        unique: [true, "plan name should be unique"],
        // errors
        maxlength: [40, "Your plan length is more than 40 characters"],
    },
    duration: {
        type: Number,
        required: [true, "You Need to provide duration"]
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        validate: [ function () {
                return this.discount < this.price;
            },
            "Discount must be less than actual price"],
    },
    averageRating: Number, 
    reviews: {
        //   array of object id 
        type: [mongoose.Schema.ObjectId],
        ref: "reviewModel"
    },
})

let planModel = mongoose.model("planModel", planSchema);
module.exports = planModel; 