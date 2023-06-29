const { singleMongooseToObject } = require('../../util/mongoose');




class AuthController {
    loginWithGoogle(req, res, next) {
        if (req.user.email === process.env.EMAIL_ADMIN) {
            res.redirect('/admin');
        } else {

            res.redirect('back');
        }
    }
    // [GET] /logout
    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
}

module.exports = new AuthController();
