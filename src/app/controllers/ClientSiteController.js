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
        async function getProductsByPrice(brand, category, value) {
            if (category) {
                switch (value) {
                    case 0:
                        // console.log(brand._id + 'ahihihi');
                        return await Product.find({ brand: brand, category: category });
                    case 1:
                        console.log('case 1');
                        return await Product.find({ brand: brand, category: category, price: { $lte: 20000000 } })
                    case 2:
                        console.log('case 2');
                        return await Product.find({ brand: brand, category: category, price: { $gt: 20000001, $lte: 100000000 } });
                    case 3:
                        console.log('case 3');
                        return await Product.find({ brand: brand, category: category, price: { $gt: 100000001, $lte: 500000000 } });
                    case 4:
                        console.log('case 4');
                        return await Product.find({ brand: brand, category: category, price: { $gt: 500000000 } })
                    default:
                        return await Product.find({ brand: brand, category: category });
                }
            } else {
                switch (value) {
                    case 0:
                        // console.log(brand._id + 'ahihihi');
                        return await Product.find({ brand: brand });
                    case 1:
                        console.log('case 1');
                        return await Product.find({ brand: brand, price: { $lte: 20000000 } })
                    case 2:
                        console.log('case 2');
                        return await Product.find({ brand: brand, price: { $gt: 20000001, $lte: 100000000 } });
                    case 3:
                        console.log('case 3');
                        return await Product.find({ brand: brand, price: { $gt: 100000001, $lte: 500000000 } });
                    case 4:
                        console.log('case 4');
                        return await Product.find({ brand: brand, price: { $gt: 500000000 } })
                    default:
                        return await Product.find({ brand: brand, });
                }

            }
        }

        try {

            const brand = await Brand.findOne({ name: req.params.name });
            const category = await Category.findOne({ name: getCategory(Number(req.query.category)) });
            const products = await getProductsByPrice(brand, category, Number(req.query.price));
            res.render('client/productByBrand', {
                query: req.params.name,
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
                selectedCategory: req.query.category,
                selectedPrice: req.query.price
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
