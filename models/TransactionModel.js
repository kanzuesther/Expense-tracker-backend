const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
    // title:{
    //     type: String, 
    //     required: true,
    //     trim: true,
    //     maxLength: 50
    // },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true

    },
    type: {
        type: String,
        default: "expense"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    sourceAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CashReserves",
        required: true
    },
    targetAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CashReserves",
        required: false
    },
    createDate: {
        type: Date,
        default: Date.now,  // Set default value to the current date and time
    },
    lastUpdate: {
        type: Date,
        default: Date.now,  // Set default value to the current date and time
    },
    deleteDate: {
        type: Date,  // No default, not required
    },
    is_deleted: {
        type: Boolean,
        default: false,  // Default value is false
    },

}, { timestamps: true })

module.exports = mongoose.model('transaction', TransactionSchema)