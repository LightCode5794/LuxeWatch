const { singleMongooseToObject } = require('../../util/mongoose');

class UsersController {
    //[GET] /admin/dashboard
    index(req, res, next) {
        // res.json(req.params)
        res.send('hello user');
    }
}

module.exports = new UsersController();
