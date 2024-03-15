CREATE OR ALTER PROCEDURE deleteGig (@Gig_id VARCHAR(250))
AS 
BEGIN
    UPDATE Gigs SET isDeleted=1 WHERE Gig_id= @Gig_id;
END