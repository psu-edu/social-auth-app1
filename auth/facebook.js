// Import necessary modules
const passport = require('passport'); // Passport middleware
const FacebookStrategy = require('passport-facebook').Strategy; // Facebook OAuth strategy
const User = require('../models/User'); // Mongoose User model

// Register the Facebook strategy with Passport
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID, // Facebook App ID from .env
  clientSecret: process.env.FACEBOOK_APP_SECRET, // Facebook App Secret from .env
  callbackURL: '/auth/facebook/callback', // Redirect URL after Facebook login
  profileFields: ['id', 'displayName', 'emails'], // Request these fields from Facebook profile
}, 
// Verify callback function
async (accessToken, refreshToken, profile, done) => {
  try {
    // Validate the structure of the Facebook profile
    if (!profile || !profile.id || !profile.displayName) {
      console.error('Malformed Facebook profile:', profile); // Log the malformed profile
      return done(new Error('Incomplete Facebook profile data'), null);
    }

    // Check if user already exists with this Facebook ID
    const existingUser = await User.findOne({ provider: 'facebook', providerId: profile.id });
    if (existingUser) {
      return done(null, existingUser); // User exists, continue login
    }

    // Extract email if available
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';

    // Create new user if none found
    const newUser = await User.create({
      provider: 'facebook',
      providerId: profile.id,
      displayName: profile.displayName,
      email: email,
    });

    return done(null, newUser); // Successfully created user
  } catch (err) {
    // Log and pass any errors to Passport
    console.error('FacebookStrategy error:', err);
    return done(err, null);
  }
}));
