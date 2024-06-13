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
    }    
 },{
    timestamps:true
 })


 module.exports=mongoose.model('User',userSchema)