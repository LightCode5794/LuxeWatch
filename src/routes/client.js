const app = require('express');
const clientRoutes = app.Router();
const clientSiteRouter = require('./clientSite');
const checkoutRouter = require('./checkout');
const viewProductRouter = require('./viewProduct');
const searchRouter = require('./search');
const userRouter = require('./user');
const authRouter = require('./auth');
const brandRouter = require('./brands');
const accountRouter = require('./account');

clientRoutes.use('/products', viewProductRouter);
clientRoutes.use('/checkout', checkoutRouter);
clientRoutes.use('/user', userRouter);
clientRoutes.use('/search', searchRouter);
clientRoutes.use('/brands', brandRouter);
clientRoutes.use('/account', accountRouter);
clientRoutes.use('/', clientSiteRouter);

module.exports = clientRoutes;
