const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Brand = require('../models/brand/brand.model');
const path = require('path');
const fs = require('fs');


class BranchController {
    //[GET] /admin/brands
    show(req, res, next) {
        // res.json(req.params)
        Brand.find()
            .then((brands) => {
                res.render('admin/brands/show',
                    {
                        layout: 'admin',
                        brands: multipleMongooseToObject(brands),
                    })
            })
            .catch(next);
    }
    // [GET] /admin/brands/create
    create(req, res, next) {
        res.render('admin/brands/create', {
            layout: 'admin',
        });
    }

    // [POST] /admin/branchs/store

    store(req, res, next) {

        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }
        const newBrand = new Brand({
            name: req.body.nameBrand,
            imgUrl: req.file.path
        })
        newBrand.save()
            .then(() => res.redirect('/admin/brands'))
            .catch(next)
    }

    //[GET] /admin/brands/:id/edit
    edit(req, res, next) {
        Brand.findById(req.params.id)
            .then((Brand) =>
                res.render('admin/brands/edit', {
                    layout: 'admin',
                    Brand: singleMongooseToObject(Brand),
                }),
            )
            .catch(next);
    }

    //[PUT] /admin/brands/:id
    update(req, res, next) {
        // res.send(req.params.id);
        Brand.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/brands'))
            .catch(next);
    }
}

module.exports = new BranchController();
