const {Schema, model} = require("mongoose");

const assesorSchema = new Schema({
    name : {
        type: String,
        trim: true,
    }
}, {
    versionKey: false,
});
// export default model('Task', assesorSchema);
module.exports = model('Assesor', assesorSchema);
module.exports.assesorSchema = assesorSchema;
