
const Carrier = require("../models/Carrier")
const { default: mongoose } = require("mongoose")

const createCarrier = async (req, res) => {
    const {
        name
    } = req.body
    
    try {
        
        const newCarrier = new Carrier({
            name 
        });
        const savedCarrier = await newCarrier.save();
        res.json(savedCarrier)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Carrier'
        })
    }
}
const insertManyCarriers = async (req, res) => {
    let {
        carriers
    } = req.body
    carriers = carriers.map(carrier => (
        {
            name: carrier
        }
    ))
    try {
        const savedCarriers = await Carrier.insertMany(carriers)
        res.json(savedCarriers)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Carrier'
        })
    }
}
const findCarrier = async (req,res) =>{
    try {
        const filter =  !!req.query.name ? {
            "name" : req.query.name.toUpperCase()
        }
        : {};
        const Carriers = await Carrier.find(filter)
        res.send(Carriers)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the Carriers'
        })
    }
}
const deleteCarrier = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCarrier = await Carrier.findByIdAndDelete(id) || {}
        if (Object.keys(deletedCarrier).length === 0) {
            res.status(400).json({
                message: `Carrier with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `Carrier ${deletedCarrier._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the Carrier'
        })
    }
}

const updateCarrier = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedCarrier = await Carrier.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedCarrier).length === 0) {
            res.status(400).json({
                message: `Carrier with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Carrier ${updatedCarrier._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Carrier'
        })
    }
}

module.exports = {createCarrier, findCarrier, updateCarrier, deleteCarrier, insertManyCarriers}