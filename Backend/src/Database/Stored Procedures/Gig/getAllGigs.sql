CREATE OR ALTER PROCEDURE getallGigs
AS
BEGIN
    SELECT * FROM Gigs WHERE isDeleted= 0;  
END;