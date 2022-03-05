// import {Schema, model} from 'mongoose'
const {Schema, model} = require("mongoose");

const invoiceSchema = new Schema({
    sell_date : {
        type: Date,
        trim: true,
    },
    client: { type: Schema.Types.ObjectId, ref: 'Client'},
    close_chanel : {
        type: String,
        trim: true,
    },
    assesor: {type: Schema.Types.ObjectId, ref: 'Assesor'},
    priority : {
        type: String,
        trim: true,
    },
    products : [
        {
            //Organizar entidad producto dentro de invoice
            type: Schema.Types.ObjectId, ref: 'Product',
            finalPrice: Number,
            quantity: Number
        }],
    finalPrice : {
        type: Number
    },
    shipping_value : {
        type: Number,
    },
    paymentMethods : [
        { 
            id: {type: Schema.Types.ObjectId, ref: 'PaymentMethod'},
            value: {
                type: Number
            },
            voucher: {
                type: String
            },
            pay_confirmed : {
                type: Boolean,
                default: false
            }
        }
    ],
    carrier :  {type: Schema.Types.ObjectId, ref: 'Carrier'},
    shipping_restrictions : {
        type: String,
        trim: true,
    },
    gifts : [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    campaign : {
        type: String,
        trim: true,
        default: ''
    },
    complementary_strategy : {
        type: String,
        trim: true,
        default: ''
    },
    source : {
        type: String,
        trim: true,
        default: ''
    },
    invoice_number : {
        unique: true,
        type: String,
        trim: true,
        default: ''
    },
    sequential : {
        unique: true,
        type: Number,
    },
    
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model('Invoice', invoiceSchema);
