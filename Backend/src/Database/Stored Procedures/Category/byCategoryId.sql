CREATE OR ALTER PROCEDURE getbyCategoryId(
    @category_id VARCHAR(250)
    )

AS
BEGIN
    SELECT First_Name, Last_Name, Speciality, Description, Rate, c.categoryname, s.user_id FROM Specialists s
    INNER JOIN Categories c ON
    s.Speciality = c.category_id
WHERE Speciality = @category_id
END;


-- CREATE OR ALTER PROCEDURE getOneCategory
--     @category_id VARCHAR(250)
-- AS
-- BEGIN
--     SELECT 
--         C.*, 
--         C.category_id
--     FROM 
--         Categories C
--     INNER JOIN Specialists S ON 
--         C.category_id = S.Speciality
--     WHERE 
--         C.category_id = @category_id;
-- END;