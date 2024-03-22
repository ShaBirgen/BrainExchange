import mssql from "mssql";
import dotenv from "dotenv";
import ejs from "ejs";
import { sqlConfig } from "../Config/sqlConfig";
import { sendMail } from "../Helpers/email.helpers";

export const newsLetter = async () => {
  const pool = await mssql.connect(sqlConfig);

  const Newsletter = (
    await pool.request().query("SELECT * FROM Newsletter WHERE isInformed = 0")
  ).recordset;

  console.log("Informing...", Newsletter);

  for (let News of Newsletter) {
    ejs.renderFile(
      "templates/informUser.ejs",
      {
        Title: News.Title,
        NewsBody: News.Body,
        // endDate: News.end_date,
        // asignee: News.asignee_name,
      },
      async (error, data) => {
        let mailOptions = {
          from: "sharoncherotich112@gmail.com",
          to: News.asignee_email,
          subject: "We are adding new categories.",
          html: data,
        };

        try {
          await sendMail(mailOptions);

          await pool
            .request()
            .query(
              "UPDATE Newsletter SET isInformed = 1 WHERE isInformed = 0"
            );

          console.log("Emails sent to  users");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};
