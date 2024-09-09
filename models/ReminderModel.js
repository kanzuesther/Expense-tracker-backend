const mongoose = require('mongoose');


const ReminderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    amount:{
        type:Number,
        required:true
    },
    date: {
        type: String,
        required: true
    },
    reminder_cycle: {
        type: String,
        required: true
    },
    cash_reserve:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CashReserves",
        required:true
    },
},{timestamps:true}
)

module.exports = mongoose.model('Reminder', ReminderSchema);