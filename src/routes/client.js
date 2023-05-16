const app = require('express');
const clientRoutes = app.Router();
const clientSiteRouter = require('./clientSite');
const viewProductRouter = require('./viewProduct');
const loginRouter = require('./login');
const authRouter = require('./auth');

clientRoutes.use('/products', viewProductRouter);
clientRoutes.use('/', clientSiteRouter);

module.exports = clientRoutes;
