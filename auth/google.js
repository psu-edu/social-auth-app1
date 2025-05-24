// Import necessary modules
const passport = require('passport'); // Main authentication middleware
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Google OAuth 2.0 strategy
const User = require('../models/User'); // Mongoose User model

// Register Google Strategy with Passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID from .env
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google client secret from .env
  callbackURL: '/auth/google/callback', // Redirect URL after Google login
}, 
// Verify callback function
async (accessToken, refreshToken, profile, done) => {
  try {
    // Basic validation: Check if required profile fields exist
    if (!profile || !profile.id || !profile.displayName || !profile.emails || !profile.emails[0]) {
      console.error('Malformed Google profile:', profile); // Log malformed input
      return done(new Error('Incomplete Google profile data'), null);
    }

    // Check if a user already exists with this Google ID
    const existingUser = await User.findOne({ provider: 'google', providerId: profile.id });
    if (existingUser) {
      return done(null, existingUser); // User exists, proceed with login
    }

    // Create a new user if not found
    const newUser = await User.create({
      provider: 'google',
      providerId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
    });

    return done(null, newUser); // Pass new user to session
  } catch (err) {
    // Log the error for debugging and return it to Passport
    console.error('GoogleStrategy error:', err);
    return done(err, null);
  }
}));
