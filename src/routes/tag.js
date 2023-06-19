const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const categoriesController = require('../app/controllers/TagsController');


router.get('/:id/delete', categoriesController.delete);
router.get('/', categoriesController.show);

module.exports = router;
