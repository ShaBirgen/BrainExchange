CREATE OR ALTER PROCEDURE getBySpecialists
    @Specialists_id VARCHAR(255)
AS
BEGIN

    SELECT *
    FROM Gigs
    WHERE Specialists_id = @Specialists_id;
END;


    SELECT *
    FROM Gigs
    WHERE Specialists_id = 'ebedff33-11d3-4633-98ee-abba9f54484d';