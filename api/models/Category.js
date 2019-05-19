const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  isParent: {
    type: Boolean,
    default: true,
  },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  ancestors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  childCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
},
{
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
