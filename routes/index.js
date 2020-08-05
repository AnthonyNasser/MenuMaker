const   express = require('express'),
        router = express.Router(),
        passport = require("passport"),
        User = require("../models/user.model"),
        LocalStrategy = require("passport-local");

// LANDING
router.get('/', (req, res) => {
    res.render('pages/home');
});

// ===========
// AUTH ROUTES
// ===========

// show reggy form
router.get("/register", (req, res) => {
    res.render("pages/auth/register");
});

// handle signup logic
router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username, email: req.body.email });
    User.register(newUser, req.body.password, (err, createdUser) => {
        if (err) {
            console.log(err);
            return res.render("pages/auth/register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/");
        });
    });
});

// show login form
router.get("/login", (req, res) => {
    res.render("pages/auth/login");
});
// handle login logic
router.post("/login", passport.authenticate("local",
    {
        // middleware
        successRedirect: "/",
        failureRedirect: "/login"
    }), 
    (req, res) => { });

// logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;