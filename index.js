import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db.js'

import Note from './noteSchema.js'

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
await connectDB();

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ updatedAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.post('/notes', async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        // Sends back validation errors (e.g., if title is missing)
        res.status(400).json({ error: err.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})