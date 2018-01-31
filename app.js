var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    methodOverride          = require("method-override"),
    Campground              = require("./models/campgrounds"),
    seedDB                  = require("./seeds"),
    Comment                 = require("./models/comment"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    passport                = require("passport"),
    User                    = require("./models/user");


//REQUIRING ROUTES    
var commentRoutes           = require("./routes/comments"),
    campgroundRoutes        = require("./routes/campgrounds"),
    indexRoutes             = require("./routes/index");
    
// seed Database    
// seedDB();

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://maindb:corona@ds221228.mlab.com:21228/yelpcamp-pp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "My dog is a meat torpedo",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// SERVER CONFIG
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!");
});