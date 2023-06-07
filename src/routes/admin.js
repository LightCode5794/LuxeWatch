const app = require('express');
const adminRoutes = app.Router();
const adminSiteRouter = require('./adminSite');
const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const brandsRouter = require('./brands');
const productsRouter = require('./products');
const importOder = require('./importOder');

adminRoutes.use('/brands', brandsRouter);
adminRoutes.use('/categories', categoriesRouter);
adminRoutes.use('/products', productsRouter);
adminRoutes.use('/importOders', importOder);
adminRoutes.use('/', adminSiteRouter);

module.exports = adminRoutes;
