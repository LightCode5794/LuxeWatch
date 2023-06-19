const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const accountController = require('../app/controllers/AccountController');


router.get('/:id/edit', accountController.update);
router.get('/', accountController.show);

module.exports = router;
