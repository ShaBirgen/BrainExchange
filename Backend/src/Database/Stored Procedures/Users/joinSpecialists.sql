CREATE OR ALTER PROCEDURE JoinSpecialist(
@user_id VARCHAR(255)
)
AS
BEGIN
SELECT 
u.user_id, Username, Email, Role, Phone_number, created_at, s.First_Name, s.Last_Name, s.Speciality, s.Rate, s.Description FROM Users u 
INNER JOIN Specialists s
ON u.user_id = s.user_id
WHERE u.user_id = @user_id
END

SELECT * FROM Users;
SELECT * FROM Specialists