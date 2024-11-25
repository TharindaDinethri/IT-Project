const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  productId: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
