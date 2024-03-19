CREATE OR ALTER PROCEDURE createReview(
    @Review_id VARCHAR (255),
    @user_id VARCHAR (255),
    @Specialists_id VARCHAR (255),
    @review VARCHAR (255)
)
AS 
BEGIN
    INSERT INTO Details(Review_id, user_id, Specialists_id,review)
    VALUES(@Review_id, @user_id, @Specialists_id, @review)
END