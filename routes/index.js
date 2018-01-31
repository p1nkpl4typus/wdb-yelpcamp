var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});

//REGISTER FORM ROUTE
router.get("/register", function(req, res) {
    res.render("register");
});

//SIGNUP LOGIC ROUTE
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp" + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN FORM ROUTE
router.get("/login", function(req, res) {
    res.render("login");
});

//LOGIN LOGIC ROUTE
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have successfully logged out!");
    res.redirect("/");
});

module.exports = router;