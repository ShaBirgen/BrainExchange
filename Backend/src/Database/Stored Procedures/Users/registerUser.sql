CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(250),
    @Username VARCHAR(250),
    @Email VARCHAR(250) , 
    @Password VARCHAR(200),
    @Phone_number VARCHAR(255)
  ) 
  AS
  BEGIN
    INSERT INTO Users(user_id, Username,created_at, Email, Password, Phone_number )
    VALUES(@user_id, @Username,GETDATE(), @Email, @Password, @Phone_number)
  END