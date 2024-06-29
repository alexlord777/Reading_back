const express= require('express')
const app= express();
var cors = require('cors')
const roter=require('./src/routes/endponts');
const cookie= require('cookie-parser');
const morgan = require('morgan')

app.use(cookie());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/', roter.rouer);

require('./src/model/db');
app.listen(3000,()=>{
    console.log("Server activo ");
})

