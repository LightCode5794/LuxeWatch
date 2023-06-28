const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const SaleOder = require('../models/saleOder/saleOder.model');

class SaleOdersController {
    //[GET] /admin/saleOder
    show(req, res, next) {
        // res.json(req.params)

        SaleOder.find({})
            .populate('productList.product', 'name price thumbnails')
            .then((saleOders) => {
                // const saleOdersObj = saleOders.map((saleOder) => ({
                //     ...saleOder.toObject(),
                //     total: saleOder.productList.reduce((sum, item) => sum + item.product.price * item.count, 0)
                // }));
                res.render('admin/saleOders/show', {
                    layout: 'admin',
                    saleOders: multipleMongooseToObject(saleOders),

                });
                //res.json(saleOdersObj)
            })
            .catch(next);
    }

    // [POST] /admin/saleOders/store
    store(req, res, next) {
        // res.send({...req.body, ...req.params});
        const newsaleOder = new saleOder({
            product: req.params.idProduct,
            ...req.body,
        });
        newsaleOder.save()
            .then(() => res.redirect('/admin/saleOders'))
            .catch(next);
    }

    //[GET] /admin/saleOder/:id/edit
    edit(req, res, next) {
        SaleOder.findById(req.params.id)
            .then((saleOder) =>
                res.render('admin/saleOder/edit', {
                    layout: 'admin',
                    saleOder: singleMongooseToObject(saleOder),
                }),
            )
            .catch(next);
    }

    //[PUT] /admin/saleOder/:id/status
    updateStatus(req, res, next) {
        // res.json(req.body);
        SaleOder.updateOne({ _id: req.params.id }, { status: req.body.newStatus })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PUT] /admin/saleOder/:id
    update(req, res, next) {
        // res.send(req.params.id);
        SaleOder.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/saleOder'))
            .catch(next);
    }

    //[GET] /admin/saleOders/:id/view

    async viewDetail(req, res, next) {
        try {
            const oder = await SaleOder.findOne({ _id: req.params.id })
                .populate('productList.product', 'name price thumbnail')
                .populate('user')

           //  res.json(oder);

            res.render('admin/saleOders/view', {
                layout: 'admin',
                oder: singleMongooseToObject(oder),
            });

        } catch (error) {

        }
    }
}

module.exports = new SaleOdersController();
