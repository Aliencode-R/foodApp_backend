let mongoose = require("mongoose")
let {DB_LINK} = require("../secrets"); 
let emailValidator = require("email-validator");
const crypto = require("crypto");  
const bcrypt = require("bcrypt"); 


mongoose.connect(DB_LINK)
.then((db) => console.log("db connected"))
.catch((err) => err.message);

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "kindly enter the name"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        minlength: 7,
        required: true
    },
    confirmPassword: {
        type: String,
        minlength: 7,
        validate:
            function () {
                return this.password == this.confirmPassword
            },
        required: true
    },
    createdAt: Date,
    token: String,

    role: {
        type: String,
        enum: ["admin", "user", "manager"],
        default: "user"
    },
    // bookings: {
    //     //   array of object id 
    //     type: [mongoose.Schema.ObjectId],
    //     ref: "bookingModel"
    // }
})

personSchema.methods.createToken = function() {
    let token = crypto.randomBytes(32).toString("hex");
    this.token = token;
    return token;
}

personSchema.methods.resetHandler = async function(password, confirmPassword) {
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(password, salt); 
    // this.password = passwrod; 
    // this.confirmPassword = await bcrypt.hash(confirmPassword, salt);
    // console.log(this.password, this.confirmPassword);
    this.password = password; 
    this.confirmPassword = confirmPassword; 
    this.token = undefined; 
}

personSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
    this.confirmPassword = undefined; 
})

module.exports = mongoose.model("personModel", personSchema);