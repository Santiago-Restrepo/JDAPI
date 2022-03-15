const jwt =  require('jsonwebtoken')
const config = require('../config');
const Role = require('../models/Role');
const User = require('../models/User');

const verifyToken = async (req, res, next) =>{
    try {
        const token = req.headers['x-access-token'];
        if(!token) return res.status(403).json({message: "No token provided"})

        const decodedJwt = jwt.verify(token, config.SECRET);
        req.uid = decodedJwt.uid;
        const user = await User.find({uid: req.uid})
        if(!user) return res.status(403).json({message: "No user found"})
        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}

const isAdmin = async (req, res, next)=>{
    const user = await User.findOne({uid: req.uid})

    const roles =  await Role.find({_id: {$in: user.roles}})
    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        if (role.name === 'admin') {
            next();
            return;
        }
    }
    res.status(403).json({message: "Require admin role"})

}
const isEmployee = async (req, res, next)=>{
    const user = await User.findOne({uid: req.uid})

    const roles =  await Role.find({_id: {$in: user.roles}})
    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        if (role.name === 'employee') {
            next();
            return;
        }
    }
    res.status(403).json({message: "Require employee role"})
}
const isBilling = async (req, res, next)=>{
    const user = await User.findOne({uid: req.uid})

    const roles =  await Role.find({_id: {$in: user.roles}})
    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        if (role.name === 'billing') {
            next();
            return;
        }
    }
    res.status(403).json({message: "Require billing role"})
}

module.exports = {verifyToken, isAdmin, isEmployee, isBilling}