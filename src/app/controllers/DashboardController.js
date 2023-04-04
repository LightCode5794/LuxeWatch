const { singleMongooseToObject } = require('../../util/mongoose');

class CoursesController {
    //[GET] /admin/dashboard
    show(req, res, next) {
        res.render('admin/dashboard', { layout: 'admin' });
    }
}

module.exports = new CoursesController();
