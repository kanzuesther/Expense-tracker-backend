const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true

    },
    type: {
        type: String,
        default: "income"

    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
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

module.exports = mongoose.model('Expense', ExpenseSchema)