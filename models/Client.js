const {Schema, model} = require("mongoose");

const clientSchema = new Schema({
    document : {
        unique: true,
        type: String,
        trim: true,
    },
    name : {
        type: String,
        trim: true,
    },
    cellphone : {
        type: String,
        trim: true,
    },
    sirena_cellphone : {
        type: String,
        trim: true,
    },
    sirena_id : {
        type: String,
        trim: true,
    },
    email : {
        type: String,
        trim: true,
    },
    address : {
        type: String,
        trim: true,
    },
    city : {type: Schema.Types.ObjectId, ref: 'City'},
    country : {type: Schema.Types.ObjectId, ref: 'City'},
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model('Client', clientSchema);
module.exports.clientSchema = clientSchema
