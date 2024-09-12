const mongoose = require('mongoose');


const ReminderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    reminder_cycle: {
        type: String,
        required: true
    },
    cash_reserve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CashReserves",
        required: true
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

module.exports = mongoose.model('Reminder', ReminderSchema);