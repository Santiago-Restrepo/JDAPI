// import Task from '../models/Task'
const Task = require("../models/Task")

const findAllTasks = async (req,res) =>{
    try {
        const filter = req.body || {};
        const tasks = await Task.find(filter)
        res.send(tasks)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something goes wrong retrieving the tasks'
        })
    }
}

const createTask = async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400).json({
            message: 'no empty fields allowed'
        })
    }else{
        try {
            const newTask = new Task({
                title: req.body.title,
                description: req.body.description,
                done: req.body.done ? true : false
            })
            const savedTask = await newTask.save();
            res.json(savedTask)
        } catch (error) {
            res.status(500).json({
                message: error.message || 'something goes wrong creating a task'
            })
        }
    }
}

const findOneTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id)

        if (!task) {
            res.status(400).json({
                message: `Task with id ${id} doesn't exist`
            })
        } else {
            res.json(task)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something goes wrong retrieving the task'
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id) || {}
        if (Object.keys(task).length === 0) {
            res.status(400).json({
                message: `Task with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `Task ${task._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something goes wrong deleting the task'
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const task = await Task.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(task).length === 0) {
            res.status(400).json({
                message: `Task with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Task ${task._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something goes wrong updating the task'
        })
    }
}

module.exports = {createTask, findAllTasks, updateTask, deleteTask, findOneTask}