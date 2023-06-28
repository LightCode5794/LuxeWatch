const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const saleOdersController = require('../app/controllers/SaleOdersController');

//router.get('/:id/edit', saleOdersController.edit);
// router.put('/:id', saleOdersController.update);
// router.get('/create', saleOdersController.create);
//router.post('/store/:idProduct', saleOdersController.store);
router.get('/:id/view', saleOdersController.viewDetail);
router.put('/:id/status', saleOdersController.updateStatus);
router.get('/', saleOdersController.show);

module.exports = router;
