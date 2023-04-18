const adminSiteRouter = require('./adminSite');
const loginRouter = require('./login');
const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const adminRoutes = require('./admin');
const { isLoggedIn } = require('../middlewares/auth');

function routes(app) {
    // app.use('/', meRouter);

    // app.use('/courses', coursesRouter);

    // app.use('/news', newsRouter);
    // app.use('/', (req, res) => {
    //     res.render('admin/dashboard', { layout: 'admin' });

    // })
    // app.use('/admin/categories', categoriesRouter);
    app.use('/admin', isLoggedIn, adminRoutes);
    app.use('/login', loginRouter);
    app.use('/auth', authRouter);
}
module.exports = routes;
