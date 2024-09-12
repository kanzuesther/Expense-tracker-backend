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

module.exports = mongoose.model('Expense', ExpenseSchema)