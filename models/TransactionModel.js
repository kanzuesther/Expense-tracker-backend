const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
    // title:{
    //     type: String, 
    //     required: true,
    //     trim: true,
    //     maxLength: 50
    // },
    amount:{
        type: Number,
        required: true,
        maxLength:20,
        trim: true
        
    },
    type:{
        type:String,
        default:"expense"
    },
    date:{
        type:Date,
        required: true,
        trim:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    sourceAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CashReserves",
        required:true
    },
    targetAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CashReserves",
        required:false
    }

},{timestamps:true})

module.exports = mongoose.model('transaction',TransactionSchema)