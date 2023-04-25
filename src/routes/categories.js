const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const categoriesController = require('../app/controllers/CategoriesController');

router.get('/:id/edit', categoriesController.edit);
router.put('/:id', categoriesController.update);
router.get('/create', categoriesController.create);
router.post('/store', categoriesController.store);
router.get('/', categoriesController.show);

module.exports = router;
