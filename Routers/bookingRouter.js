const express = require("express");
const bookingRouter = express.Router();
const { createCheckoutSession, fileSender, fileSenderCancel, fileSenderSuccess } = require("../controller/bookingController");

bookingRouter.route("/")
    .get(fileSender)
    .post(createCheckoutSession)

bookingRouter.route("/success").get(fileSenderSuccess);
bookingRouter.route("/cancel").get(fileSenderCancel);

module.exports = bookingRouter; 