const express = require('express');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyD4IDXFgnZ8YLQ3RYp10D1L3-TeMoIs7M0');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const{getData}=require('./../controller/geminiC');

require('dotenv').config();
const roterg = express.Router();




roterg.post('/gem', async (req, res) => {
    const nivel= req.body.nivel;
    const tema= req.body.tema;

    getData(nivel,tema)
    
    res.send('ok');
})

module.exports = {
    roterg
}