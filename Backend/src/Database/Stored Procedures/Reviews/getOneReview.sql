CREATE OR ALTER PROCEDURE getOneReview(@Review_id VARCHAR(250))
AS
BEGIN
SELECT * FROM Details WHERE Review_id= @Review_id
END