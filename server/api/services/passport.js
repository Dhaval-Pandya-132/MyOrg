const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "259512103532-cvvunkt98fmil35ppucov9iu8lcf3mgl.apps.googleusercontent.com",
    clientSecret: "bTfDLxoYbhdgqU7sUKSnpykH",
    callbackURL: "http://localhost:8080/api/account/google"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));