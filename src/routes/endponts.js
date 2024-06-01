const express= require('express');
const rouer= express();
const gem= require('./gemini');
const log= require('./users');
const loggin= require('./login');

rouer.use('/gem',gem.roterg);
rouer.use('/users',log.roterlog);
rouer.use('/login',loggin.roterlo);

module.exports={
    rouer
}