// import mongoose from "mongoose";
// import config from "./config";
const mongoose = require("mongoose");
const config = require("./config");


(async ()=>{
    try {
        const db = await mongoose.connect(config.mongodbURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected to: ', db.connection.name);
    } catch (error) {
        console.error("error: ",error);
    }
})();