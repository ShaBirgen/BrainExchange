import { v4 } from "uuid";
import { execute } from "../../dbHelper/dbHelper";
import { exist } from "joi";

export async function createConversation(
  senderId: string,
  receiverId: string,
  message: string
) {
  // Check if conversation exists
  let procedure!: string;

  procedure = "chatExists";

  const exists = await execute(procedure, { senderId, receiverId });
  if (exists.recordset.length >= 1) {
    const chatId: string = exists.recordset[0].chatId as string;
    procedure = "createMessage";
    const messageId = v4();
    const result = await execute(procedure, { chatId, message, messageId });
  } else {
    const chatId = v4();
    const messageId = v4();
    procedure = "createChat";
    const result = execute(procedure, {
      chatId,
      senderId,
      receiverId,
      message,
      messageId,
    });
  }
}
