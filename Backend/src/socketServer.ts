import { Server, Socket } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { v4 } from "uuid";
import { createConversation } from "./Chat/chat_Functions/createConversation";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

const connectedUsers: Map<string, Socket> = new Map();

io.on("connection", (socket: Socket) => {
  const chatId = v4();
  // Get the Id of the connected user who is a potential message sender
  const senderId: string = socket.handshake.headers.senderid as string;
  // Keep track of the connected users
  connectedUsers.set(senderId, socket);

  console.log("A client connected", socket.id, "with userId:", senderId);

  socket.on("message", (message: { message: string; recipientId: string }) => {
    console.log(
      "Received message:",
      message.message,
      "To be sent to",
      message.recipientId
    );

    // Get the Id of the user
    const recipientSocket = connectedUsers.get(message.recipientId);

    // Check if the recipient is connected and send the message to them if they are connected
    if (recipientSocket) {
      createConversation(senderId, message.recipientId, message.message);
      recipientSocket.emit("message", {
        message: message.message,
        sender: senderId,
      });
      console.log("emitting to recipient", message.recipientId);
    } else {
      console.log(
        "Recipient with userId",
        message.recipientId,
        "is not connected."
      );
    }
  });
});

const PORT = 5050;
httpServer.listen(PORT, () => {
  console.log(`Waiting for chats on port ${PORT}`);
});
