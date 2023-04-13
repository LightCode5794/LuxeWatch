const { singleMongooseToObject } = require('../../util/mongoose');

class CoursesController {
    //[GET] /admin/dashboard
    dashboard(req, res, next) {
       // res.json(req.params)
        res.render('admin/dashboard', { layout: 'admin' });
    }
}

module.exports = new CoursesController();
