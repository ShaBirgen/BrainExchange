CREATE OR ALTER PROCEDURE updateUser(
    @user_id VARCHAR(300),
    @Username VARCHAR(250),
    @Email VARCHAR(100),
    @Phone_number VARCHAR (250)
    
)
AS
BEGIN
    UPDATE Users SET 
        Username = @Username,
        Email = @Email, 
        Phone_number = @Phone_number
        
    WHERE user_id = @user_id
END