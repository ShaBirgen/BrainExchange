CREATE OR ALTER PROCEDURE getAllReviews
AS
BEGIN
    SELECT * FROM Details WHERE isDeleted= 0;
END