const {Schema, model} = require("mongoose");

const carrierSchema = new Schema({
    name : {
        type: String,
        trim: true,
    }
}, {
    versionKey: false
});
// export default model('Task', carrierSchema);
module.exports = model('Carrier', carrierSchema);
module.exports.carrierSchema = carrierSchema;