const app = require('express');
const clientRoutes = app.Router();
const clientSiteRouter = require('./clientSite');
const loginRouter = require('./login');
const authRouter = require('./auth');

clientRoutes.use('/', clientSiteRouter);
// clientRoutes.get('/products', (req, res) => {
//     res.render('admin/products/create', {
//         layout: 'admin',
//     });
// });

module.exports = clientRoutes;
