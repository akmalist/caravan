/*jshint esversion:6 */

const mongoose = require("mongoose");
const Car =require("./models/car");
const Comment   = require("./models/comment");

const data =[
  {
       name: "Mercedes-AMG",
       price: 120000,
       image: "/images/amg.jpg",
       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
       author:{
           id : "588c2e092403d111454fff76",
           username: "Alan"
       }
   },
   {
       name: "Moskvitch ",
       price: 50000,
       image: "/images/mosckvich.jpg",
       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
       author:{
           id : "588c2e092403d111454fff71",
           username: "Dan"
       }
   },
   {
       name: "Audi",
       price: 60000,
       image: "/images/audi.jpg",
       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
       author:{
           id : "588c2e092403d111454fff77",
           username: "Jane"
       }
   },
   {
       name: "Jeep",
       price: 60000,
       image: "/images/jeep.jpg",
       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
       author:{
           id : "588c2e092403d111454fff97",
           username: "Linda"
       }
   }



];


function seedDB(){
   //Remove all cars
   Car.deleteMany({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed cars!");
        Comment.deleteMany({}, function(err) {
            if (err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few cars
            data.forEach(function(seed){
                Car.create(seed, function(err, car){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a car");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author:{
                                    id : "588c2e092403d111454fff76",
                                    username: "Jack"
                                }
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    car.comments.push(comment);
                                    car.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
