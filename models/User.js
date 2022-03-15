const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    uid : {
        type: String,
        unique: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model('User', userSchema);
