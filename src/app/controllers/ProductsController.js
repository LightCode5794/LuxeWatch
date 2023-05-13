const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');
class ProductsController {

    //[GET] /admin/products
    show(req, res, next) {
        Product.find()
            .populate('brand')
            .populate('category')
            .populate('tags')
            .then((products) => {
                res.render('admin/products/show', {
                    layout: 'admin',
                    products: multipleMongooseToObject(products),
                });

            })
            .catch(next);
    }
    // [GET] /admin/products/create
    async create(req, res, next) {
        try {
            const categories = await Category.find({});
            const brands = await Brand.find({});
            const tags = await Tag.find({});
            //res.send(products)
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

    async store(req, res, next) {
        try {
            // if (!req.files) {
            //     next(new Error('No files uploaded!'));
            //     return;
            // }
            //res.send(req.files);
            //return;
            const { status, tags, thumbnail, images, ...rest } = req.body;

            const newStatus = status? 'Published' : 'Hidden';

            const newTags = tags.filter(tag => !mongoose.isValidObjectId(tag)).map(tag => ({ name: tag }));
            const dataTags = tags.filter(tag => mongoose.isValidObjectId(tag));

            //crate new tags and get id new tags
            const newTagsId = await Tag.insertMany(newTags)
                .then(tags => tags.map(tag => tag._id));

            //create new product
            const newProduct = new Product({
                ...rest,
                status: newStatus,
                tags: [...dataTags, ...newTagsId],
                thumbnail: req.files['thumbnail'][0].path,
                images: req.files['imagesProduct[]'].map(file => file.path),
            });

            await newProduct.save();

            res.redirect('/admin/products');

        }
        catch (err) {
            res.status(401).send(err);
        }


    }

    //[GET] /admin/products/:id/edit

    edit(req, res, next) {
        Product.findById(req.params.id)
            .then((Product) =>
                res.render('admin/products/edit', {
                    layout: 'admin',
                    Product: singleMongooseToObject(Product),
                }),
            )
            .catch(next);
    }

    //[PUT] /admin/products/:id
    update(req, res, next) {
        // res.send(req.params.id);
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/products'))
            .catch(next);
    }
}

module.exports = new ProductsController();
