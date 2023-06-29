const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');
const cloudinary = require('../../config/cloudinary');
const SaleOder = require('../models/saleOder/saleOder.model');
const ImportOder = require('../models/importOder/importOder.model');
class ProductsController {

    //[GET] /admin/products
    async show(req, res, next) {
        async function getStock(productId) {
            try {
                let numSale, numImport, isStock;
                const saleOder = await SaleOder.find({ "productList.product": productId }).select('productList');
                const importOder = await ImportOder.find({ product: productId }).select('product quantity')
                // caculate numSale and numImport
                if (saleOder.length > 0) {
                    saleOder.forEach(item => {
                        numSale = item.productList.reduce((sum, acc) => {
                            if (String(acc.product) == String(productId)) {

                                sum += acc.count;
                            }
                            return sum;
                        }, 0)
                    })
                } else {
                    numSale = 0;
                }

                numImport = importOder.reduce((sum, acc) => {
                    if (String(acc.product) == String(productId)) {
                        sum += acc.quantity;
                    }
                    return sum;
                }, 0)


                console.log('numSale: ' + numSale)
                console.log('numImport: ' + numImport)
                console.log((numImport - numSale))
                const stock = numImport - numSale;
                return stock > 0 ? stock : 0;

            } catch (error) {
                res.send(error.message);
            }
        }

        try {
            const products = await Product.find()
                .populate('brand')
                .populate('category')
                .populate('tags')


            const productsObj = await Promise.all(products.map(async (product) => ({
                ...product.toObject(),
                stock: await getStock(product._id)
                //total: saleOder.productList.reduce((sum, item) => sum + item.product.price * item.count, 0)
            })));

            // res.json(productsObj);
            res.render('admin/products/show', {
                layout: 'admin',
                products: productsObj,
            });
        } catch (error) {
            res.send(error.message);
        }
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
            const { status, tags, thumbnail, images, ...rest } = req.body;

            const newStatus = status ? 'Published' : 'Hidden';

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
                thumbnail: req.files['thumbnail'][0],
                images: req.files['imagesProduct[]'],
            });

            // res.json(newProduct);
            await newProduct.save();

            res.redirect('/admin/products');

        }
        catch (err) {
            res.status(401).send(err.message);
        }
    }

    //[GET] /admin/products/:id/edit

    async edit(req, res, next) {

        try {

            const categories = await Category.find({});
            const brands = await Brand.find({});
            const tags = await Tag.find({});
            const product = await Product.findById(req.params.id)


            res.render('admin/products/edit', {
                layout: 'admin',

                categories: multipleMongooseToObject(categories),
                brands: multipleMongooseToObject(brands),
                tags: multipleMongooseToObject(tags),
                product: singleMongooseToObject(product),
            })

        } catch (error) {
            res.send(error.message);
        }
    }

    //[GET] /admin/products/:id/view

    async view(req, res, next) {

        try {

            const categories = await Category.find({});
            const brands = await Brand.find({});
            const tags = await Tag.find({});
            const productView = await Product.findById(req.params.id)
            const saleOders = await SaleOder.find({ "productList.product": productView._id });
            const imporOders = await ImporOder.find({ product: productView._id });

            res.render('admin/products/view', {
                layout: 'admin',
                categories: multipleMongooseToObject(categories),
                brands: multipleMongooseToObject(brands),
                tags: multipleMongooseToObject(tags),
                product: singleMongooseToObject(productView),
            })

        } catch (error) {
            res.send(error.message);
        }
    }

    //[PUT] /admin/products/:id
    async update(req, res, next) {
        try {

            const { status, tags, thumbnail, images, oldThumb, oldImages, ...rest } = req.body;

            const newStatus = status ? 'Published' : 'Hidden';

            const newTags = tags.filter(tag => !mongoose.isValidObjectId(tag)).map(tag => ({ name: tag }));
            const dataTags = tags.filter(tag => mongoose.isValidObjectId(tag));
            //crate new tags and get id new tags
            const newTagsId = await Tag.insertMany(newTags)
                .then(tags => tags.map(tag => tag._id));

            const data = {
                ...rest,
                status: newStatus,
                tags: [...dataTags, ...newTagsId],
            }
            const product = await Product.findById(req.params.id);
            // handle image
            if (req.files['thumbnail']) {
                await cloudinary.uploader.destroy(product.thumbnail.filename);
                const { path, filename } = req.files['thumbnail'][0];
                data.thumbnail = {
                    path,
                    filename
                }
            }
            if (req.files['imagesProduct[]']) {
                const oldImagesArr = JSON.parse(oldImages);

                // delete old images on cloudianry
                await cloudinary.api.delete_resources(oldImagesArr);

                //update url new images product
                const newImagesObj = [];
                product.images.forEach(item => {
                    if (!oldImagesArr.includes(item.filename)) {
                        newImagesObj.push(item);
                    }
                });

                const newImagesUrl = req.files['imagesProduct[]'];
                newImagesUrl.forEach(item => {
                    const { path, filename } = item;
                    newImagesObj.push({ path, filename })
                })
                data.images = newImagesObj;
            }

            await Product.findByIdAndUpdate(req.params.id, data, {
                new: true
            });

            res.redirect('/admin/products')
        } catch (error) {
            res.json({ error: error.message });
        }

        // res.send(req.params.id);
        // Product.updateOne({ _id: req.params.id }, req.body)
        //     .then(() => res.redirect('/admin/products'))
        //     .catch(next);
    }
    //[DELETE] /admin/products/:id
    async delete(req, res, next) {
        try {
            await Product.delete({ _id: req.params.id });
            res.redirect('/admin/products');
        } catch (error) {
            res.json({ error: error.message });
        }
    }
}

module.exports = new ProductsController();
