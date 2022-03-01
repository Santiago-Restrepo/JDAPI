const {Schema, model} = require("mongoose");

const categorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    universal_code : {
        type: String,
        trim: true,
    },
    sku : {
        type: String,
        trim: true,
    },
    name : {
        type: String,
        trim: true,
    },
    value : {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
// export default model('Task', categorySchema);
module.exports = model('Category', categorySchema);
