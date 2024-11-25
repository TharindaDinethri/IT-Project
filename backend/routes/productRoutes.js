const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/product', productController.getAllProducts);
router.put('/:id', productController.editProduct);
router.delete('/:id', productController.deleteProduct); 
router.post('/rating', productController.saveProductRating);
router.get('/product/:productId/ratings', productController.getProductRatings);
router.get('/ratings', productController.getAllRatings);
// Add a new route to delete a rating by id
router.delete('/ratings/:id', productController.deleteRating);
module.exports = router;
