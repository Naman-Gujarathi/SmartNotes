import mongoose from 'mongoose';

console.log("********inside connectToDb.js*************");
async function connectToDb(){
    try{
        console.log("********inside TRY BLOCK connectToDb.js*************");
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connectd to db");
    }
    catch(err){
        console.log(err);
    }
    
}

export default connectToDb;