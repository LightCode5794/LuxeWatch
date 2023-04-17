const app = require('express');
const adminRoutes = app.Router();
const adminSiteRouter = require('./adminSite');
const loginRouter = require('./login');
const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const brandsRouter = require('./brands');

adminRoutes.use('/brands', brandsRouter)
adminRoutes.use('/categories', categoriesRouter);
adminRoutes.use('/', adminSiteRouter);

module.exports = adminRoutes
