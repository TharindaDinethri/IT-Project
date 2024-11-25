const Product = require('../models/Product');
const Rating = require('../models/Rating');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(product);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithRatings = await Promise.all(products.map(async (product) => {
      const ratings = await Rating.find({ productId: product._id });
      const averageRating = ratings.length > 0 ? ratings.reduce((acc, curr) => acc + curr.ratingValue, 0) / ratings.length : 0;
      return { ...product._doc, averageRating };
    }));
    res.status(200).json({ success: true, data: productsWithRatings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: {}, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.saveProductRating = async (req, res) => {
  try {
    const { productId, ratingValue } = req.body;
    console.log(productId)
    console.log(ratingValue)
    
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const rating = await Rating.create({
      productId,
      ratingValue,
    });

    res.status(201).json({ success: true, data: rating });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }

};


exports.getProductRatings = async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await Rating.find({ productId });
    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRating = await Rating.findByIdAndDelete(id);
    if (!deletedRating) {
      return res.status(404).json({ success: false, error: 'Rating not found' });
    }
    res.status(200).json({ success: true, data: {}, message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};