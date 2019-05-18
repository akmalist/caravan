/*jshint esversion:6 */

const express         =require("express"),
      app             = express(),
      ejs             = require("ejs"),
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      localStrategy   = require("passport-local"),
      request         = require("request"),
      mongoose        = require("mongoose"),
      methodOverride  = require("method-override"),
      flash           = require("connect-flash"),
      Car             = require("./models/car"),
      Comment         = require("./models/comment"),
      User            = require("./models/user"),
      seedDB          = require("./seeds");




//require routes from different folder
const carRoutes     = require("./routes/cars"),
      authRoutes    = require("./routes/auth"),
      commentRoutes = require("./routes/comments");


// connect to mongoose


mongoose.connect("mongodb://localhost/caravan-app", {
  useNewUrlParser: true
});


//app configuration

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());

seedDB();//default data

//check for mongoose db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


//*******************Configure Passport ****************///

app.use(require("express-session") ({
                  secret:"Mega secret",
                  resave:false,
                  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// this will call the function check if the user is loged in every route app.get or post requests
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  //req.user comes from Passport
  //currentUser variable can be used in header templates
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success"); //will create a global variable error/success that can be available in every template on your app

  next();
});




//template for global routes

app.use("/cars", carRoutes);
app.use("/", authRoutes);
app.use("/cars/:id/comments/", commentRoutes);

app.listen("3000", function(){
  console.log("App has been launched on port 3000!!!!!!!");
});
