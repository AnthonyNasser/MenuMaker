const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    dish_title : {
        type: String
    },
    image: {
        type: String
    },
    ingredients: [{
        type: String
    }],
    steps: [{
        type: String
    }],
    prep_time: String,
    cook_time: String,
    description: String
});

module.exports = mongoose.model("Recipe", recipeSchema);