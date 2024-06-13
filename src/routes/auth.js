const roterlo= require('express').Router();
const auth=require('./../controller/auth');
const validarToken= require('./../middlewares/validarToken.js');

roterlo.post('/register',auth.reg);
roterlo.post('/login',auth.log);
roterlo.post('/logout',auth.logO);
roterlo.get('/profile',validarToken,auth.pro)

module.exports=roterlo;