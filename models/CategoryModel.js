const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    color:{
        type:String,
        required:true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
    },
    deleteDate: {
        type: Date,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

module.exports = mongoose.model('Category', CategorySchema);