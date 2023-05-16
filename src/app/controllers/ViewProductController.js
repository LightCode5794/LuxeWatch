const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');
class ViewProductController {

    //[GET] /products/:slug
    show(req, res, next) {
        
        Product.findOne({ slug: req.params.slug })
            .populate('brand')
            .populate('category')
            .populate('tags')
            .then((product) => res.render('client/viewProduct', {
                product: singleMongooseToObject(product)
            }))
            .catch(next)
    }
}

module.exports = new ViewProductController();
