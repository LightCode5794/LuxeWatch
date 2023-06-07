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
                .populate('tags');
            const brands = await Brand.find();

            res.render('home', {
                brands: multipleMongooseToObject(brands),
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
            });

        } catch (err) {
            res.status(401).send(err.message);
        }

    }
    login(req, res, next) {
        res.render('login');
    }
}

module.exports = new ClientSiteController();
