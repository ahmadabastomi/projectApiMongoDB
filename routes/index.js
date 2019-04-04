var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

//Product
router.get('/', productController.product_all);
router.post('/create', productController.product_create);
router.get('/:id', productController.product_details);
router.patch('/edit/:id', productController.product_update);
router.delete('/delete/:id', productController.product_delete);

module.exports = router;
