// Import the Express framework
const express = require('express');

// Import Passport for authentication
const passport = require('passport');

// Create a new Express router instance
const router = express.Router();

// -----------------------
// ✅ Google Authentication
// -----------------------

// Route to start Google OAuth login flow
// The user will be redirected to Google's login page with access to their profile and email
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route that Google redirects to after user login
// On success, redirect to /profile
// On failure, redirect to /auth/failure
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/profile'); // If authentication succeeds, redirect to profile page
  }
);

// -----------------------
// ✅ Facebook Authentication
// -----------------------

// Route to start Facebook OAuth login flow
// The user will be redirected to Facebook's login page requesting access to email
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Callback route that Facebook redirects to after user login
// On success, redirect to /profile
// On failure, redirect to /auth/failure
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/profile'); // If authentication succeeds, redirect to profile page
  }
);

// -----------------------
// ✅ Authentication Failure Handler
// -----------------------

// This route handles failed authentication attempts
// Logs the IP address and timestamp of the failure for auditing
router.get('/auth/failure', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get client IP
  console.error(`❌ Login failed | IP: ${ip} | Time: ${new Date().toISOString()}`); // Log the failure
  res.status(401).send('Authentication failed. Please try again.'); // Respond with 401 Unauthorized
});

// -----------------------
// ✅ Logout Route
// -----------------------

// This route logs out the user and redirects them to the home page
router.get('/logout', (req, res, next) => {
  try {
    // req.logout is asynchronous and can take a callback
    req.logout((err) => {
      if (err) {
        console.error('❌ Logout error:', err); // Log logout error
        return next(err); // Pass error to Express error handler
      }
      res.redirect('/'); // Redirect to home after successful logout
    });
  } catch (err) {
    console.error('❌ Unexpected logout error:', err); // Catch and log unexpected errors
    res.status(500).send('Logout failed.'); // Respond with 500 Internal Server Error
  }
});

// Export the router to be used in the main app
module.exports = router;
