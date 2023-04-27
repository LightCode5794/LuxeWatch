const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const productsController = require('../app/controllers/ProductsController');
const upload = require('../middlewares/uploadFiles');
// router.get('/:id/edit', categoriesController.edit);
// router.put('/:id', categoriesController.update);
// router.get('/create', categoriesController.create);
// router.post('/store', categoriesController.store);
// router.get('/', categoriesController.show);
// router.get('/', (req, res) => {
//     res.render('/admin/products/create');
// });
router.post('/store',upload.array('imagesProduct[]', 8), productsController.store)
router.get('/create',  productsController.create);
router.get('/', productsController.show)

module.exports = router;
