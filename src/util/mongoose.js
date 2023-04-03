module.exports = {
    multipleMongooseToObject: function (mongooseArray) {
        return mongooseArray.map((mongooseObject) => mongooseObject.toObject());
    },
    singleMongooseToObject: function (mongooseObject) {
        return mongooseObject ? mongooseObject.toObject() : mongooseObject;
    },
};
