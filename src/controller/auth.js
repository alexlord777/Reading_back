const USER = require('./../model/USERS');
const bcrypy = require('bcryptjs')
const acess = require('./../lib/jwt');
const jwt= require('jsonwebtoken');
require('dotenv').config();


const register = async (req, res) => {
    const u = await USER.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email }
        ]
    });
    try {
        if (u)
        {
            if (req.body.username == u.username) return res.status(400).json({
                message: ["The username is already in use"],
            });

            if(req.body.email == u.email)return res.status(400).json({
                message: ["The email is already in use"],
            });
        }

        const passhash = await bcrypy.hash(req.body.password, 10)
        const user = (req.body.email === null) ? await USER({
            type: "user",
            username: req.body.username,
            password: passhash
        }) : await USER({
            type: "user",
            username: req.body.username,
            email: req.body.email,
            password: passhash
        });

        const userSave = await user.save();

        const token = await acess(userSave._id)

        res.cookie('token', token)
        return (req.body.email === null) ? res.json({
            id: userSave._id,
            username: userSave.username,
            register: userSave.register
        }) : res.json({
            id: userSave._id,
            email: userSave.email,
            username: userSave.username,
            register: userSave.register
        })


    } catch (error) {
        res.status(500).json({ error: error.messaje })
    }
}

const loggin = async (req, res) => {

    try {

        const userFund = await USER.findOne({ username: req.body.username })

        if (!userFund) return res.status(400).json({ message: ["user not found"] });

        const isMatch = await bcrypy.compare(req.body.password, userFund.password);

        if (!isMatch) return res.status(400).json({ message: ["Incorrect password"] });

        const token = await acess(userFund._id)

        res.cookie('token', token)
        res.json({
            id: userFund._id,
            username: userFund.username,
            register: userFund.register
        })
    } catch (error) {
        res.status(500).json({ error: error.messaje })
    }
}

const logOut = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })

    return res.sendStatus(200);
}

const profile = async (req, res) => {
    const userf = await USER.findById(req.user.id);
    if (!userf) return res.status(400).json({ message: "User not fund" })

    return res.json({
        id: userf._id,
        type: userf.type,
        username: userf.username
    })
}

const verify= async(req,res)=>{

    const {token}= req.cookies;

    if(!token) return res.status(401).json([{message:"Unauthorized"}]);

    jwt.verify(token,process.env.SECRET_WORD,async(err,user)=>{
        if(err) return res.status(401).json([{message:"Unauthorized"}]);

        const userFund=await USER.findById(user.id);

        if(!userFund) return res.status(401).json([{message:"Unauthorized"}]);

        return res.json({
            id:userFund._id,
            username:userFund.username,
            email:userFund.email
        })
    })
}

module.exports = {
    reg: register,
    log: loggin,
    logO: logOut,
    pro: profile,
    verify:verify
}