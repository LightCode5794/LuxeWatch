const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');
const SaleOder = require('../models/saleOder/saleOder.model');

class AccountController {
    //[GET]/checkout
    show(req, res, next) {
        res.render('client/account', {
            user: singleMongooseToObject(req.user)
        })
    }
    // [POST]/checkout/store
    update(req, res, next) {


        // const newOderData = {
        //     ...req.body,
        //     productList: JSON.parse(req.body.productList),
        //     user: req.user ? req.user._id : null ,
        //     status: 'Pending',
        // }

        // const newOder = new SaleOder(newOderData);
        // newOder.save();
        // res.json(newOder);
    }

}

module.exports = new AccountController();
