const app = require('express');
const router = app.Router();

const dashboardController = require('../app/controllers/DashboardController');

router.get('/', dashboardController.show);

module.exports = router;
