const { singleMongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Tag = require('../models/tag/tag.model');


class TagsController {
    //[GET] /admin/tags
    show(req, res, next) {
        // res.json(req.params)
        Tag.find()
            .then((tags) => {
                res.render('admin/tags/show', {
                    layout: 'admin',
                    tags: multipleMongooseToObject(tags),
                });
            })
            .catch(next);
    }
    // [POST] /admin/tags/store
    delete(req, res, next) {
        Tag.delete({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next);
    }

}

module.exports = new TagsController();
