const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const SaleOder = require('../models/saleOder/saleOder.model');

class SaleOdersController {
    //[GET] /admin/saleOder
    show(req, res, next) {
        // res.json(req.params)
        SaleOder.find()
            .then((saleOders) => {
                res.render('admin/saleOders/show', {
                    layout: 'admin',
                    saleOders: multipleMongooseToObject(saleOders),
                });
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

    //[PUT] /admin/saleOder/:id
    update(req, res, next) {
        // res.send(req.params.id);
        SaleOder.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/saleOder'))
            .catch(next);
    }
}

module.exports = new SaleOdersController();
