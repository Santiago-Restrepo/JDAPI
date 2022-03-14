
const UserPermission = require("../models/UserPermission")
const { default: mongoose } = require("mongoose")

const createUserPermission = async (req, res) => {
    const {
        uid
    } = req.body
    console.log(req.body)
    try {
        const newUserPermission = new UserPermission({
            uid: uid
        });
        const savedUserPermission = await newUserPermission.save();
        res.json(savedUserPermission)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a UserPermission'
        })
    }
}
const insertManyUserPermissions = async (req, res) => {
    let {
        UserPermissions
    } = req.body
    UserPermissions = UserPermissions.map(UserPermission => (
        {
            name: UserPermission
        }
    ))
    try {
        const savedUserPermissions = await UserPermission.insertMany(UserPermissions)
        res.json(savedUserPermissions)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a UserPermission'
        })
    }
}
const findUserPermission = async (req,res) =>{
    try {
        const filter =  !!req.query.uid ? {
            "uid" : req.query.uid
        }
        : {};
        const userPermission = await UserPermission.find(filter)
        res.send(userPermission)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the UserPermission'
        })
    }
}
const deleteUserPermission = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUserPermission = await UserPermission.findByIdAndDelete(id) || {}
        if (Object.keys(deletedUserPermission).length === 0) {
            res.status(400).json({
                message: `UserPermission with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `UserPermission ${deletedUserPermission._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the UserPermission'
        })
    }
}

const updateUserPermission = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedUserPermission = await UserPermission.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedUserPermission).length === 0) {
            res.status(400).json({
                message: `UserPermission with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `UserPermission ${updatedUserPermission._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the UserPermission'
        })
    }
}

module.exports = {createUserPermission, findUserPermission, updateUserPermission, deleteUserPermission, insertManyUserPermissions}