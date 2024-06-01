require('dotenv').config();
const mongoose= require('mongoose');

mongoose.connect(process.env.DB_URL).then(()=>console.log("conectado")).catch((error)=>console.log(error))

module.exports=mongoose