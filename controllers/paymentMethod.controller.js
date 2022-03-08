
const PaymentMethod = require("../models/PaymentMethod")
const { default: mongoose } = require("mongoose")

const createPaymentMethod = async (req, res) => {
    const {
        name
    } = req.body
    
    try {
        const newPaymentMethod = new PaymentMethod({
            name 
        });
        const savedPaymentMethod = await newPaymentMethod.save();
        res.json(savedPaymentMethod)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a PaymentMethod'
        })
    }
}
const insertManyPaymentMethods = async (req, res) => {
    let {
        paymentMethods
    } = req.body
    paymentMethods = paymentMethods.map(PaymentMethod => (
        {
            name: PaymentMethod
        }
    ))
    try {
        const savedPaymentMethods = await PaymentMethod.insertMany(paymentMethods)
        res.json(savedPaymentMethods)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a PaymentMethod'
        })
    }
}
const findPaymentMethod = async (req,res) =>{
    try {
        const filter =  !!req.query.name ? {
            "name" : req.query.name
        }
        : {};
        const paymentMethod = await PaymentMethod.find(filter)
        res.send(paymentMethod)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the PaymentMethod'
        })
    }
}
const deletePaymentMethod = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(id) || {}
        if (Object.keys(deletedPaymentMethod).length === 0) {
            res.status(400).json({
                message: `PaymentMethod with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `PaymentMethod ${deletedPaymentMethod._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the PaymentMethod'
        })
    }
}

const updatePaymentMethod = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedPaymentMethod).length === 0) {
            res.status(400).json({
                message: `PaymentMethod with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `PaymentMethod ${updatedPaymentMethod._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the PaymentMethod'
        })
    }
}

module.exports = {createPaymentMethod, findPaymentMethod, updatePaymentMethod, deletePaymentMethod, insertManyPaymentMethods}