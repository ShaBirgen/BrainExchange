CREATE OR ALTER PROCEDURE getOneGig (@Gig_id VARCHAR(250))
AS
BEGIN
SELECT * FROM Gigs WHERE Gig_id = @Gig_id
END;

-- CREATE OR ALTER PROCEDURE getOneGig (@Gig_id VARCHAR(250))
-- AS
-- BEGIN 
--     SELECT Gigs.*, Users.Username
--     FROM Gigs
--     JOIN Users ON Gigs.user_id = Users.user_id
--     WHERE Gigs.Gig_id = @Gig_id;
-- END
