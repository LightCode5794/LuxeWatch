const dashboardRouter = require('./dashboard');

function routes(app) {
    // app.use('/', meRouter);

    // app.use('/courses', coursesRouter);

    // app.use('/news', newsRouter);
    // app.use('/', (req, res) => {
    //     res.render('admin/dashboard', { layout: 'admin' });

    // })
    app.use('/admin', dashboardRouter);
}
module.exports = routes;
