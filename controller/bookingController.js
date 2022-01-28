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
        const price = await stripe.prices.create({
            currency: 'inr',
            // recurring: {
            //     interval: 'month',
            //     usage_type: 'metered'
            // },
            product_data: {
                name: 'Gold special',
            },
            nickname: 'Gold special price',
            unit_amount: 3000,
        });
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price,
                    quantity: 1
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:8080/api/booking/success`,
            cancel_url: `http://localhost:8080/api/booking/cancel`,
            // success_url: `${YOUR_DOMAIN}/success.html`,
            // cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });

        res.redirect(300, session.url);
    } catch (err) {
        console.log(err.message);
    }
 
}

// app.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                 price: '{{PRICE_ID}}',
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}/success.html`,
//         cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     });

//     res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));