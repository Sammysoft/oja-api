import mongoose from "mongoose";
const date = new Date();
const senderSchema = mongoose.Schema({
    fullname: {type: String},
    profile: {type:String},
    id:{type:String}
})

// const recieverSchema = mongoose.Schema({
//     fullname: {type: String},
//     profile: {type:String},
//     id:{type:String}
// })
const chatsSchema = mongoose.Schema({
  message: { type: String },
  timestamp: { type: String, default: date },
  sender:  senderSchema ,
});
const chatSchema = mongoose.Schema(
  {
    sender: { type: String },
    reciever: { type: String },
    chat: [chatsSchema],
    subject: { type: String },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
