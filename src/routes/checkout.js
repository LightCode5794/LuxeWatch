const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const checkoutController = require('../app/controllers/ClientController');

// upload.array('imagesProduct[]', 8)
router.post('/store', checkoutController.store);
router.get('/', checkoutController.show)

module.exports = router;
