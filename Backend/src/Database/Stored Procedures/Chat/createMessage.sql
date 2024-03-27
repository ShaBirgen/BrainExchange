CREATE PROCEDURE createMessages 
    @chatId VARCHAR(255),
    @message VARCHAR(255),
    @messageId VARCHAR(255)
AS
BEGIN
    INSERT INTO Messages (messageId, chatId, message, sentAt) 
    VALUES (@messageId, @chatId, @message, GETDATE()); 
END
