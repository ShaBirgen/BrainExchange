CREATE OR ALTER PROCEDURE deleteReview( @Review_id VARCHAR(250))
AS
BEGIN
    UPDATE Details SET isDeleted = 1 WHERE Review_id= @Review_id;
END