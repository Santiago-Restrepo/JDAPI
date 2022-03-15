
const User = require("../models/User")
const { default: mongoose } = require("mongoose")

const findUser = async (req,res) =>{
    try {
        const filter =  !!req.query.uid ? {
            "uid" : req.query.uid
        }
        : {};
        
        let userFound = await User.findOne(filter).populate('roles')
        res.send(userFound)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the User'
        })
    }
}

module.exports = {findUser}