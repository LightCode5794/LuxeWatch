const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');
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
            const brands = await Brand.find({});
            const tags = await Tag.find({});
            //res.send(categories)
            res.render('admin/products/create', {
                layout: 'admin',
                categories: multipleMongooseToObject(categories),
                brands: multipleMongooseToObject(brands),
                tags: multipleMongooseToObject(tags),
            });
        }
        catch (err) {
            res.status(401).send(err.message);
        }

    }

    // [POST] /admin/products/store

    store(req, res, next) {
    
       if (!req.files) {
        next(new Error('No files uploaded!'));
        return;
    }
    // Upload image to cloudinary
    //const result = await cloudinary.uploader.upload(req.file.path);

    //res.send(req.file.path);
    // const newProduct = {
    //     ...req.body,
    //     images: req.files.map(file => file.path),
    // }
    
    const newProduct = new Product({
        ...req.body,
        images: req.files.map(file => file.path),
    });
    
    newProduct
        .save()
        .then(() => res.send(newProduct))
        .catch(next);
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
