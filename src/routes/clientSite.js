const app = require('express');
const router = app.Router();
//const { isLoggedIn } = require ('../middlewares/auth')

const clientSiteController = require('../app/controllers/ClientSiteController');

router.get('/brands/:name', clientSiteController.productByBrand)
router.use('/login',clientSiteController.login)
router.use('/', clientSiteController.home);


module.exports = router;
