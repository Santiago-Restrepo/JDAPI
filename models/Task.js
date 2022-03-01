// import {Schema, model} from 'mongoose'
const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        requered: true,
        //quita espacios innecesarios
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});
// export default model('Task', taskSchema);
module.exports = model('Task', taskSchema);
