const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = require('../middlewares/uploadFiles');

const branchController = require('../app/controllers/BrandsController');

router.get('/:id/edit', branchController.edit);
router.put('/:id', branchController.update);
router.get('/create', branchController.create);
router.post('/store', upload.single('imageBrand'), branchController.store);
router.get('/', branchController.show);

module.exports = router;
