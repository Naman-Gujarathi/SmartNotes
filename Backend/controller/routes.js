import express from 'express'
import mongoose from 'mongoose';
const router = express.Router();
import Note from '../models/note.js'
import axios from 'axios';

router.post('/notes', async (req, res) => {

    console.log("********entered post api**********")
    try{
        const {title, description} = req.body;
        if(!title || !description ){
            return res.status(400).json({message: 'Title and Description are required'});
        }

        if(title.trim().length == 0 || description.trim().length == 0){
            return res.status(400).json({message: 'Title and Description cannot be empty'});
        }
        
        // if(typeof title != 'string' || typeof description != 'string') {
        //     return res.status(400).json({message: "only string type is excepted"})
        // }
        if(title.length> 50 || description.length > 200){
            return res.status(400).json({message: "reached above max length"});
        }

        const newNote = new Note({title, description});
        await newNote.save();
        res.status(201).json({message: "user created successfully", user : newNote});
    }
    catch(err){
        console.log(err);
        if(err.name == 'ValidationError'){
            return res.status(400).json({message: "only string type is excepted..."})
        }
        
        return res.status(500).json({message: "Unexpected error creating user", error : error.message})
    }
    
});



router.get('/notes/:id', async (req,res)=>{
    try{
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(422).json({ message: "Invalid ID format" });
        }
        const noteFetched = await Note.findById(id)
        if (!noteFetched) {
            return res.status(404).json({ message: 'Note not found' }); // 404: Not Found
        }
        return res.status(200).json({note: noteFetched})
    } catch(err){
        res.status(500).json({message : "server unavailable", note: err.mesage})
    }
   
})

router.put('/notes/:id', async(req, res)=>{
    const {id } = req.params;
    const {title , description} = req.body;
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(422).json({ message: "Invalid ID format" });
        }
        if(!title || !description){
            return res.status(422).json({message: "Title and Description are required"});
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

        const updatedNote = await Note.findByIdAndUpdate(id, {title, description}, {new: true, runValidators: true})

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' }); // 404: Not Found
        }
        return res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
        
    } catch (err) {
        // console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message }); // 500: Internal Server Error
    }
})

router.delete('/notes/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(422).json({ message: "Invalid ID format" });
        }
        const deletedNote = await Note.findByIdAndDelete(id);
        if(deletedNote){
            return res.status(200).json({message: "successfully deleted note", note: deletedNote});
        }
        return res.status(400).json({message: "Note not found"})
    } catch(err){
        res.status(500).json({message: "unexpected erro occur", error : err.message})
    }

})

router.get('/countryinfo/:value', async(req, res)=>{
    // try{
        const {value} = req.params
    const response = await axios.get(`https://restcountries.com/v3.1/name/${value}`)
    const data = response.data[0]

    console.log("***" , data );

    return res.status(200).json({messagebynaman: data});

    // if(!data) {
    //     return res.status(404).json({message: "country not found"})
    // }
    // const resObj = {
    //     "country name": data?.name?.common?? "N/A",
    //     "official name": data?.name?.official?? "N/A",
    //     "name in local": data?.name?.nativeName?.hin?.common?? "N/A"
    // }

    // return res.status(200).json({message: "successfully country info retrived", response: resObj})
    // } catch(err){
    //     res.status(500).json({message: "server unavailable", errorresponse : err.message })
    // }
    
})



export default router;