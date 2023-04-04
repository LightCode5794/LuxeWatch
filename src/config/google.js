const passport = require('passport');
//const User = require('../../models/user/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const keys = require('../../keys');

console.log(process.env.CALLBACK_URL);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('user profile is: ', profile);
        },
    ),
);
