const dashboardRouter = require('./dashboard');
const loginRouter = require('./login');

function routes(app) {
    // app.use('/', meRouter);

    // app.use('/courses', coursesRouter);

    // app.use('/news', newsRouter);
    // app.use('/', (req, res) => {
    //     res.render('admin/dashboard', { layout: 'admin' });

    // })
    app.use('/admin', dashboardRouter);
    app.use('/login', loginRouter);
}
module.exports = routes;
