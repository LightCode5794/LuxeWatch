const app = require('express');
const router = app.Router();
const { isLoggedIn } = require('../middlewares/auth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = require('../middlewares/uploadFiles');

const brandsController = require('../app/controllers/BrandsController');


router.get('/:id/edit', brandsController.edit);
router.put('/:id',  upload.single('imageBrand') ,brandsController.update);
router.get('/create', brandsController.create);
router.post('/store', upload.single('imageBrand'), brandsController.store);
router.get('/', brandsController.show);

module.exports = router;
