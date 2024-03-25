CREATE OR ALTER PROCEDURE getByUser
    @user_id VARCHAR(255)
AS 
BEGIN

    SELECT * FROM Gigs 
    WHERE user_id = @user_id;
END;