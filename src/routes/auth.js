const app = require('express');
const router = app.Router();
const passport = require('passport');
const authController = require('../app/controllers/AuthController');


router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        // successRedirect: '/admin',
        failureFlash: true,
        successFlash: 'Successfully logged in!',
    }),
    authController.loginWithGoogle,
);

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);

module.exports = router;
