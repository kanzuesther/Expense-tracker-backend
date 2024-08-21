const mongoose = require('mongoose');


const CashReservesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    balance:{
        type: String,
        required: true
    },
    currency:{
        type:String,
        required:false
    }
},{timestamps:true}
)

module.exports = mongoose.model('CashReserves', CashReservesSchema);