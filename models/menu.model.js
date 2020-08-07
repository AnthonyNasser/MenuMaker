const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    name: {
        type: String
    },
    recipes: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        },
        dish_title: {
            type: String
        }
    }],
    quickAdds: [{
        type: String
    }]
});

module.exports = mongoose.model("Menu", menuSchema);