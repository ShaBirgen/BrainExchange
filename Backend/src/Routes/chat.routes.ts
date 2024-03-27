import { Router } from "express";
import { chatMessages, createConversation, usersChats } from "../Controllers/chat.controller";

const chatRoutes = Router();

chatRoutes.get("/user-chats/:id", usersChats);
chatRoutes.post("/conversations", createConversation);
chatRoutes.get("/chat-messages/:id", chatMessages);

export default chatRoutes;
