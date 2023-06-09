const adminSiteRouter = require('./adminSite');
const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const adminRoutes = require('./admin');
const clientRoutes = require('./client');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');


function routes(app) {
    app.use('/admin', isAdmin, adminRoutes);
    app.use('/auth', authRouter);
    app.use('/', clientRoutes);
}
module.exports = routes;
