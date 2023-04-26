const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
class ProductsController {
    //[GET] /admin/categories
    show(req, res, next) {
        // res.json(req.params)
        // Product.find()
        //     .then((categories) => {
        //         res.render('admin/categories/show', {
        //             layout: 'admin',
        //             categories: multipleMongooseToObject(categories),
        //         });
        //     })
        //     .catch(next);
        res.render('admin/products/show', {
            layout: 'admin',
        });
    }
    // [GET] /admin/categories/create
    async create(req, res, next) {
        try {
            const categories = await Category.find({});
            const brands = await Brand.find({})
            //res.send(categories)
            res.render('admin/products/create', {
                layout: 'admin',
                categories: multipleMongooseToObject(categories),
                brands: multipleMongooseToObject(brands),
            });
        }
        catch (err) {
            res.status(401).send(err.message);
        }

    }

    // [POST] /admin/categories/store

    store(req, res, next) {
        const newCategory = new Product(req.body);
        newCategory.save().then(res.redirect('/admin/categories')).catch(next);
    }

    //[GET] /admin/categories/:id/edit

    edit(req, res, next) {
        Product.findById(req.params.id)
            .then((Product) =>
                res.render('admin/categories/edit', {
                    layout: 'admin',
                    Product: singleMongooseToObject(Product),
                }),
            )
            .catch(next);
    }

    //[PUT] /admin/categories/:id
    update(req, res, next) {
        // res.send(req.params.id);
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/categories'))
            .catch(next);
    }
}

module.exports = new ProductsController();
