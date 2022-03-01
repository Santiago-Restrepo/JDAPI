const {Schema, model} = require("mongoose");

const carrierSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : {
        type: String,
        trim: true,
    }
}, {
    versionKey: false,
    timestamps: true
});
// export default model('Task', carrierSchema);
module.exports = model('Carrier', carrierSchema);
