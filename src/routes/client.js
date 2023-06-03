const app = require('express');
const clientRoutes = app.Router();
const clientSiteRouter = require('./clientSite');
const clientController = require('../app/controllers/ClientController');
const viewProductRouter = require('./viewProduct');
const loginRouter = require('./login');
const authRouter = require('./auth');

clientRoutes.use('/products', viewProductRouter);
clientRoutes.get('/checkout', clientController.checkout);
clientRoutes.use('/', clientSiteRouter);

module.exports = clientRoutes;
