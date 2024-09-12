const mongoose = require('mongoose');


const CashReservesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    balance: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    icon: {
        type: String,
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
}, { timestamps: true }
)

module.exports = mongoose.model('CashReserves', CashReservesSchema);