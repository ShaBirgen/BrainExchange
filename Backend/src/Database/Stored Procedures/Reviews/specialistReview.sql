CREATE OR ALTER PROCEDURE getBySpecialistsId(
    @Specialists_id VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Details WHERE Specialists_id = @Specialists_id
END