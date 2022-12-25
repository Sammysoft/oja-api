import express from "express";
import { Chat_Controller } from "../Controllers/chat-controller.js";

const chatRoute = express.Router();

chatRoute.post("/chat/get", Chat_Controller._getChats);
chatRoute.post("/chat/send", Chat_Controller._sendMessage);
chatRoute.post("/chat/view", Chat_Controller._getMessages);

export default chatRoute