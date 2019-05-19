const mongoose = require('mongoose');
const { get: _get } = require('lodash');

const Product = require('../models/Product');
const Category = require('../models/Category');
const { PRODUCT_EXISTS, PRODUCT_DOESNT_EXISTS } = require('../models/Errors');
const { ItemCreatedResponse } = require('../models/Responses');

const createProduct = async (req, res, next) => {
  const {
    name, displayName, categories,
  } = req.body;

  try {
    // check for existing product
    const existingProduct = await Product.findOne({ name }).lean();
    if (existingProduct) {
      res.status(409);
      next(new Error(PRODUCT_EXISTS));
      return;
    }
    const product = new Product({
      name: name.toLowerCase(),
      displayName,
      categories,
    });
    const newProduct = await product.save();
    res.status(201);
    res.send(new ItemCreatedResponse({ id: newProduct.id }));
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.swagger.params.productId.value;
  try {
    const existingProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true }).lean();
    if (!existingProduct) {
      res.status(404);
      next(new Error(PRODUCT_DOESNT_EXISTS));
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getProductsByCategoryId = async (req, res, next) => {
  // get query param
  const categoryId = req.swagger.params.categoryId.value;

  try {
    // find ancestors categories
    const categories = await Category.aggregate([
      {
        $match: {
          $or: [
            {
              _id: mongoose.Types.ObjectId(categoryId),
            }, {
              ancestors: mongoose.Types.ObjectId(categoryId),
            },
          ],
        },
      }, {
        $project: {
          _id: 1,
        },
      }, {
        $group: {
          _id: null,
          ids: {
            $push: '$_id',
          },
        },
      },
    ]);
    const categoryIds = _get(categories, '[0].ids', []);

    // product search against all the relevant categories
    const products = await Product.find({ categories: { $in: categoryIds } }).lean();
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProductsByCategoryId,
};
