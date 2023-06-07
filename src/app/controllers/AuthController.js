const { singleMongooseToObject } = require('../../util/mongoose');




class AuthController {
    loginWithGoogle(req, res, next) {
        if (req.user.email === process.env.EMAIL_ADMIN) {
            res.redirect('/admin');
        } else {
            
            res.redirect('back');
        }
    }
}

module.exports = new AuthController();
