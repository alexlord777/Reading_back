const express= require('express');
const rouer= express();
const gem= require('./gemini');
const auth=require('./auth')

rouer.use('/gem',gem.roterg);
rouer.use('/auth',auth);
module.exports={
    rouer
}