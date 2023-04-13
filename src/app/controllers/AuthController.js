const { singleMongooseToObject } = require('../../util/mongoose');


class AuthController {
   

    loginWithGoogle(req, res, next) {
        res.send(req.user);
        // res.json(req.body);
        //res.render('admin/dashboard', { layout: 'admin' });
    }

     
}

module.exports = new AuthController();
