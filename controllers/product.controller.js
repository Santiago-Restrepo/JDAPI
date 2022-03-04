
const Product = require("../models/Product")
const { default: mongoose } = require("mongoose")

const createProduct = async (req, res) => {
    const {
        name
    } = req.body
    
    try {
        
        const newProduct = new Product({
            name 
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Product'
        })
    }
}
const insertManyProducts = async (req, res) => {
    let {
        products
    } = req.body
    try {
        products = req.body.map(product => (
            {
                universal_code: product.universal_code,
                sku: product.sku,
                name: product.name,
                price: product.price,
                promo_price: product.promo_price,
                diamond: product.diamond,
            }
        ))
        const savedProducts = await Product.insertMany(products)
        res.json(savedProducts)
        // res.json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Product'
        })
    }
}
const findProduct = async (req,res) =>{
    try {
        const filter = !!req.query.id ?  req.query.id : '';
        let products;
        if (!!filter) {
            products =  await Product.findById(filter);
        } else {
            products =  await Product.find();
        }
        res.send(products || [])
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the Products'
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id) || {}
        if (Object.keys(deletedProduct).length === 0) {
            res.status(400).json({
                message: `Product with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `Product ${deletedProduct._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the Product'
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedProduct).length === 0) {
            res.status(400).json({
                message: `Product with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Product ${updatedProduct._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Product'
        })
    }
}

module.exports = {createProduct, findProduct, updateProduct, deleteProduct, insertManyProducts}