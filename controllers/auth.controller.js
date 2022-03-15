
const User = require("../models/User")
const jwt =  require('jsonwebtoken')
const config = require("../config");
const { default: mongoose } = require("mongoose");
const Role = require("../models/Role");


const signUp = async (req, res)=>{
    const {uid, roles} = req.body;
    
    const userFound = await User.find({
        uid: uid
    })
    //Checkeamos si el usuario ya existe
    if (!!!userFound.length) {
        const newUser = await new User({
            uid
        })
        if(roles){
            try {
                const rolesFound =  await Role.find({_id: {$in: roles}})
                if (!!rolesFound.length) {
                    newUser.roles = rolesFound;
                }   
            } catch (error) {
                const role = await Role.findOne({name: "user"});
                newUser.roles = [role._id];
            }
        }else{
            const role = await Role.findOne({name: "user"});
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();
        const token = jwt.sign({uid: savedUser.uid}, config.SECRET,{
            expiresIn: 86400 //24 Hours
        })

        res.json({token})

    } else {
        res.json({
            message: `user ${uid} already exist`
        })
    }
}

const signIn = async (req, res)=>{
    const userFound = await User.findOne({uid: req.body.uid}).populate('roles');

    if(!userFound) return res.status(400).json({message: "User not found"})

    const token = jwt.sign({uid: userFound.uid}, config.SECRET, {
        expiresIn: 86400
    })

    res.json({token})
}

module.exports = {signIn, signUp}