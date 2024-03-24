CREATE PROCEDURE getBySpecialists
    @Specialists_id VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Gigs
    WHERE Specialists_id = @Specialists_id;
END;
