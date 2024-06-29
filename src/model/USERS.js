const mongoose= require('mongoose');
 const userSchema= mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    register:{
        type:Boolean
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{ 
        type:String,
        required:false,
        unique:true
    },
    password:{
        type:String,
        required:false
    },
    register:{
        type:Date,
        default: Date.now
    },
     times: {
        type: [[String]],
        required: true
    },
    like:{
        type:[String]
    },
    leves:{
        type:[[String]]
    }
    
 })


 module.exports=mongoose.model('User',userSchema)