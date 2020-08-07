const express = require('express'),
    router = express.Router(),
    Menu = require('../models/menu.model');

// =====================
// CRUD ROUTES FOR MENUS
// =====================

// INDEX
router.route('/').get((req, res) => {
    Menu.find({}, function (err, allMenus) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/menus/index', { menus: allMenus });
        }
    });
});

// NEW
router.get('/new', isLoggedIn, (req, res) => {
    res.render('pages/menus/new');
});

// CREATE
router.post('/', isLoggedIn, (req, res) => {
    Menu.create(req.body.menu, function (err, menu) {
        if (err) {
            console.log(err);
            res.redirect('/')
        } else {
            // associate user with menu
            menu.user.id = req.user._id;
            menu.user.username = req.user.username;
            menu.save();
            // associate menu with user
            req.user.menus.push(menu);
            req.user.save();
            res.redirect('/menus');
        }
    });
});

// SHOW
router.get('/:id', (req, res) => {
    Menu.findById(req.params.id, function (err, menu) {
        res.render('pages/menus/show', { menu: menu });
    });
});

// EDIT
router.get('/:id/edit', isLoggedIn, (req, res) => {
    Menu.findById(req.params.id).populate("recipes").exec((err, menu) => {
        if (err) {
            console.log (err);
            res.redirect('/menus/' + req.params.id + '/edit')
        } else {
            res.render('pages/menus/edit', {menu: menu});
        }
    });
});

// UPDATE
router.put('/:id', isLoggedIn, (req, res) => {
   Menu.findByIdAndUpdate(req.params.id, req.body.menu, (err, updatedMenu) => {
       if (err) {
           console.log(err);
           res.redirect('/menus/' + req.params.id + '/edit');
       } else {
           updatedMenu.quickAdds.push(req.body.menu.quickAdd);
           updatedMenu.save();
           // redirect to show
           res.redirect('/menus/' + req.params.id);
       }
   });
});

// DELETE 
router.delete('/:id', isLoggedIn, (req, res) => {
    Menu.findByIdAndRemove(req.params.id, function (err, menu) {
        if (err) {
            console.log(err);
            // redirect to show page
            res.redirect('/menus/' + req.params.id);
        } else {
            // redirect to all menus
            res.redirect('/menus');
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