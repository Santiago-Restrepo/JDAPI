// import {Schema, model} from 'mongoose'
const {Schema, model} = require("mongoose");
const {clientSchema} = require("./Client")

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
    assesor: {type: Schema.Types.ObjectId, ref: 'Assesor'},
    priority : {
        type: String,
        trim: true,
    },
    products : [
        {
            //Organizar entidad producto dentro de invoice
            id : {
                type: Schema.Types.ObjectId, 
                ref: 'Product',
            },
            finalPrice: Number,
            quantity: Number,
            _id: false
        }],
    shipping_value : {
        type: Number,
    },
    paymentMethods : [
        { 
            id: {
                type: Schema.Types.ObjectId, 
                ref: 'PaymentMethod', 
                required: true
            },
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
    carrier :  {type: Schema.Types.ObjectId, ref: 'Carrier'},
    shipping_restrictions : {
        type: String,
        trim: true,
    },
    gifts : [{
        id: { type: Schema.Types.ObjectId, ref: 'Product' },
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
        unique: true,
        type: Number,
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
