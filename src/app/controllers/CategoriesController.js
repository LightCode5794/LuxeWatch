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

    // [POST] /admin/categories/store

    store(req, res, next) {
       
        const newCategory = new Category(req.body);
        newCategory.save()
            .then(res.redirect('/admin/categories'))
            .catch(next);
    }

      //[GET] /admin/categories/:id/edit

      edit(req, res, next) {
        Category.findById(req.params.id)
            .then((Category) =>
                res.render('admin/categories/edit', {
                    layout: 'admin',
                    category: singleMongooseToObject(Category),
                }),
            )
            .catch(next);
    }

    //[PUT] /admin/categories/:id
    update(req, res, next) {
      // res.send(req.params.id);
        Category.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/categories'))
            .catch(next);
    }



}

module.exports = new CategoriesController();
