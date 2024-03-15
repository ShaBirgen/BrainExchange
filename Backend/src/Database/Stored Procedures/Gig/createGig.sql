CREATE OR ALTER PROCEDURE createGig(
     @Gig_id VARCHAR (255),
	 @user_id VARCHAR(255), 
	 @Specialists_id VARCHAR (255), 
	 @Description TEXT, 
	 @Deadline VARCHAR(255), 
	 @Salary INT, 
	 @Duration VARCHAR(255) 
    )
AS
BEGIN
    INSERT INTO Gigs( Gig_id ,user_id, Specialists_id, Description, Deadline, Salary, Duration)
    VALUES( @Gig_id, @user_id, @Specialists_id, @Description, @Deadline, @Salary, @Duration)
END