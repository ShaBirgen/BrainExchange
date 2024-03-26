CREATE OR ALTER PROCEDURE chatExists(
    @senderId VARCHAR(255),
    @receiverId VARCHAR(255)
)
AS
BEGIN
     SELECT * FROM Chats WHERE senderId = @senderId AND receiverId = @receiverId OR senderId =@receiverId AND receiverId = @senderId
END