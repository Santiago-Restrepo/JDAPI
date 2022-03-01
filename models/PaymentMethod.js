const {Schema, model} = require("mongoose");

const paymentMethodSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : {
        type: String,
        trim: true,
    }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model('PaymentMethod', paymentMethodSchema);
