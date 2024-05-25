const express= require('express');
const rouer= express.Router();
const gem= require('./gemini');
rouer.use('/gem')

module.exports={
    rouer
}