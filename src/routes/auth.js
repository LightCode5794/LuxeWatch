const app = require('express');
const router = app.Router();
const passport = require('passport');
const flash = require("express-flash");
const session = require('express-session');
const authController = require('../app/controllers/AuthController');

//config router
// router.use(
//     session({
//         secret: "secr3t",
//         resave: false,
//         saveUninitialized: true,
//     })
// );
// require("../config/passport")
// require('../config/google');
// router.use(flash());
// router.use(passport.initialize());
// router.use(passport.session())


//api
// router.get('/google/callback', function(req, res, next) {
//     passport.authenticate('google', {
//         failureRedirect: '/login',
//         //successRedirect: '/admin',
//         failureFlash: true,
//         successFlash: 'Successfully logged in!',
//     }, (err, newUser, currentUser) => {
//        if(err) return next(err);
//        req.currentUser = currentUser;
//       return next();
//     })(req, res, next);
// }, (req, res, next) => {

//     req.session.currentUser = req.currentUser;
//     res.redirect('/admin');
// });

router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
      successRedirect: '/admin',
      failureFlash: true,
      successFlash: 'Successfully logged in!',
    })
  );


router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);




module.exports = router;