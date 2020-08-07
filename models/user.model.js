const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    email: {
        type: String, 
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    menus: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu"
        },
        name: {
            type: String
        }
    }],
    recipes: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        },
        dish_title: {
            type: String
        }
    }],
});

// Adds authentication methods to userSchema
let passportLocalMongoose = require("passport-local-mongoose");
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);