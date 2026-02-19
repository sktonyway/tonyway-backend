import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: [100, "Length is more than enough."]
    },
    description: {
        type: String,
        maxlength: [200],
        trim: true
    }
},
    {
        timeStams: true,
    }
);
TodoSchema.index({title: 'text', content: 'text'});

export default mongoose.model("Todo", TodoSchema)
