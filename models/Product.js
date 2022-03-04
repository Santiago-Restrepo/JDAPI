const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    universal_code : {
        type: String,
        trim: true,
    },
    sku : {
        type: String,
        trim: true,
        unique: true
    },
    name : {
        type: String,
        trim: true,
    },
    price : {
        type: Number,
        required: true
    },
    promo_price : {
        type: Number,
        required: true
    },
    diamond : {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model('Product', productSchema);
