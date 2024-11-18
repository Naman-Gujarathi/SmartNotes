import mongoose from 'mongoose';


async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        // console.log("coonectd to db");
    }
    catch(err){
        console.log(err);
    }
    
}

export default connectToDb;