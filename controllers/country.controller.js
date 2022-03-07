
const Country = require("../models/Country")
const { default: mongoose } = require("mongoose")

const createCountry = async (req, res) => {
    const {
        name
    } = req.body
    
    try {
        
        const newCountry = new Country({
            name 
        });
        const savedCountry = await newCountry.save();
        res.json(savedCountry)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Country'
        })
    }
}

const insertManyCountries = async (req, res) => {
    let {
        countries
    } = req.body
    try {
        countries = Object.values(req.body).map(country => (
            {
                name: country
            }
        ))
        const savedCountries = await Country.insertMany(countries)
        res.json(savedCountries)
        // res.json(countries)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Country'
        })
    }
}
const findCountry = async (req,res) =>{
    try {
        const filter = !!req.query.show ? {
            "show" : req.query.show
        } : {};
        const countries = await Country.find(filter)
        res.send(countries)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the Country'
        })
    }
}
const deleteCountry = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCountry = await Country.findByIdAndDelete(id) || {}
        if (Object.keys(deletedCountry).length === 0) {
            res.status(400).json({
                message: `Country with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `Country ${deletedCountry._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the Country'
        })
    }
}

const updateCountry = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedCountry = await Country.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedCountry).length === 0) {
            res.status(400).json({
                message: `Country with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Country ${updatedCountry._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Country'
        })
    }
}

module.exports = {createCountry, findCountry, updateCountry, deleteCountry, insertManyCountries}