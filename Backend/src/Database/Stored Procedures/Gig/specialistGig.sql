CREATE OR ALTER PROCEDURE getOneGig (@Gig_id VARCHAR(250))
AS
BEGIN 
    SELECT Gigs.*, Users.Username
    FROM Gigs
    JOIN Users ON Gigs.user_id = Users.user_id
    WHERE Gigs.Gig_id = @Gig_id;
END


    SELECT *
    FROM Gigs
    WHERE Specialists_id = 'ebedff33-11d3-4633-98ee-abba9f54484d';