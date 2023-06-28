const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const ImportOder = require('../models/importOder/importOder.model');

class ImportOdersController {
    //[GET] /admin/importOder
    show(req, res, next) {
        // res.json(req.params)
        ImportOder.find()
            .populate('product', 'name thumbnail')
            .then((importOders) => {
                // res.json(importOders);
                res.render('admin/importOders/show', {
                    layout: 'admin',
                    importOders: multipleMongooseToObject(importOders),
                });
            })
            .catch(next);
    }

    // [POST] /admin/importOders/store
    store(req, res, next) {
        // res.send({...req.body, ...req.params});
        const newImportOder = new ImportOder({
            product: req.params.idProduct,
            ...req.body,
        });
        newImportOder.save()
            .then(() => res.redirect('/admin/importOders'))
            .catch(next);
    }

    //[GET] /admin/importOder/:id/edit

    edit(req, res, next) {
        ImportOder.findById(req.params.id)
            .then((ImportOder) =>
                res.render('admin/importOder/edit', {
                    layout: 'admin',
                    ImportOder: singleMongooseToObject(ImportOder),
                }),
            )
            .catch(next);
    }

    //[PUT] /admin/importOder/:id
    update(req, res, next) {
        // res.send(req.params.id);
        ImportOder.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/importOder'))
            .catch(next);
    }
}

module.exports = new ImportOdersController();
