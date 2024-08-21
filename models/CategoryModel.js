const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:false
    },
    icon:{
        type:String,
        required:false
    }
},{timestamps:true}
)

module.exports = mongoose.model('Category', CategorySchema);