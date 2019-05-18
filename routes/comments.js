/*jshint esversion:6 */

const express = require("express");
const router = express.Router({mergeParams:true});
const Car = require("../models/car");
const Comment = require("../models/comment");
const middleware = require("../middleware"); // you dont have to refer to "../middleware/index.js" because node will search for it as a default
// ========================
// Comments routes
// ========================

//////Comments new show/////
router.get("/new", middleware.isLogedin, function(req,res){
    // find car by id and render comments
    Car.findById(req.params.id, function(err, car){
      if(err){
        console.log(err);
      }else{
          res.render("comments/new",{car:car});
      }
    });

});



//// comments Create//////
router.post("/", middleware.isLogedin, function(req, res){
 Car.findById(req.params.id, function(err, car){
   if(err){
     console.log(err);
     res.redirect("/cars");
   }else{
     Comment.create(req.body.comment, function(err, comment){
       if(err){
         console.log(err);
       }else{
         comment.author.id= req.user._id;
         comment.author.username = req.user.username;
         //save comments
         comment.save();
         car.comments.push(comment);
         car.save();
         req.flash("success", "You created comment");
         res.redirect("/cars/" +car._id);
       }
     });
   }
 });
});


// // EDIT COMMENT ROUTE
//
// router.get("/:comment_id/edit",function(req, res){
//   Comment.findById(req.params.comment_id, function(err, foundComment){
//     if(err){
//       res.redirect("back");
//     }else{
//       res.render("comments/edit", {car_id: req.params.id, comment:foundComment});
//
//   }
// });
// });


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {car_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE ROUTE


router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/cars/"+ req.params.id);
    }
  });
});

// COMMENT DESTROY ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if (err){
      res.redirect("/cars");
    }else{
    req.flash("success", "Comment deleted");
      res.redirect("/cars/"+ req.params.id);
    }
  });
});




module.exports = router;
