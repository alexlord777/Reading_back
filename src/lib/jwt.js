const jwt = require('jsonwebtoken');
require('dotenv').config();

const createAcess=(userSave)=>{
    return new Promise((res,rej)=>{
        jwt.sign({ id: userSave }, process.env.SECRET_WORD, {
            expiresIn: '1d'
        }, (err,token) => {
            if (err) rej(err)
            res(token)
        })
    })
}

module.exports= createAcess;