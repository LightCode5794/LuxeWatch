const { singleMongooseToObject } = require('../../util/mongoose');

class ClientSiteController {
    //[GET] /admin/dashboard
    home(req, res, next) {
       // res.send('home page')
        // res.json(req.params)
        res.render('home');
    }
}

module.exports = new ClientSiteController();
