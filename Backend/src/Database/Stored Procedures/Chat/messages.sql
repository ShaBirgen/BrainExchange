CREATE OR ALTER PROCEDURE chatMessages(
    @chatId VARCHAR(255)
)
AS
BEGIN
    SELECT m.*, c.senderId, c.receiverId FROM Messages m
    INNER JOIN Chats c
    ON m.chatId = c.chatId
    WHERE m.chatId = @chatId
END;