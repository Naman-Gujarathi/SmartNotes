import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    noteId: {type: Number}
  });

noteSchema.plugin(AutoIncrement, { inc_field: 'noteId' });

const Note = mongoose.model('Note', noteSchema);

export default Note;