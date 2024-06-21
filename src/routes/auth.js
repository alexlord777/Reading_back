const roterlo= require('express').Router();
const auth=require('./../controller/auth');
const validarToken= require('./../middlewares/validarToken.js');
const validarSchema= require('./../Schemas/authSchema');
const vals=require('./../middlewares/validorSchema')


roterlo.post('/register',vals(validarSchema.reg) ,auth.reg);
roterlo.post('/login',vals(validarSchema.log) ,auth.log);
roterlo.post('/logout',auth.logO);
roterlo.get('/profile',validarToken,auth.pro)

module.exports=roterlo;