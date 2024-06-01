const express= require('express');
const roterlo= express.Router();
const USER= require('./../model/USERS');
const jst= require('jsonwebtoken');

roterlo.post('/', async(req,res)=>{
    const data = req.body;
    const token= jst.sign(data,"Stack",{
        expiresIn:'3m'
    })
    try {
        const user =await USER.findOne(data);
    if(user!=null){
        return res.send(token);
    }else{
        console.log("user dont exist")
        return res.send("12");
    }
    } catch (error) {
        
    }  
})

module.exports={
    roterlo
}