CREATE OR ALTER PROCEDURE createReview
    @Review_id VARCHAR(255),
    @user_id VARCHAR(255),
    @Specialists_id VARCHAR(255),
    @Stars INT,
    @Review VARCHAR(255)
AS 
BEGIN
    IF @Stars BETWEEN 1 AND 5
    BEGIN
        INSERT INTO Details (Review_id, user_id, Specialists_id, Stars, Review)
        VALUES (@Review_id, @user_id, @Specialists_id, @Stars, @Review)
    END
    ELSE
    BEGIN
        RAISERROR ('Stars must be between 1 and 5.', 16, 1)
    END
END
