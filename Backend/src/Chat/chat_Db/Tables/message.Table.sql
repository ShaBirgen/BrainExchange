CREATE TABLE Messages(
	messageId VARCHAR(255),
	chatId VARCHAR(255),
	message VARCHAR(max),
	sentAt DATETIME,
	CONSTRAINT fk_chatId FOREIGN KEY(chatId)
	REFERENCES Chats(chatId)
)