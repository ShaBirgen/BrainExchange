CREATE OR ALTER PROCEDURE setRole(
    @user_id VARCHAR (250),
    @Role VARCHAR (250)
)
AS
BEGIN
    UPDATE Users SET
             Role= @Role

    WHERE user_id= @user_id
END