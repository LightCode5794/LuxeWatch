const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const viewProductsController = require('../app/controllers/ViewProductController');

router.get('/:slug', viewProductsController.show)

module.exports = router;
