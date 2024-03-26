CREATE OR ALTER PROCEDURE createMessage(
	@messageId VARCHAR(255),
	@chatId VARCHAR(255),
	@message VARCHAR(max)
)
AS
BEGIN
	INSERT INTO Messages(messageId, chatId, message, sentAt)
	VALUES(@messageId, @chatId, @message, GETDATE());
END;