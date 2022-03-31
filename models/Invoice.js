// import {Schema, model} from 'mongoose'
const {Schema, model} = require("mongoose");
const {clientSchema} = require("./Client");
const {assesorSchema} = require("./Assesor");
const {productSchema} = require("./Product");
const {paymentMethodSchema} = require("./PaymentMethod");
const {carrierSchema} = require("./Carrier");

const invoiceSchema = new Schema({
    sell_date : {
        type: Date,
        trim: true,
    },
    client: clientSchema,
    close_chanel : {
        type: String,
        trim: true,
    },
    assesor: assesorSchema,
    priority : {
        type: String,
        trim: true,
    },
    products : [
        {
            //Organizar entidad producto dentro de invoice
            data: productSchema,
            final_price: Number,
            quantity: Number,
            _id: false
        }
    ],
    shipping_value : {
        type: Number,
    },
    paymentMethods : [
        { 
            data: paymentMethodSchema,
            value: {
                type: Number
            },
            voucher: {
                type: String
            },
            pay_confirmed : {
                type: Boolean,
                default: false
            },
        }
    ],
    carrier :  carrierSchema,
    shipping_restrictions : {
        type: String,
        trim: true,
    },
    gifts : [{
        data: productSchema,
        _id: false
    }],
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
        default: null,
        trim: true,
        sparse: true
    },
    sequential : {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    packed: {
        type: Boolean,
        default: false
    },
    printed: {
        type: Boolean,
        default: false
    },
    fileGenerated: {
        type: Boolean,
        default: false
    },
    
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model('Invoice', invoiceSchema);
