const {Schema, model} = require("mongoose");

const paymentMethodSchema = new Schema({
    name : {
        type: String,
        trim: true,
    }
}, {
    versionKey: false,
});
module.exports = model('PaymentMethod', paymentMethodSchema);
module.exports.paymentMethodSchema = paymentMethodSchema;
