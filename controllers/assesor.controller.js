
const Assesor = require("../models/Assesor")
const { default: mongoose } = require("mongoose")

const createAssesor = async (req, res) => {
    const {
        name
    } = req.body
    
    try {
        
        const newAssesor = new Assesor({
            name 
        });
        const savedAssesor = await newAssesor.save();
        res.json(savedAssesor)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Assesor'
        })
    }
}
const insertManyAssesors = async (req, res) => {
    let {
        assesors
    } = req.body
    assesors = assesors.map(assesor => (
        {
            name: assesor
        }
    ))
    try {
        const savedAssesors = await Assesor.insertMany(assesors)
        res.json(savedAssesors)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Assesor'
        })
    }
}
const findAssesor = async (req,res) =>{
    try {
        const filter = !!req.query.name ? {
            "name" : req.query.name.toUpperCase()
        } : {};
        const assesor = await Assesor.find(filter);
        res.send(assesor)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the assesor'
        })
    }
}
const deleteAssesor = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedAssesor = await Assesor.findByIdAndDelete(id) || {}
        if (Object.keys(deletedAssesor).length === 0) {
            res.status(400).json({
                message: `Assesor with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `Assesor ${deletedAssesor._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the Assesor'
        })
    }
}

const updateAssesor = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedAssesor = await Assesor.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedAssesor).length === 0) {
            res.status(400).json({
                message: `Assesor with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Assesor ${updatedAssesor._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Assesor'
        })
    }
}

module.exports = {createAssesor, findAssesor, updateAssesor, deleteAssesor, insertManyAssesors}