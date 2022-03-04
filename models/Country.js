const {Schema, model} = require("mongoose");

const countrySchema = new Schema({
    name : {
        type: String,
        trim: true,
    },
    show : {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
});
module.exports = model('Country', countrySchema);
