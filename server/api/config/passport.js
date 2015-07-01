// First, we'll need passport...
var passport = require('passport');

// We also need the strategy defined by our 'passport-local' module.
// Strategies are how passport abstracts the logic of working with
// different login systems like Facebook or Twitter. You can also
// use multiple strategies to support more auth types.
var LocalStrategy = require('passport-local').Strategy;


var BearerStrategy = require('passport-http-bearer').Strategy;

// Since we will be using the user model to control access and
// persistence, we'll use that as well.
var User = require('../models/user');

var jwt = require('jwt-simple');
var secret = 'oiUy7R&^%RIUYhoiut8iyts987tw4i5toeiurtghoiu';


// SERIALIZATION:
//  This small subset of code will take a user object, used
//  in our JS, and convert it into a small, unique, string
//  which is represented by the id, and store it into the
//  session.
passport.serializeUser(function(user, done){
  done(null, user.id);
});

// DESERIALIZATION:
//  Essentially the inverse of above. This will take a user
//  id out of the session and convert it into an actual
//  user object.
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});


// Here we define the strategy for our local authentication.
// This will be utilized by passport whenever we reference it.
var localStrategy = new LocalStrategy(function(username, password, done){
  User.findOne({username: username}, function(err, user){
    
    if (err) return done(err);

    if (!user) return done(null, false);

    user.comparePassword(password, function(err, isMatch){
      
      if(err) return done(err);

      if(isMatch) {
        var token = jwt.encode({payload: new Date()}, secret);

        user.token = token;

        var now = new Date();

        // this is in milliseconds
        user.tokenCreatedTime = now.getTime();

        user.save(done);
      }
      else  return done(null, false);

    }); 
  });
});

var bearerStrategy = new BearerStrategy(function(token, done){
  User.findOne({token: token}, function(err, user){
    if(err) return done(err);

    if (!user) return done(null, false);

    // figure out if token has passed 8-hr time frame since last used
    var now = new Date();
    var currentTime = now.getTime();
    var diff = currentTime - user.tokenCreatedTime;
    // 8hr * 60min * 60sec * 1000ms
    var eightHourInMilliseconds = 10000;     // 28800000;  
    if (diff > eightHourInMilliseconds) return done(null, false);
    
    // if we get to here, that means the token has not passed 8-hr time frame 
    // and therefore still valid
    user.tokenCreatedTime = currentTime;
    return user.save(done);
    
  });
});

passport.use(localStrategy);
passport.use(bearerStrategy);

