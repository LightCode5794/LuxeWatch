const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const User = require('../models/user/user.model');

class UsersController {
    //[GET] /admin/dashboard
    async index(req, res, next) {
        // res.json(req.params)
        try {
            const customers = await User.find();
            res.render('admin/customers/show', {
                layout: 'admin',
                customers: multipleMongooseToObject(customers),
            });
        } catch (error) {
            res.send(404, error.message);
        }
    }
}

module.exports = new UsersController();
