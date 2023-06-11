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
                .sort({'date': -1})
                .limit(10)
            const brands = await Brand.find().sort({'date': -1})
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
    async  productByBrand(req, res, next) {
        try {
            const brand = await Brand.findOne({name: req.params.name});
            const products = await Product.find({brand: brand})
            // res.json(products);
            
            res.render('client/search', {
                query: req.params.name,
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
            });

        } catch (err) {
            res.status(401).send(err.message);
        }

    }
     //[GET] /categories/:name
     async  productByCategory(req, res, next) {
        try {
            const category = await Category.findOne({name: req.params.name});
            const products = await Product.find({category: category})
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
      async  productByTag(req, res, next) {
        try {
            const tag = await Tag.findOne({name: req.params.name});
            const products = await Product.find({tags: tag})
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
