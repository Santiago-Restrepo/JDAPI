
const City = require("../models/City")
const { default: mongoose } = require("mongoose")

const createCity = async (req, res) => {
    const {
        name
    } = req.body
    
    try {
        
        const newCity = new City({
            name 
        });
        const savedCity = await newCity.save();
        res.json(savedCity)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a City'
        })
    }
}
const insertManyCities = async (req, res) => {
    let {
        cities
    } = req.body
    cities = cities.map(city => (
        {
            name: city
        }
    ))
    try {
        const savedCities = await City.insertMany(cities)
        res.json(savedCities)
        // res.json(cities)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a City'
        })
    }
}
const findCity = async (req,res) =>{
    try {
        const filter =  !!req.query.name ? {
            "name" : req.query.name
        }
        : {};
        const cities = await City.find(filter)
        res.send(cities)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the Country'
        })
    }
}
const deleteCity = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCity = await City.findByIdAndDelete(id) || {}
        if (Object.keys(deletedCity).length === 0) {
            res.status(400).json({
                message: `City with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `City ${deletedCity._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the City'
        })
    }
}

const updateCity = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedCity = await City.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedCity).length === 0) {
            res.status(400).json({
                message: `City with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `City ${updatedCity._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the City'
        })
    }
}

module.exports = {createCity, findCity, updateCity, deleteCity, insertManyCities}