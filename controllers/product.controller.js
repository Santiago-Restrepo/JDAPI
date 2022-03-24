
const Product = require("../models/Product")
const { default: mongoose } = require("mongoose")

const createProduct = async (req, res) => {
    let data = req.body.data;    
    try {
        const newProduct = new Product(data);
        const savedProduct = await newProduct.save();
        res.json(savedProduct)
    } catch (error) {
        console.error(error)
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
        let products;
        if (!!req.query.id) {
            products = await Product.findById(req.query.id);
            products ? res.send([products])
            : res.send([])
            
        } else {
            const filter = !!req.query.name ? {
                "name" : req.query.name.toUpperCase()
            } : {};
            products = await Product.find(filter);
            res.send(products || [])
        }
        
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

        const setData = req.body.setData;
        const updatedProduct = await Product.updateOne(
            req.body.filter,
            { $set: setData }
        )

        if (Object.keys(updatedProduct).length === 0) {
            res.status(400).json({
                message: `Product with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Product ${req.params.id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Product'
        })
    }
}

module.exports = {createProduct, findProduct, updateProduct, deleteProduct, insertManyProducts}