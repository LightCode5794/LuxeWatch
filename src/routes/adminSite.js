const app = require('express');
const router = app.Router();
//const { isLoggedIn } = require ('../middlewares/auth')

const adminSiteController = require('../app/controllers/AdminSiteController');


router.use('/', adminSiteController.dashboard);

module.exports = router;