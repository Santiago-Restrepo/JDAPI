const {Schema, model} = require("mongoose");

const assesorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : {
        type: String,
        trim: true,
    }
}, {
    versionKey: false,
    timestamps: true
});
// export default model('Task', assesorSchema);
module.exports = model('Assesor', assesorSchema);
