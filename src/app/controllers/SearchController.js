const { singleMongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');

class SearchController {
    //[GET] /admin/dashboard
    text(req, res, next) {
        res.render('client/search', {query: req.query.q});
       
    }
   
}

module.exports = new SearchController();