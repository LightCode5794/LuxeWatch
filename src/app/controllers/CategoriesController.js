const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Category = require('../models/category/category.model');

class CategoriesController {
    //[GET] /admin/categories
    show(req, res, next) {
        // res.json(req.params)
        Category.find()
            .then((categories) => {
                res.render('admin/categories/show',
                    {
                        layout: 'admin',
                        categories: multipleMongooseToObject(categories),
                    })
            })
            .catch(next);

    }
    // [GET] /admin/categories/create
    create(req, res, next) {
        res.render('admin/categories/create', {
            layout: 'admin',
        });
    }

    // [GET] /admin/categories/store

    store(req, res, next) {
       
        const newCategory = new Category(req.body);
        newCategory.save()
            .then(res.redirect('/admin/categories'))
            .catch(next);
    }
}

module.exports = new CategoriesController();
