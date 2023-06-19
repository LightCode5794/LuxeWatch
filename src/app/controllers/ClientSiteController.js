const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');


class ClientSiteController {
    //[GET] /
    async home(req, res, next) {
        try {
            const products = await Product.find()
                .populate('brand')
                .populate('category')
                .populate('tags')
                .sort({ 'date': -1 })
                .limit(10)
            const brands = await Brand.find().sort({ 'date': -1 })
            //.limit(5);

            res.render('home', {
                brands: multipleMongooseToObject(brands),
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
            });

        } catch (err) {
            res.status(401).send(err.message);
        }

    }
    //[GET] /login
    login(req, res, next) {
        res.render('login');
    }

    //[GET] /brands/:name
    async productByBrand(req, res, next) {
        try {

            const brand = await Brand.findOne({ name: req.params.name });
            const products = await Product.find({ brand: brand })
            // res.json(products);
            res.render('client/productByBrand', {
                query: req.params.name,
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
            });


        } catch (err) {
            res.status(401).send(err.message);
        }

    }
    //[GET] /brands/:name/filter
    async productByBrandAndFilter(req, res, next) {
        function getCategory(value) {
            switch (value) {
                case 0:
                    return null;
                case 1:
                    return 'woman'
                case 2:
                    return 'man'
                case 3:
                    return 'unisex'
                default: return null
            }
        }
        async function getProductsByPrice(brand, value) {
            switch (value) {
                case 0:
                    return products;
                case 1:
                    return await products.where('price').lte(20000000);
                case 2:
                    return await products.where('price').within(20000001, 100000000);
                case 3:
                    return await products.where('price').within(100000001, 500000000);
                case 4:
                    return await products.where('price').gt(500000000);
                default:
                    return products;
            }
        }

        try {
            let x = undefined;
            const brand = await Brand.findOne({ name: req.params.name });
            const category = await Category.findOne({ name: getCategory(Number(req.query.category)) });
            let products;
            if (category) {
                products = await Product.find({ brand: brand, category: category });
            } else {
              
            }
            // res.json(products);
            res.render('client/productByBrand', {
                query: req.params.name,
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
            });


        } catch (err) {
            res.status(401).send(err.message);
        }

    }
    //[GET] /categories/:name
    async productByCategory(req, res, next) {
        try {
            const category = await Category.findOne({ name: req.params.name });
            const products = await Product.find({ category: category })
            //res.json(products);

            res.render('client/search', {
                query: req.params.name,
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
            });

        } catch (err) {
            res.status(401).send(err.message);
        }

    }
    //[GET] /tags/:name
    async productByTag(req, res, next) {
        try {
            const tag = await Tag.findOne({ name: req.params.name });
            const products = await Product.find({ tags: tag })
            //res.json(products);

            res.render('client/search', {
                query: req.params.name,
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
            });

        } catch (err) {
            res.status(401).send(err.message);
        }

    }
}

module.exports = new ClientSiteController();
