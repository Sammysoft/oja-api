import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect("mongodb+srv://oja:oja@oja.xjriywi.mongodb.net/?retryWrites=true&w=majority", (err)=>{
if(err){
    console.log("Connection error ", err)
}else{
    console.log("Successfully Connected To Database...");
}
})