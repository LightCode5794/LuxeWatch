const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');
const SaleOder = require('../models/saleOder/saleOder.model');

class ClientController {
    //[GET]/checkout
    show(req, res, next) {
        res.render('client/checkout', {
            user: singleMongooseToObject(req.user)
        })
    }
    // [POST]/checkout/store
    async store(req, res, next) {

        try {

            const newOderData = {
                ...req.body,
                productList: JSON.parse(req.body.productList),
                user: req.user? req.user._id : null,
                status: 0,
            }

            const newOder = new SaleOder(newOderData);
            await newOder.save();
            res.render('client/checkoutSuccess', {
                user: singleMongooseToObject(req.user)
            })
        } catch (error) {
            res.send(error.message);
        }
        // res.json(newOder);
    }

}

module.exports = new ClientController();
