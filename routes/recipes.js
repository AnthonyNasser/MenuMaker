const express = require('express'),
    router = express.Router(),
    Recipe = require('../models/recipe.model'),
    Menu = require('../models/menu.model');

// =======================
// CRUD ROUTES FOR RECIPES
// =======================


// INDEX
router.get('/', (req, res) => {
	Recipe.find({}, function (err, allRecipes) {
		res.render('pages/recipes/index', { recipes: allRecipes })
	})
})

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
            // associate user with recipe
            recipe.user.id = req.user._id;
            recipe.user.username = req.user.username;
            // associate recipe with user
            req.user.recipes.push(recipe);
            req.user.save();
            recipe.save();
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

// EDIT
router.get('/:id/edit', isLoggedIn, (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err) {
            console.log(err);
            res.redirect('/recipes/' + req.params.id + '/edit')
        } else {
            res.render('pages/recipes/edit', { recipe: recipe });
        }
    });
});

// UPDATE
router.put('/:id', isLoggedIn, (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, updatedRecipe) => {
        if (err) {
            console.log(err);
            res.redirect('/recipes/' + req.params.id + '/edit')
        } else {
            res.redirect('/recipes/' + req.params.id);
        }
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

// ADD NEW RECIPE TO A MENU
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

// ADD EXISTING RECIPE TO A MENU
router.put('/:id/menus/:menuId', isLoggedIn, (req, res) => {
    Menu.findById(req.params.menuId, (err, menu) => {
        if (err) {
            console.log(err);
        } else {
            Recipe.findById(req.params.id, (err, recipe) => {
                if (err) {
                    console.log(err);
                } else {
                    menu.recipes.push(recipe);
                    menu.save();
                    res.redirect('/recipes');
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