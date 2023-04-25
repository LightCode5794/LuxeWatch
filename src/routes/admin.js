const app = require('express');
const adminRoutes = app.Router();
const adminSiteRouter = require('./adminSite');
const loginRouter = require('./login');
const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const brandsRouter = require('./brands');
const productsRouter = require('./products');

adminRoutes.use('/brands', brandsRouter);
adminRoutes.use('/categories', categoriesRouter);
adminRoutes.use('/products', productsRouter);
//adminRoutes.use('/', adminSiteRouter);
// adminRoutes.get('/products', (req, res) => {
//     res.render('admin/products/create', {
//         layout: 'admin',
//     });
// });

module.exports = adminRoutes;
