import mongoose from "mongoose";

let connceted = false;

const connectDB = async () =>{
    
    mongoose.set('strictQuery', true);

    // if the database already connected, dont connect again

    if(connceted){
        console.log("MongoDB already connected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        connceted = true;
        console.log("MongoDB connected...");
    }catch(error){  
        console.log("MongoDB connection error",error);
    }
}

export default connectDB;