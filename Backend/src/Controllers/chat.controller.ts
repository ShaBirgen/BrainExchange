import { Request, Response } from "express";
import { execute } from "../dbHelper/dbHelper";
import { v4 } from "uuid";

export const usersChats = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id as string;

    let procedure = "userChats";

    const chats = (await execute(procedure, { userId })).recordset;

    return res.status(200).json({
      chats,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const chatMessages = async (req: Request, res: Response) => {
  try {
    const chatId: string = req.params.id as string;

    let procedure: string = "chatMessages";

    const messages = (await execute(procedure, { chatId })).recordset;

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Check if conversation exists
    let procedure = "chatExists";
    const exists = await execute(procedure, { senderId, receiverId });

    if (exists.recordset.length >= 1) {
      const chatId: string = exists.recordset[0].chatId as string;
      procedure = "createMessage";
      const messageId = v4();
      await execute(procedure, { chatId, message, messageId });
    } else {
      const chatId = v4();
      const messageId = v4();
      procedure = "createChat";
      await execute(procedure, {
        chatId,
        senderId,
        receiverId,
        message,
        messageId,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Conversation created successfully",
    });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
