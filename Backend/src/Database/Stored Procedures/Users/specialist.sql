CREATE OR ALTER PROCEDURE SpecialistInfo(
    @user_id VARCHAR(250),
    @First_Name VARCHAR(250),
    @Last_Name VARCHAR(250),
    @Speciality VARCHAR(250),
    @Rate INT,
    @Description VARCHAR(max)
)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Specialists WHERE user_id = @user_id)
    BEGIN
        UPDATE Specialists
        SET First_Name = @First_Name,
            Last_Name = @Last_Name,
            Speciality = @Speciality,
            Rate = @Rate,
            Description = @Description
        WHERE user_id = @user_id
    END
    ELSE
    BEGIN
        INSERT INTO Specialists (user_id, First_Name, Last_Name, Speciality, Rate, Description)
        VALUES (@user_id, @First_Name, @Last_Name, @Speciality, @Rate, @Description)
    END
END
