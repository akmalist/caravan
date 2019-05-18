/*jshint esversion:6 */


const express = require("express");
const router = express.Router();
const passport =require("passport");
const User = require("../models/user");
// ========================
// Authentication routes
// ========================


////root route////
router.get("/", function(req, res) {
  res.render("landing");
});


//******************* Passport registration request***********************//


//show register form

router.get("/register", function(req,res){
  res.render("register");
});


//handles sign up logic route
router.post("/register", function(req,res){
  const newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success","Welcome to Caravan " +req.body.username);
      res.redirect("/cars");
    });
  });
});


//******************* Passport login request***********************//
//show login form
router.get("/login", function(req,res){
  res.render("login");

});

//handles login form
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/cars",
  failureRedirect: "/login"
}), function(req, res){
});


///log out route

router.get("/logout",function(req,res){
  req.logout();
  req.flash("success", "Loged out!");
  res.redirect("/cars");
});




module.exports = router;
