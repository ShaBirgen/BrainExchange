CREATE OR ALTER PROCEDURE getOneGig (@Gig_id VARCHAR(250))
AS
BEGIN
SELECT * FROM Gigs WHERE Gig_id = @Gig_id
END;