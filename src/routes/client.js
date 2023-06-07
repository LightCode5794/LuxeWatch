const app = require('express');
const clientRoutes = app.Router();
const clientSiteRouter = require('./clientSite');
const checkoutController = require('./checkout');
const viewProductRouter = require('./viewProduct');
const authRouter = require('./auth');

clientRoutes.use('/products', viewProductRouter);
clientRoutes.use('/checkout', checkoutController);
clientRoutes.use('/', clientSiteRouter);

module.exports = clientRoutes;
