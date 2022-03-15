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
        gifts,
        campaign,
        complementary_strategy,
        source,
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
            //Check if client exist
            
            let [savedNewClient] = await Client.find({"document": newClient.document});
            if (!!!savedNewClient) {
                savedNewClient = await newClient.save();
            }else{
                savedNewClient = await Client.findByIdAndUpdate(savedNewClient._id, {
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
            }
            
            
            const newInvoice = new Invoice({
                assesor: assesor_id,
                client: savedNewClient.id,
                close_chanel,
                sell_date,
                priority,
                shipping_restrictions,
                carrier: carrier_id,
                shipping_value,
                products,
                paymentMethods,
                gifts,
                campaign,
                complementary_strategy,
                source,
                invoice_number: sequential,
                sequential
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
            invoices =  await Invoice.aggregate([
                { 
                    $lookup: { 
                        from: "clients", 
                        localField: "client", 
                        foreignField: "_id", 
                        as: "client",
                        pipeline: [
                            {
                                $lookup: { 
                                    from: "cities", 
                                    localField: "city", 
                                    foreignField: "_id", 
                                    as: "city",
                                } 
                            },
                            {
                                $lookup: { 
                                    from: "countries", 
                                    localField: "country", 
                                    foreignField: "_id", 
                                    as: "country",
                                } 
                            }
                        ]
                    } 
                },
                { 
                    $lookup: { from: "assesors", localField: "assesor", foreignField: "_id", as: "assesor" } 
                },
                { 
                    $lookup: {
                        from: "paymentmethods", 
                        localField: "paymentMethods.id", 
                        foreignField: "_id", 
                        as: "paymentMethodNames" 
                    } 
                },{ 
                    $lookup: {
                        from: "products", 
                        localField: "products.id", 
                        foreignField: "_id", 
                        as: "productsInfo" 
                    } 
                }
            ]).limit(10);
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
        const filter = !!req.query.paymentMethodId ? {
            "_id" : req.params.id,
            "paymentMethods._id" : req.query.paymentMethodId,
        }
        : {
            "_id" : req.params.id,
        };
        const setData = !!req.query.payConfirmed ? { 
            "paymentMethods.$.pay_confirmed" : req.query.payConfirmed
        }
        : !!req.query.reviewed && !!req.query.invoiceNumber ? { 
            "reviewed" : req.query.reviewed,
            "invoice_number" : req.query.invoiceNumber
        } : {};
        const updatedInvoice = await Invoice.updateOne(
            filter,
            { $set: setData }
        )

        if (Object.keys(updatedInvoice).length === 0) {
            res.status(400).json({
                message: `Invoice with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Invoice ${req.params.id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Invoice'
        })
    }
}

const updateManyInvoices = async (req, res) => {
    try {

        const updatedInvoices = await Invoice.updateMany({}, {$set:{"packed": false}})
        res.json({
            message: `Invoices updated succesfully`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Invoice'
        })
    }
}

module.exports = {createInvoice, findInvoice, updateInvoice, updateManyInvoices, deleteInvoice}