// import {config} from 'dotenv'
const {config} = require("dotenv");
config();
module.exports = {
    mongodbURL: process.env.MONGODB_URI,
    SECRET: process.env.SECRET
}