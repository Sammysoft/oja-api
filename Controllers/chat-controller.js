import Chat from "../Models/chat-model.js";
import User from "../Models/user-model.js";

export const Chat_Controller = {
  _sendMessage: async (req, res, next) => {
    try {
      const { reciever, sender, message, subject, id, profile, fullname } =
        req.body;
        console.log(req.body)
      const findChat = await Chat.findOne({
        sender: sender,
        reciever: reciever,
        subject: subject,
      });
      if (findChat) {
        const secondPayload = {
          id: id,
          fullname: fullname,
          profile: profile,
        };
        const payload = {
          sender: secondPayload,
          message: message,
        };
        findChat.chat.push(payload);
        findChat.save();
        return res.status(200).json({ data: findChat });
      } else {
        const secondPayload = {
          id: id,
          fullname: fullname,
          profile: profile,
        };
        const payload = {
          message: message,
          sender: secondPayload,
        };
        const createChat = await new Chat();
        createChat.sender = sender;
        createChat.reciever = reciever;
        createChat.subject = subject;
        createChat.chat.push(payload);
        createChat.save();
        return res.status(200).json({ data: createChat });
      }
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support!" + error,
      });
    }
  },
  _getChats: async (req, res, next) => {
    try {
      const { sender, reciever, subject } = req.body;
      const message = await Chat.find({
        sender: sender,
        reciever: reciever,
        subject: subject,
      });

      res.status(200).json({ data: message });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },
  _getMessages: async (req, res, next) => {
    try {
      const { sender } = req.body;
      const chat = await Chat.find({  receiver: sender});
      console.log(chat);
      // const reciever = await User.find({ fullname: chat.reciever });
      res.status(200).json({ data: chat });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Errro, please contact support!" });
    }
  },
};
