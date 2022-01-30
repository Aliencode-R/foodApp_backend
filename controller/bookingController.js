// stripe api 
// This is your test secret API key.
let {SK_KEY} = require("../secrets"); 
const stripe = require('stripe')(SK_KEY);
const express = require('express');
// const app = express();
// app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:8080/booking';

module.exports.fileSender = function (req, res) {
    console.log("at file sender");
    // res.sendFile("D:\MMUB\Backend\Practice\public\checkout.html");     
    res.sendFile("D:/MMUB/Backend/Practice/public/checkout.html")
}

module.exports.fileSenderSuccess = function (req, res) {
    console.log("at file sender");
    // res.sendFile("D:\MMUB\Backend\Practice\public\checkout.html");     
    res.sendFile("D:/MMUB/Backend/Practice/public/success.html")
}
module.exports.fileSenderCancel = function (req, res) {
    console.log("at file sender");
    // res.sendFile("D:\MMUB\Backend\Practice\public\checkout.html");     
    res.sendFile("D:/MMUB/Backend/Practice/public/cancel.html")
}




module.exports.createCheckoutSession = async (req, res) => {
    console.log("at create session");
    console.log(req.body);
    try {

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    // price,
                    name: "one piece",
                    currency: "inr",
                    amount: 199, 
                    quantity: 1
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:8080/api/booking/success`,
            cancel_url: `http://localhost:8080/api/booking/cancel`,
            // success_url: `${YOUR_DOMAIN}/success.html`,
            // cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });
        console.log(session.url);
        res.redirect(300, session.url);
    } catch (err) {
        console.log(err.message);
    }
 
}

