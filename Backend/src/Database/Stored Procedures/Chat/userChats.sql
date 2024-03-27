
CREATE OR ALTER PROCEDURE userChats(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT c.*, u.Username FROM Chats c
    INNER JOIN Users u
    ON c.receiverId = u.user_id 
    WHERE senderId = @userId OR receiverId = @userId
END;
