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
        // sequential
    } = req.body
    if (!!!client) {
        res.status(400).json({
            message: 'Client required'
        })
    }else{
        try {

            const {sequential} = await Invoice.findOne({},{"sequential":1, _id:0}).sort({sequential: -1}).limit(1)
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
                sequential: sequential + 1
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
        const id = !!req.query.id ?  req.query.id : '';
        let limit = !!req.query.limit &&  parseInt(req.query.limit);
        let date;
        console.log(req.query)
        if (!!req.query.from && !!req.query.to) {
            date = {
                from: new Date(req.query.from),
                to: new Date(req.query.to),
            }
        }
        console.log(date)
        if (!req.query.limit) {
            const count = await Invoice.find().count();
            limit = count;
        }
        let invoices;
        if (!!id) {
            invoices =  await Invoice.findById(id).populate('client').populate({
                path: 'products',
                populate: { path: 'id' }
            });
        } else {
            // invoices = await Invoice.find().populate('client').populate({
            //     path: 'client',
            //     populate: {path: 'country'}
            // }).populate({
            //     path: 'client',
            //     populate: {path: 'city'}
            // })
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
                    $lookup: { from: "carriers", localField: "carrier", foreignField: "_id", as: "carrier" } 
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
            // ]).limit(limit);
            // ]).match({ "paymentMethods": { $all: [{ $elemMatch: {pay_confirmed: true} }] } }).limit(limit);
            ]).match({ "sell_date": {
                $gte: date.from,
                $lte: date.to,
            } }).limit(limit);
        }
        res.send(invoices || [])
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the Invoices'
        })
        console.error(error)
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

        const setData = req.body.setData;
        const client = {...setData.client};
        const clientId = setData.clientId
        if(client){
            const updatedClient = await Client.findByIdAndUpdate(clientId, client);
        }
        delete setData.client;
        delete setData.clientId;
        const updatedInvoice = await Invoice.updateOne(
            req.body.filter,
            { $set: setData }
        )

        if (Object.keys(updatedInvoice).length === 0) {
            res.status(400).json({
                message: `Invoice with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Invoice ${req.params.id} ${client ? ` and client ${clientId} were` : "was" } updated succesfully`
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
        const updatedInvoices = await Invoice.updateMany(req.body.filter, {$set: req.body.setData})
        res.json({updatedInvoices})
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Invoice'
        })
    }
}

const countInvoices = async (req, res) => {
    try {

        const count = await Invoice.find().count()
        res.json({count})
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Invoice'
        })
    }
}

module.exports = {createInvoice, findInvoice, updateInvoice, updateManyInvoices, deleteInvoice, countInvoices}