const express= require('express')
var cors = require('cors')
const roter=require('./src/routes/endponts');
const cookie= require('cookie-parser');
const morgan = require('morgan')
const http = require('http');
const socket=require('./src/lib/socket');

const app= express();
const server = http.createServer(app); 

app.use(cookie());
app.use(morgan('dev'))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/', roter.rouer);

require('./src/model/db');


socket.init(server)
server.listen(3000,()=>{
    console.log("Server activo ");
})

