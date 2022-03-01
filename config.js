// import {config} from 'dotenv'
const {config} = require("dotenv");
config();

// export default{
//     mongodbURL: process.env.MONGODB_URI
// }

module.exports = {
    mongodbURL: process.env.MONGODB_URI
}