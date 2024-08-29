const TASK= require('./../model/TASK')

const getTasks=async(req,res)=>{
    const taks= await TASK.find({user:req.user.id}).populate('user');
    res.json(taks);
}

const createTask=async(req,res)=>{
    
    const {title,description,date}= req.body;

    const newTask= new TASK({
        title,
        description,
        date,
        user:req.user.id
    });

    const saveTask= await newTask.save()
    res.status(200).json(saveTask);
}

const getTask=async(req,res)=>{

    const task=await TASK.findById(req.params.id).populate('user')
    if(!task) return  res.status(404).json({message:"task no fund"})
    res.json(task);
}

const updateTask=async(req,res)=>{
    const task=await TASK.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    if(!task) return  res.status(404).json({message:"task no fund"})
}

const deleteTask=async(req,res)=>{
    const task=await TASK.findByIdAndDelete(req.params.id)
    if(!task) return  res.status(404).json({message:"task no fund"})
    res.sendStatus(404);
}

module.exports={
    getAll:getTasks,
    create:createTask,
    getTask:getTask,
    update:updateTask,
    delete:deleteTask
}