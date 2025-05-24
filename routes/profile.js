const express = require('express');
const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
};

router.get('/profile', ensureAuth, (req, res) => {
  res.send(`
    <h1>Welcome ${req.user.displayName}</h1>
    <p>Email: ${req.user.email}</p>
    <p>Provider: ${req.user.provider}</p>
    <a href="/logout">Logout</a>
  `);
});

router.get('/', (req, res) => {
  res.send(`
    <h1>Home</h1>
    <a href="/auth/google">Login with Google</a><br>
    <a href="/auth/facebook">Login with Facebook</a>
  `);
});

module.exports = router;