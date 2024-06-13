const TASK= require('./../model/TASK')

const getTasks=async(req,res)=>{
    const taks= await TASK.find();
    res.json(taks);
}

const createTask=async(req,res)=>{
    const {title,description,date}= req.body;

    const newTask={
        title,
        description,
        date
    }

    const saveTask= await TASK.save(newTask);
    res.status(200).json(saveTask);
}

const getTask=async(req,res)=>{

    const task=await TASK.findOne(req.params.id)
    if(!task) return  res.status(404).json({message:"task no fund"})
    res.json(task);
}

const updateTask=async(req,res)=>{}

const deleteTask=async(req,res)=>{}

module.exports={
    getAll:getTasks,
    create:createTask,
    getTask:getTask,
    update:updateTask,
    delete:deleteTask
}