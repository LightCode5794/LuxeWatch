const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const userController = require('../app/controllers/UserController');

// upload.array('imagesProduct[]', 8)
router.get('/', userController.index)

module.exports = router;
