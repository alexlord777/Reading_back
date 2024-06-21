const mongoose= require('mongoose');

 const userSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    } 
 },{
    timestamps:true
 })


 module.exports=mongoose.model('Task',userSchema)