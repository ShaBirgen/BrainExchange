CREATE OR ALTER PROCEDURE getBySpecialistsId
    @Specialists_id VARCHAR(250)
AS
BEGIN 
    SELECT G.Gig_id, G.Description, G.Specialists_id, G.Deadline, G.Duration, G.Salary, U.Username
    FROM Gigs G
    INNER JOIN Users U ON G.user_id = U.user_id
    WHERE G.Specialists_id = @Specialists_id
END




    SELECT *
    FROM Gigs
    WHERE Specialists_id = 'ebedff33-11d3-4633-98ee-abba9f54484d';