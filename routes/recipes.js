const express = require('express'),
    router = express.Router(),
    Recipe = require('../models/recipe.model'),
    Menu = require('../models/menu.model');

// =======================
// CRUD ROUTES FOR RECIPES
// =======================


// INDEX
router.route('/').get((req, res) => {
    Recipe.find({}, function(err, allRecipes){
        res.render('pages/recipes/index', {recipes: allRecipes});
    });
});

// NEW
router.get('/new', isLoggedIn, (req, res) => {
    res.render('pages/recipes/new');
});

// CREATE
router.post('/', isLoggedIn, (req, res) => {
    Recipe.create(req.body.recipe, function(err, recipe){
        if (err) {
            console.log(err);
            res.redirect('/')
        } else {
            recipe.user.id = req.user._id;
            recipe.user.username = req.user.username;
            recipe.save();
            console.log(recipe);
            res.redirect('/recipes');
        }
    });
});

// SHOW
router.get('/:id', isLoggedIn, (req, res) => {
    Recipe.findById(req.params.id, function(err, recipe){
        res.render('pages/recipes/show', {recipe: recipe});
    });
});

// DELETE 
router.delete('/:id', isLoggedIn, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, function(err, recipe){
        if (err) {
            console.log(err);
            // redirect to show page
            res.redirect('/recipes/' + req.params.id);
        } else {
            // redirect to all recipes
            res.redirect('/recipes');
        }   
    });
});

// ADD TO A MENU
router.post('/menus/:menuId', isLoggedIn, (req, res) => {
    Recipe.create(req.body.recipe, function (err, recipe) {
        if (err) {
            console.log(err);
            res.redirect('/')
        } else {
            Menu.findById(req.params.menuId, (err, menu) => {
                if (err) {
                    console.log(err);
                } else {
                    menu.recipes.push(recipe);
                    menu.save();
                    res.redirect('/menus/' + req.params.menuId + '/edit');
                }
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
};


module.exports = router;