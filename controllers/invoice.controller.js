// import PurchaseOrder from '../models/PurchaseOrder'
const Invoice = require("../models/Invoice")
const Assesor = require("../models/Assesor")
const Client = require("../models/Client")
const Product = require("../models/Product")
const { default: mongoose } = require("mongoose")

const createInvoice = async (req, res) => {
    const {
        sell_date,
        close_chanel,
        client,
        assesor_id,
        priority,
        products,
        shipping_value,
        paymentMethods,
        carrier_id,
        shipping_restrictions,
        gifts_ids,
        sequential
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
                country: client.country_id,
                city: client.city_id,
            })
            //Probar si el cliente ya existe
            
            let [savedNewClient] = await Client.find({"document": newClient.document});
            if (!!!savedNewClient) {
                savedNewClient = await newClient.save();
            }
            const newInvoice = new Invoice({
                sequential,
                assesor: assesor_id,
                client: savedNewClient.id,
                close_chanel,
                pay_confirmed,
                complementary_strategy,
                sell_date,
                source,
                invoice_number: '',
                priority,
                shipping_restrictions,
                carrier: carrier_id,
                shipping_value,
                products,
                paymentMethods,
                gifts: gifts_ids
            });
            const savedInvoice = await newInvoice.save();
            res.json(savedInvoice)
        } catch (error) {
            res.status(500).json({
                message: error.message || 'something went wrong creating a PurchaseOrder'
            })
        }
    }
}
const findInvoice = async (req,res) =>{
    
    try {
        const filter = !!req.query.id ?  req.query.id : '';
        let invoices;
        if (!!filter) {
            invoices =  await Invoice.findById(filter);
        } else {
            invoices =  await Invoice.find();
        }
        res.send(invoices || [])
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the Invoices'
        })
    }
}
const deleteInvoice = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedInvoice = await PurchaseOrder.findByIdAndDelete(id) || {}
        if (Object.keys(deletedInvoice).length === 0) {
            res.status(400).json({
                message: `Invoice with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `Invoice ${deletedInvoice._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the Invoice'
        })
    }
}

const updateInvoice = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedInvoice = await PurchaseOrder.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedInvoice).length === 0) {
            res.status(400).json({
                message: `Invoice with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Invoice ${updatedInvoice._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Invoice'
        })
    }
}

module.exports = {createInvoice, findInvoice, updateInvoice, deleteInvoice}