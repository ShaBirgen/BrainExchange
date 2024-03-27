CREATE PROCEDURE createChats 
    @chatId VARCHAR(255),
    @senderId VARCHAR(255),
    @receiverId VARCHAR(255),
    @message VARCHAR(255),
    @messageId VARCHAR(255),
    @sentAt VARCHAR(255),
    @startedAt VARCHAR(255)
AS
BEGIN
    INSERT INTO Chats (chatId, senderId, receiverId, startedAt) 
    VALUES (@chatId, @senderId, @receiverId, @startedAt);

    INSERT INTO Messages (messageId, chatId, message, sentAt) 
    VALUES (@messageId, @chatId,@message, @sentAt);
END
