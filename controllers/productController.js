const Product = require('../models/product');

//Get Product All
exports.product_all = async function (req, res) {
    try {
        await Product.find(function (err, product) {
            if (err) {
                return next(err);
            }
            res.status(200).send(product);
        })
    } catch (error) {
        res.status(404).send('Product Not Found')
    }
};

//Create New Product
exports.product_create = async function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        }
    );

    try {
        await product.save(function (err) {
            if (err) {
                return next(err)
            }
            res.status(201).send('Product Created successfully')
        })
    } catch (error) {
        res.status(400).send('Failed Create New Product')
    }
};

//Get Product Details
exports.product_details = async function (req, res) {
    try {
        await Product.findById(req.params.id, function (err, product) {
            if (err) return next(err);
            res.status(200).send(product);
        })
    } catch (error) {
        res.status(404).send('Product Not Found')
    }
};

//Patch Product
exports.product_update = async function (req, res) {
    try {
        await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
            if (err) return next(err);
            res.status(201).send('Product udpated.');
        });
    } catch (error) {
        res.status(400).send('Failed Update Product')
    }
};

//Delete Product
exports.product_delete = async function (req, res) {
    try {
        await Product.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.status(200).send('Deleted successfully!');
        })
    } catch (error) {
        res.status(404).send('Failed Delete, Product Not Found')
    }
};


