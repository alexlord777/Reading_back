const express= require('express');
const useSchema=require('./../model/USERS');
const roterlog= express.Router();


roterlog.post('/',(req,res)=>{
   const user= useSchema(req.body);
   user.save().then( (data)=>res.json(data) )
   .catch((error)=>res.json({mensaje:error}))
})

roterlog.get('/',(req,res)=>{
    useSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

roterlog.get('/:id',(req,res)=>{
    const {id}= req.params;
    useSchema
    .find(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})


module.exports={
    roterlog
}