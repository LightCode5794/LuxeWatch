const { singleMongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

const Product = require('../models/product/product.model');
const Category = require('../models/category/category.model');
const Brand = require('../models/brand/brand.model');
const Tag = require('../models/tag/tag.model');

const ContentBasedRecommender = require('content-based-recommender')
const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocuments: 100,
    maxVectorSize: 1000,
});

class SearchController {
    //[GET] /admin/dashboard
    async text(req, res, next) {
        try {

            const query = {
                $text: {
                    $search: req.query.q,
                    fuzzy: {

                    }
                }
            };
            const products = await Product.find(query);

            // const products = await Product.aggregate([
            //     {
            //         $match: {
            //             $text: { $search: req.query.q }
            //         }
            //     },

            //     {
            //         $lookup: {
            //             from: "tags",
            //             localField: "tags",
            //             foreignField: "_id",
            //             as: "tags",
            //         }

            //     },
            //     {
            //         $lookup: {
            //             from: "categories",
            //             localField: "category",
            //             foreignField: "_id",
            //             as: "category",
            //         },
            //     },


            // ])


            // const products = await Product.find()
            //     .select('-__v -createdAt -updatedAt -images -thumbnail -slug -price -currency -status -code')
            //     .populate('tags', '-_id -__v -createdAt -updatedAt')
            //     .populate('category', '-_id -__v -createdAt -updatedAt')
            //     .populate('brand', '-_id -__v -createdAt -updatedAt -imgUrl -cloudinary_id')

            // function getContent(product) {
            //     let valuesArray = Object.values(product);
            //     let stringContent = '';

            //     for (let i in valuesArray) {

            //         if (typeof valuesArray[i] === 'string' || typeof valuesArray[i] === 'number') {

            //             stringContent += valuesArray[i] + ' ';
            //         }

            //     }
            //     stringContent += product['category'].name + ' ' + product['category'].description + ' ';
            //     const tagsArr = Object.values(product['tags']);
            //     tagsArr.forEach(tag => stringContent += tag.name + ' ')
            //     // console.log(stringContent);
            //     return stringContent;
            // }

            // const documents = products.map(product => ({
            //     id: product._id,
            //     content: getContent(product.toObject())
            // }))

            // const queryObject = {
            //     id: 0,
            //     content: req.query.q,
            // }
            // documents.push(queryObject)

            // //train
            // recommender.train(documents);
            // const similarDocuments = recommender.getSimilarDocuments('0', 0, 100);


            // const idsProduct = similarDocuments.map(item => item.id);
            // const productsFound = await Product.find().where('_id').in(idsProduct);
            // res.json(idsProduct);

            res.render('client/search', {
                query: req.query.q,
                products: multipleMongooseToObject(products),
                user: singleMongooseToObject(req.user),
            });
        }
        catch (err) {
            res.send(err.message);
        }

    }

}

module.exports = new SearchController();