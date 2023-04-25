const app = require('express');
const router = app.Router();

const loginController = require('../app/controllers/LoginController');

//router.get('/', dashboardController.show);

router.get('/', loginController.show);

module.exports = router;
