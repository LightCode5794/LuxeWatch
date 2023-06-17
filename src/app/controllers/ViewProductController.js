const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');
const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');
const ContentBasedRecommender = require('content-based-recommender');
const { response } = require('express');
const recommender = new ContentBasedRecommender({
    minScore: 0.05,
    maxSimilarDocuments: 100,
    maxVectorSize: 1000,
});

class ViewProductController {


    //[GET] /products/:slug
    async show(req, res, next) {

        function getContent(product) {
            let valuesArray = Object.values(product);
            let stringContent = '';

            for (let i in valuesArray) {

                if (typeof valuesArray[i] === 'string') {

                    stringContent += valuesArray[i] + ' ';
                }

            }
            stringContent += product['category'].name + ' ';
            const tagsArr = Object.values(product['tags']);
            tagsArr.forEach(tag => stringContent += tag.name + ' ')
            // console.log(stringContent);
            return stringContent;
        }

        async function getRecommendedProducts(inputProductId) {
            try {
                const products = await Product.find()
                    .select('-__v -createdAt -updatedAt -images -thumbnail -slug -price -currency -status -code')
                    .populate('tags', '-_id -__v -createdAt -updatedAt')
                    .populate('category', '-_id -__v -createdAt -updatedAt')
                    .populate('brand', '-_id -__v -createdAt -updatedAt -imgUrl -cloudinary_id')

                const documents = products.map(product => ({
                    id: product._id,
                    content: getContent(product.toObject())
                }))

                //train
                recommender.train(documents);
                const similarDocuments = recommender.getSimilarDocuments(inputProductId, 0, 15);

                const idsProduct = similarDocuments.map(item => item.id);
                const productsFound = await Product.find().where('_id').in(idsProduct);
                console.log(similarDocuments)
                return multipleMongooseToObject(productsFound);
            }
            catch (err) {
                res.sendError(err.message);
            }
        }
        try {
            const product = await Product.findOne({ slug: req.params.slug })
                .populate('brand')
                .populate('category')
                .populate('tags');
            //const products = await Product.find({ _id: { $ne: product._id } });
            const recommendedProducts = await getRecommendedProducts(product._id);

            res.render('client/viewProduct', {
                product: singleMongooseToObject(product),
                user: singleMongooseToObject(req.user),
                products: recommendedProducts,
            })
        } catch (error) {
            res.send(error.message);
        }

    }
}

module.exports = new ViewProductController();
