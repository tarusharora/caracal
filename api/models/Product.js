const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  price: {
    listPrice: Number,
    salePrice: Number,
  },
  shortDescription: String,
  longDescription: String,
  image: String,
  thumbnailImage: String,
},
{
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
