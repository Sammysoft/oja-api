import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_ATLAS = process.env.MONGO_ATLAS


mongoose.connect(MONGO_ATLAS, (err)=>{
if(err){
    console.log("Connection error ", err)
}else{
    console.log("Successfully Connected To Database...");
}
})