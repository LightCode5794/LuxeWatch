const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');

const importOdersController = require('../app/controllers/importOdersController');

//router.get('/:id/edit', importOdersController.edit);
// router.put('/:id', importOdersController.update);
// router.get('/create', importOdersController.create);
router.post('/store/:idProduct', importOdersController.store);
router.get('/', importOdersController.show);

module.exports = router;
