const validar =(schema)=>(req,res,next)=>{
    try {
        schema.parse(req.body);
        next()
    } catch (error) {     
        return res.status(400).json({message:error.errors.map(e=> e.message)});
    }
}

module.exports=validar;