const express = require('express');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyD4IDXFgnZ8YLQ3RYp10D1L3-TeMoIs7M0');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const{getData}=require('./../controller/geminiC');

require('dotenv').config();
const roterg = express.Router();




roterg.post('/', async (req, res) => {
    const nivel= req.body.nivel;
    const tema= req.body.tema;
    res.json(await getData(nivel,tema))
})

module.exports = {
    roterg
}