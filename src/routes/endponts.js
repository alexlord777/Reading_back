const express= require('express');
const rouer= express();
const gem= require('./gemini');
const auth=require('./auth')
const tasks= require('./task')
const game=require('./game')

rouer.use('/gem',gem.roterg);
rouer.use('/auth',auth);
rouer.use('/',tasks);
rouer.use('/game',game)
module.exports={
    rouer
}