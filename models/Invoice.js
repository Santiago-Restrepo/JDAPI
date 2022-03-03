// import {Schema, model} from 'mongoose'
const {Schema, model} = require("mongoose");

const invoiceSchema = new Schema({
    sequential : {
        unique: true,
        type: Number,
    },
    assesor: {type: Schema.Types.ObjectId, ref: 'Assesor'},
    client: { type: Schema.Types.ObjectId, ref: 'Client'},
    campaign : {
        type: String,
        trim: true,
    },
    close_chanel : {
        type: String,
        trim: true,
    },
    pay_confirmed : {
        type: Boolean,
        default: false
    },
    complementary_strategy : {
        type: String,
        trim: true,
    },
    sell_date : {
        type: String,
        trim: true,
    },
    source : {
        type: String,
        trim: true,
    },
    invoice_number : {
        type: String,
        trim: true,
    },
    priority : {
        type: String,
        trim: true,
    },
    shipping_restrictions : {
        type: String,
        trim: true,
    },
    city :  {type: Schema.Types.ObjectId, ref: 'City'},
    carrier :  {type: Schema.Types.ObjectId, ref: 'Carrier'},
    shipping_value : {
        type: Number,
        trim: true,
    },
    products : [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    paymentMethods : [
        { 
            id: {type: Schema.Types.ObjectId, ref: 'PaymentMethod'},
            value: {
                type: Number
            },
            voucher: {
                type: String
            }
        }
    ],
    gifts : [{ type: Schema.Types.ObjectId, ref: 'Product' }]

}, {
    versionKey: false,
    timestamps: true
});
module.exports = model('Invoice', invoiceSchema);
