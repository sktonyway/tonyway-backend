import express from 'express'
import Todo from './todos.schema.js'

const router = express.Router();

// GET all /todos
router.get('/', async(req, res)=>{
    try {
        const todos = await Todo.find().sort({createdAt:-1});
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// POST route /notes
router.post('/', async(req, res)=>{
    try {
        const newTodo = new Todo({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// GET route /todos/:id
router.get('/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        res.json(todo)
    } catch (error) {
        
    }
})

// DELETE route /notes/:id
router.delete('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({
                message: "Todo not found in database."
            })
        }
        res.status(200).json({message: "Todo deleted Successfully."})
    } catch (error) {
        
    }
})


export default router;