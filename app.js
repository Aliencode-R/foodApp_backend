const express = require("express");
const app = express(); 
const cookieParser = require("cookie-parser"); 
const personRouter = require("./Routers/personRouter");
const planRouter = require("./Routers/planRouter"); 


app.use(express.json()); 
app.use(cookieParser());

app.use("/api/person/", personRouter);
app.use("/api/plan/", planRouter);


// app.use(express.static("public"));

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
[] Person {
    [] confirm password pre undefined
    [] check update user (user.save()) function again 
    [] forget and reset password 
    [] protect route and authenticate
    [] encrypt password using bcrypt
}

[] plan
[] review
[] booking
*/