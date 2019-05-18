/* jshint esversion:6*/
//middleware

const Car = require("../models/car");
const Comment = require("../models/comment");


middleware = {};

// check if the user is logedin
middleware.isLogedin = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be loged in to do that!");
  res.redirect("/login");
};
//another middleware to check if the user is authorized to edit cars
//is user loged in ?

middleware.checkOwnershipAuthorization = function(req, res, next) {
  if (req.isAuthenticated()) {
    Car.findById(req.params.id, function(err, foundcar) {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the car?
        if (foundcar.author.id.equals(req.user._id)) {
          return next();
          // res.render("cars/edit", {car: foundcar});
        } else {
          //otherwise redirect
          req.flash("error", "You dont have permition to do that");
          res.redirect("back");

        }
      }

    });
  } else {
    //otherwise redirect
    res.redirect("back");
  }
};

//another middleware to check if the user is authorized to edit comments

middleware.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          return next();
        } else {
          //otherwise redirect
          res.redirect("back");
        }
      }

    });
  } else {
    //otherwise redirect
    res.redirect("back");
    req.flash("error", "You must be loged to do that");
  }
};

module.exports=middleware;
