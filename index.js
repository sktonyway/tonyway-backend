import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db.js'

import notesRouter from './router/blog-route.js'
import Todo from './todoSchema.js'
import User from './userSchema.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 5000;
await connectDB();

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/notes", notesRouter);

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ updatedAt: -1 })
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.post('/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title,
            description: req.body.description
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({
            userId: user.username,
            pass: user._id
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})