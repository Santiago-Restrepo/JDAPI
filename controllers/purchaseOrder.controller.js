// import PurchaseOrder from '../models/PurchaseOrder'
const PurchaseOrder = require("../models/PurchaseOrder")
const Assesor = require("../models/Assesor")
const Client = require("../models/Client")
const Product = require("../models/Product")
const { default: mongoose } = require("mongoose")

const createPurchaseOrder = async (req, res) => {
    const {
        sequential,
        assesor_id,
        client,
        close_chanel,
        pay_confirmed,
        complementary_strategy,
        sell_date,
        source,
        invoice_number,
        priority,
        shipping_restrictions,
        has_gifts,
        carrier_id,
        shipping_value,
        products,
        paymentMethods,
        gifts_ids
        
    } = req.body
    if (!!!client) {
        res.status(400).json({
            message: 'Client required'
        })
    }else{
        try {
            const newClient = new Client({
                document: client.document,
                name: client.name,
                cellphone: client.cellphone,
                sirena_cellphone: client.sirena_cellphone,
                email: client.email,
                address: client.address,
                sirena_id: client.sirena_id,
                country: client.country,
                city: client.city,
            })
            //Probar si el cliente ya existe
            
            let [savedNewClient] = await mongoose.model('Client').find({"document": newClient.document});
            if (!!!savedNewClient) {
                savedNewClient = await newClient.save();
            }
            const newPurchaseOrder = new PurchaseOrder({
                sequential,
                assesor: assesor_id,
                client: savedNewClient.id,
                close_chanel,
                pay_confirmed,
                complementary_strategy,
                sell_date,
                source,
                invoice_number,
                priority,
                shipping_restrictions,
                has_gifts,
                carrier: carrier_id,
                shipping_value,
                products,
                paymentMethods,
                gifts: gifts_ids
            });
            const savedPurchaseOrder = await newPurchaseOrder.save();
            res.json(savedPurchaseOrder)
        } catch (error) {
            res.status(500).json({
                message: error.message || 'something went wrong creating a PurchaseOrder'
            })
        }
    }
}
const findPurchaseOrder = async (req,res) =>{
    try {
        const filter = req.body || {};
        const PurchaseOrders = await PurchaseOrder.find(filter)
        res.send(PurchaseOrders)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the PurchaseOrders'
        })
    }
}
const deletePurchaseOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const PurchaseOrder = await PurchaseOrder.findByIdAndDelete(id) || {}
        if (Object.keys(PurchaseOrder).length === 0) {
            res.status(400).json({
                message: `PurchaseOrder with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `PurchaseOrder ${PurchaseOrder._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the PurchaseOrder'
        })
    }
}

const updatePurchaseOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const PurchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(PurchaseOrder).length === 0) {
            res.status(400).json({
                message: `PurchaseOrder with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `PurchaseOrder ${PurchaseOrder._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the PurchaseOrder'
        })
    }
}

module.exports = {createPurchaseOrder, findPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder}