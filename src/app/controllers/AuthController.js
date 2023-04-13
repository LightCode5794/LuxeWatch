const { singleMongooseToObject } = require('../../util/mongoose');

const passport = require('passport');
const UserService = require("../models/user");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('../../config/passport'); 
require('../../config/google');

class AuthController {
   

    loginWithGoogle(req, res, next) {
      
            if (req.user.email === process.env.EMAIL_ADMIN) {
                res.redirect('/admin');
            }
            else res.send('cliet side');
    }
     
}

module.exports = new AuthController();
