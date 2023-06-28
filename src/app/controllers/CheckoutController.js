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
        // try {
        //     const products = await Product.find()
        //         .populate('brand')
        //         .populate('category')
        //         .populate('tags');
        //     const brands = await Brand.find();

        //     res.render('home', {
        //         brands: multipleMongooseToObject(brands),
        //         products: multipleMongooseToObject(products),
        //     });

        // } catch (err) {
        //     res.status(401).send(err.message);
        // }
    }
    // [POST]/checkout/store
    store(req, res, next) {


        const newOderData = {
            ...req.body,
            productList: JSON.parse(req.body.productList),
            user: req.user._id,
            status: 0,
        }

        const newOder = new SaleOder(newOderData);
        newOder.save();
        res.json(newOder);
    }

}

module.exports = new ClientController();
