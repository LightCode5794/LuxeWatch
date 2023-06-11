const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const searchController = require('../app/controllers/SearchController');


router.get('/', searchController.text);

module.exports = router;
