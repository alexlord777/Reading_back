const express= require('express')
const app= express();
const roter=require('./src/routes/gemini');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', roter.roterg);

app.listen(3000,()=>{
    console.log("Server activo ");
})

