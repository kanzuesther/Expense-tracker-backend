const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{type:String, required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    dob:{type:Date,required:true},
    gender:{type:String,required:true}

})

userSchema.methods.getUserObjectWithoutHash = function () {
    const user = this;
  
    return {
      _id: user._id,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      username: user.username
    };
  };

const UserModel = mongoose.model("User",userSchema)

module.exports = { User: UserModel };
