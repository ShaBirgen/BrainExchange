import { Request, Response } from "express";
import mssql from "mssql";
import { sqlConfig } from "../Config/sqlConfig";

export const saveEmailToDatabase = async (req: Request, res: Response) => {
  try {
    const { Title, Body, asignee_email, isInformed } = req.body;
    const pool = await mssql.connect(sqlConfig);

    // Check if the email is already subscribed
    const existingEmail = await pool
      .request()
      .input("Email", asignee_email)
      .query("SELECT * FROM Email WHERE email = @Email");

    if (existingEmail.recordset.length > 0) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    // Save the email to the Email table
    await pool
      .request()
      .input("Email", asignee_email)
      .query("INSERT INTO Email (email) VALUES (@Email)");

    // Execute the stored procedure to insert into Newsletter and retrieve data
    const result = await pool
      .request()
      .input("Title", Title)
      .input("Body", Body)
      .input("asignee_email", asignee_email)
      .input("isInformed", isInformed)
      .execute("SaveEmailAndRetrieveData");

    // Handle the result as needed
    console.log("Stored procedure result:", result.recordset);

    return res.status(201).json({ message: "Email subscribed successfully" });
  } catch (error) {
    console.log("Error in saving email to the database", error);
    return res
      .status(500)
      .json({ message: "There was an issue saving email to the database" });
  }
};
