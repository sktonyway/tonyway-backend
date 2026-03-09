import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from '../utils/db.js'

import notesRouter from '../notes/notes.route.js';
import todoRouter from '../todos/todos.route.js'
import User from '../utils/userSchema.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.port || 5000;
await connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/notes", notesRouter);
app.use('/todos', todoRouter)

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
    console.log(`Server is running on port: ${port}`);
})