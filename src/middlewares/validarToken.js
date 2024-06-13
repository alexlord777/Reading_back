const jwt= require('jsonwebtoken')
require('dotenv').config();

const validarToken=(req, res, next)=>{
   const token= req.cookies.token
   if(!token) return res.status(401).json({message:"No token, authorization denied"});

   jwt.verify(token,process.env.SECRET_WORD,(err,user)=>{
    if(err) return res.status(403).json({message:"invalid token"});

    req.user=user;
    next();
   })
   
}


module.exports=validarToken;