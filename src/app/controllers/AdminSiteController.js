const { singleMongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');
const cloudinary = require('../../config/cloudinary');
const SaleOder = require('../models/saleOder/saleOder.model');
const ImportOder = require('../models/importOder/importOder.model');

class CoursesController {
    //[GET] /admin/dashboard
    async dashboard(req, res, next) {
        // res.json(req.params)
        try {

            const saleOders = await SaleOder.find({});
            const totalSell = saleOders.reduce((sum, sale) => sum += sale.totalPrice, 0);
            const averageSellValue = (totalSell / saleOders.length).toFixed(0);
            const totalOder = saleOders.length;
            const resentOders = await SaleOder.find({})
                                    .limit(5)
                                    .populate('productList.product', 'name price thumbnails')

            // const imporOders = await ImportOder.find({});
            res.render('admin/dashboard', {
                layout: 'admin',
                totalSell,
                averageSellValue,
                totalOder,
                resentOders: multipleMongooseToObject(resentOders)

            });


        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = new CoursesController();
