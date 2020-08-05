const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    email: {
        type: String, 
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: String
});

// Adds authentication methods to userSchema
let passportLocalMongoose = require("passport-local-mongoose");
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);