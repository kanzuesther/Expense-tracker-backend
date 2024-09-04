const mongoose = require('mongoose');


const BudgetSchema = new mongoose.Schema({
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
    currency: {
        type: String,
        required: true
    },
    cycle: {
        type: String,
        required: true
    }
},{timestamps:true}
)

module.exports = mongoose.model('Budget', BudgetSchema);