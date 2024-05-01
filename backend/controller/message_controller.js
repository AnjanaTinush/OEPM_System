const Conversations = require("../models/Financial model.js/ConversationsModel");
const Users = require("../models/usersModel")
const  Messages = require("../models/Financial model.js/messagesModel")

async function createConversation(req,res){
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = new Conversations({
          members: [senderId, receiverId],
        });
        await newConversation.save();
        res.status(200).send("Conversation created successfully");
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function getConversation(req,res){
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({
          members: { $in: [userId] },
        });
        const conversationUserData = Promise.all(
          conversations.map(async (conversation) => {
            const receiverId = conversation.members.find(
              (member) => member !== userId
            );
            const user = await Users.findById(receiverId);
            return {
              user: {
                receiverId: user._id,
                email: user.email,
                fullName: user.fullName,
              },
              conversationId: conversation._id,
            };
          })
        );
        res.status(200).json(await conversationUserData);
      } catch (error) {
        console.log(error, "Error");
      }
}


async function createMessage(req,res){
    try {
        const { conversationId, senderId, message, receiverId = "" } = req.body;
        if (!senderId || !message)
          return res.status(400).send("Please fill all required fields");
        if (conversationId === "new" && receiverId) {
          const newCoversation = new Conversations({
            members: [senderId, receiverId],
          });
          await newCoversation.save();
          const newMessage = new Messages({
            conversationId: newCoversation._id,
            senderId,
            message,
          });
          await newMessage.save();
          return res.status(200).send("Message sent successfully");
        } else if (!conversationId && !receiverId) {
          return res.status(400).send("Please fill all required fields");
        }
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        res.status(200).send("Message sent successfully");
      } catch (error) {
        console.log(error, "Error");
      }
}

async function getMessage(req,res){
    try {
        const checkMessages = async (conversationId) => {
          console.log(conversationId, "conversationId");
          const messages = await Messages.find({ conversationId });
          const messageUserData = Promise.all(
            messages.map(async (message) => {
              const user = await Users.findById(message.senderId);
              return {
                user: { id: user._id, email: user.email, fullName: user.fullName },
                message: message.message,
              };
            })
          );
          res.status(200).json(await messageUserData);
        };
        const conversationId = req.params.conversationId;
        if (conversationId === "new") {
          const checkConversation = await Conversations.find({
            members: { $all: [req.query.senderId, req.query.receiverId] },
          });
          if (checkConversation.length > 0) {
            checkMessages(checkConversation[0]._id);
          } else {
            return res.status(200).json([]);
          }
        } else {
          checkMessages(conversationId);
        }
      } catch (error) {
        console.log("Error", error);
      }
}

async function getUsersByid(req,res){
    try {
        const userId = req.params.userId;
        const users = await Users.find({ _id: { $ne: userId } });
        const usersData = Promise.all(
          users.map(async (user) => {
            return {
              user: {
                email: user.email,
                fullName: user.fullName,
                receiverId: user._id,
              },
            };
          })
        );
        res.status(200).json(await usersData);
      } catch (error) {
        console.log("Error", error);
      }
}


module.exports = {
    createConversation,
    getConversation,
    createMessage,
    getMessage,
    getUsersByid,
}