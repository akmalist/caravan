/*jshint esversion:6 */
// ========================
// cars routes
// ========================

const express = require("express");
const router = express.Router();
const Car = require("../models/car");
const middleware = require("../middleware"); // you dont have to refer to "../middleware/index.js" because node will search for it as a default



// RESTful routing
//INDEX -show all cars
router.get("/", function(req, res) {
  //get data from  DB and render that file

  Car.find({}, function(err, allCamps) {
    if (err) {
      console.log(err);
    } else {
      res.render("cars/index", {
        cars: allCamps
      });
    }
   });

});

// RESTful routing
//CREATE -add new camground to db
//CREATE - add new car to DB
router.post("/",middleware.isLogedin, function(req, res){
    // get data from form and add to cars array
    const name =  req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const desc =  req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampground = {name: name, price: price, image: image, description: desc, author:author};
    // Create a new car and save to DB
    Car.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to cars page
            // console.log(newlyCreated);
            req.flash("success", "New Car has been created");
            res.redirect("/cars");
        }
    });
});

// RESTful routing
//NEW -show form to create new car
router.get("/new", middleware.isLogedin, function(req, res) {
  res.render("cars/new");
});


// RESTful routing
//// ID:
// find the car with provided ID
// render show template with that car


//SHOW -shows more info about one car
router.get("/:id", function(req, res){
  Car.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      // console.log(foundCampground);
      res.render("cars/show", {car:foundCampground});
    }
  });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkOwnershipAuthorization, function(req, res) {
  //is user loged in ?

  Car.findById(req.params.id, function(err, foundCampground) {
    res.render("cars/edit", {
      car: foundCampground
    });

  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkOwnershipAuthorization, function(req, res){
    // find and update the correct car
    Car.findByIdAndUpdate(req.params.id, req.body.car, function(err, updatedCampground){
       if(err){
           res.redirect("/cars");
       } else {
           //redirect somewhere(show page)
           res.redirect("/cars/" + req.params.id);
       }
    });
});

//DESTROY  CAMPGROUND ROUTE
router.delete("/:id", middleware.checkOwnershipAuthorization, function(req,res){
  Car.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/cars");
    }else{
      req.flash("error", "Car has been deleted");
      res.redirect("/cars");
    }
  });
});




module.exports = router;
