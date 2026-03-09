import express from 'express'
import Todo from './todos.schema.js'

const router = express.Router();

router.get('/', async(req, res)=>{
    try {
        const todos = await Todo.find().sort({createdAt:-1});
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
router.post('/', async(req, res)=>{
    try {
        const newTodo = new Todo({
            title: req.body.title,
            description: req.body.category
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
export default router;