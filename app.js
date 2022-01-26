const express = require("express");
const app = express(); 
const cookieParser = require("cookie-parser"); 
const personRouter = require("./Routers/personRouter");
const planRouter = require("./Routers/planRouter"); 
const reviewRouter = require("./Routers/reviewRouter");


app.use(express.json()); 
app.use(cookieParser());

app.use("/api/person/", personRouter);
app.use("/api/plan/", planRouter);
app.use("/api/review/", reviewRouter); 

app.get("/", function(req, res) {
    try{
        res.sendFile(__dirname + "/public/index.html")
    } catch(err) {
        console.log(err.message);
    }

})

app.listen(8080, function(req, res) {
    console.log("server open 8080");
})

/*
todo


[] plan
[] review
[] booking
*/