const mongoose= require('mongoose');
const userSchema=new mongoose.Schema(
    {
        Username:{type:String,required:true},
        password:{type:String,required:true},
        useremail:{type:String, required:true}
    }
);

const User = mongoose.model('User', userSchema);
