CREATE OR ALTER PROCEDURE getBySpecialistId(
    @Specialists_id VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Gigs WHERE Specialists_id = @Specialists_id
END