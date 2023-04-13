const passport = require('passport');
//const User = require('../../models/user/user.model');
const UserService = require("../app/models/user");
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
             //console.log('user profile is: ', profile);
            const id = profile.id;
            const email = profile.emails[0].value;
            const firstName = profile.name.givenName;
            const lastName = profile.name.familyName;
            const profilePhoto = profile.photos[0].value;
            const source = "google";

            const currentUser = await UserService.getUserByEmail({
                email,
            });

            if (!currentUser) {
                const newUser = await UserService.addGoogleUser({
                    id,
                    email,
                    firstName,
                    lastName,
                    profilePhoto,
                });
                return done(null, newUser);
            }

            if (currentUser.source != "google") {
                //return error
                return done(null, false, {
                    message: `You have previously signed up with a different signin method`,
                });
            }

            currentUser.lastVisited = new Date();
            return done(null, currentUser);
        },
    ),
);
