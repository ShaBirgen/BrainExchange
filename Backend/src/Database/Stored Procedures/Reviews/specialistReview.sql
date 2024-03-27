CREATE OR ALTER PROCEDURE specialistReview(
    @Specialists_id VARCHAR(255)
)
AS
BEGIN
    SELECT D.Review_id, D.user_id, D.Specialists_id, D.Stars, D.Review, U.Username
    FROM Details D
    INNER JOIN Users U 
    ON D.user_id = U.user_id
    WHERE D.Specialists_id = @Specialists_id
END