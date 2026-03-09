import mongoose from 'mongoose';
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A note must have a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Note content cannot be empty']
  },
  category: {
    type: String,
    default: 'Uncategorized',
    enum: ['Work', 'Personal', 'Ideas', 'Urgent', 'Uncategorized'] // Restricts to these options
  },
  tags: [String], // Array of strings: ['shopping', 'weekly']
  isPinned: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#ffffff' // Default white background
  }
}, {
  timestamps: true // This automatically creates 'createdAt' and 'updatedAt' fields
});

// Adding an index for faster searching
NoteSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Note', NoteSchema);