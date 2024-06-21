const express= require('express');
const rouer= express();
const gem= require('./gemini');
const auth=require('./auth')
const tasks= require('./task')


rouer.use('/gem',gem.roterg);
rouer.use('/auth',auth);
rouer.use('/',tasks)
module.exports={
    rouer
}