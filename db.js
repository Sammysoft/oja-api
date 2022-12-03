import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_ATLAS = "mongodb+srv://oja:oja@oja.xjriywi.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(MONGO_ATLAS, (err)=>{
if(err){
    console.log("Connection error ", err)
}else{
    console.log("Successfully Connected To Database...");
}
})