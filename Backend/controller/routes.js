import express from 'express'
import mongoose from 'mongoose';
const router = express.Router();
import Note from '../models/note.js'

router.post('/addNote', async (req, res) => {
    try{
        const {title, description} = req.body;
        if(!title || !description ){
            return res.status(400).json({message: 'Title and Description are required'});
        }

        if(title.trim().length == 0 || description.trim().length == 0){
            return res.status(400).json({message: 'Title and Description cannot be empty'});
        }
        
        if(typeof title != 'string' || typeof description != 'string') {
            return res.status(400).json({message: "only string type is excepted"})
        }
        if(title.length> 50 || description.length > 200){
            return res.status(400).json({message: "reached above max length"});
        }

        const newNote = new Note(title, description);
        await newNote.save();
        res.status(201).json({message: "user created successfully", user : newNote});
    }
    catch(err){
        console.log(err);
        if(err.name= 'ValidationError'){
            return res.status(400).json({message: "only string type is excepted"})
        }
        
        return res.status(500).json({message: "Unexpected error creating user", error : error.message})
    }
    
});



router.get('/getNotebyId/:id', async (req,res)=>{
    try{
        const {id} = req.params
        if(!id){
            return res.status(422).json({message: "id is required"})
        }
        const noteFetched = await Note.findById(id)
        if (!noteFetched) {
            return res.status(404).json({ message: 'Note not found' }); // 404: Not Found
        }
        return res.status(200).json({note: noteFetched})
    } catch(err){
        res.status(500).json({message : "server unavailable", note: error.mesage})
    }
   
})

router.put('/updateNotebyId:id', (req, res)=>{
    const {id } = req.params;
    const {title , description} = req.body;
    try{
        if(!id){
            return res.status(422).json({message: "invalid id to update"})
        }
        if(!title || !description){
            return res.status(422).json({message: "title and description found"});
        }

        if(title.trim().length == 0 || description.trim().length == 0){
            return res.status(400).json({ message: 'Title and Description cannot be empty' });
        }

        if (typeof title !== 'string' || typeof description !== 'string') {
            return res.status(400).json({ message: 'Title and Description must be strings' });
        }
        if (title.length > 50 || description.length > 200) {
            return res.status(400).json({ message: 'Title or Description exceeds the maximum allowed length' });
        }

        Note.findByIdAndUpdate(id, {title, description}, {new: true, runValidators: true})

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' }); // 404: Not Found
        }
        return res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message }); // 500: Internal Server Error
    }
})

router.delete('/deleteNotebyId/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        if(!id){
            res.status(422).json({message: "invalid noteId to delete"});
        }
        const deletedNote = Note.findByIdAndDelete(id);
        if(Note){
            return res.status(200).json({message: "successfully deleted note", note: deletedNote});
        }
        return res.status(400).json({message: "Note not found"})
    } catch(err){
        res.status(500).json({message: "unexpected erro occur", error : error.message})
    }

})



export default router;