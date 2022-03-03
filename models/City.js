const {Schema, model} = require("mongoose");

const citySchema = new Schema({
    name : {
        type: String,
        trim: true,
    }
}, {
    versionKey: false,
});
module.exports = model('City', citySchema);
