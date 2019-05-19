const { isEmpty } = require('lodash');

const Category = require('../models/Category');
const { CATEGORY_EXISTS } = require('../models/Errors');
const { ItemCreatedResponse } = require('../models/Responses');

const createCategory = async (req, res, next) => {
  const {
    name, displayName, parentCategory,
  } = req.body;

  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(409);
      next(new Error(CATEGORY_EXISTS));
      return;
    }

    // create a new category
    const category = new Category({
      name: name.toLowerCase(),
      displayName,
    });

    // check for root category
    if (!isEmpty(parentCategory)) {
      let ancestors = [];
      category.isParent = false;
      category.parentCategory = parentCategory;

      // add child category id to the parent doc
      const parentCategoryDoc = await Category.findByIdAndUpdate(parentCategory, { $addToSet: { childCategories: category.id } });

      if (parentCategoryDoc && parentCategoryDoc.ancestors) {
        ancestors = [parentCategory, ...parentCategoryDoc.ancestors];
      }
      category.ancestors = ancestors;
    }

    await category.save();
    res.status(201);
    res.send(new ItemCreatedResponse({ id: category.id }));
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.aggregate([
      {
        $match: {
          isParent: true,
        },
      },
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$_id',
          connectFromField: 'childCategories',
          connectToField: '_id',
          as: 'child_categories',
          depthField: 'level',
        },
      }, {
        $project: {
          _id: 1,
          name: 1,
          displayName: 1,
          child_categories: {
            $filter: {
              input: '$child_categories',
              as: 'child_categories',
              cond: {
                $gt: [
                  '$$child_categories.level', 0,
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          displayName: 1,
          'child_categories._id': 1,
          'child_categories.name': 1,
          'child_categories.displayName': 1,
        },
      },
    ]);
    res.status(200).send(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getCategories,
};
