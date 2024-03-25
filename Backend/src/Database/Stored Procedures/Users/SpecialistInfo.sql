CREATE OR ALTER PROCEDURE getSpecialistById(
    @user_id VARCHAR(255))
    AS
    BEGIN
    SELECT
u.user_id, Username, Email, Role, Phone_number, created_at, u.Profile_Image, c.categoryname, s.First_Name, s.Last_Name, s.Speciality, s.Rate, s.Description FROM Users u 
INNER JOIN Specialists s
ON u.user_id = s.user_id
INNER JOIN Categories c
ON s.Speciality = c.category_id
WHERE u.user_id = @user_id
END

SELECT
u.user_id, Username, Email, Role, Phone_number, created_at, u.Profile_Image, c.categoryname, s.First_Name, s.Last_Name, s.Speciality, s.Rate, s.Description FROM Users u 
INNER JOIN Specialists s
ON u.user_id = s.user_id
INNER JOIN Categories c
ON s.Speciality = c.categoryname
WHERE u.user_id = 'c030bd85-d78f-4606-8b8d-d1a47f5e715d'


SELECT * FROM Users
SELECT * FROM Specialists
SELECT * FROM Categories
