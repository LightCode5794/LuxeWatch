const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');

class ClientSiteController {
    //[GET] /admin/dashboard
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
            });

            // .then((products) => {
            //     res.render('home', {
            //         products: multipleMongooseToObject(products),
            //     });

            // })
            // .catch(next);
        } catch (err) {
            res.status(401).send(err.message);
        }

    }
}

module.exports = new ClientSiteController();
