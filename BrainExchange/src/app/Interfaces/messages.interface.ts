export interface chatRespone {
  chats: [
    {
      chatId: string;
      senderId: string;
      receiverId: string;
      startedAt: Date;
      fullName: string;
    }
  ];
}

export interface Chat {
  chatId: string;
  senderId: string;
  receiverId: string;
  startedAt: Date;
  fullName: string;
}

export interface messagesResponse {
  messages: [
    {
      messagesId: string;
      chatId: string;
      message: string;
      sentAt: string;
      senderId: string;
      receiverId: string;
    }
  ];
}

export interface MessageInterface {
  messagesId: string;
  chatId: string;
  message: string;
  sentAt: string;
  senderId: string;
  receiverId: string;
}
