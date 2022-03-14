const {Schema, model} = require("mongoose");

const userPermissionsShema = new Schema({
    uid : {
        type: String,
        unique: true
    },
    permissions: {
        admin: {
            type: Boolean,
            default: false
        },
        employee: {
            type: Boolean,
            default: false
        },
        billing:{
            type: Boolean,
            default: false
        },
        delivery:{
            type: Boolean,
            default: false
        },
        dispatch:{
            type: Boolean,
            default: false
        }
    },
}, {
    versionKey: false,
});
module.exports = model('UserPermission', userPermissionsShema);
