CREATE OR ALTER PROCEDURE updateGig(
    @Gig_id VARCHAR(250),
    @user_id VARCHAR(250), 
    @Specialists_id VARCHAR(250), 
    @Description VARCHAR(250), 
    @Deadline VARCHAR(250), 
    @Salary INT, 
    @Duration VARCHAR(250)
)
AS 
BEGIN
    UPDATE Gigs SET
    user_id= @user_id, 
    Specialists_id= @Specialists_id, 
    Description=@Description, 
    Deadline=@Deadline, 
    Salary=@Salary, 
    Duration=@Duration

    WHERE Gig_id =@Gig_id
END