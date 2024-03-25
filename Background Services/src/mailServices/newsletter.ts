import mssql from "mssql";
import dotenv from "dotenv";
import ejs from "ejs";
import { sqlConfig } from "../Config/sqlConfig";
import { sendMail } from "../Helpers/email.helpers";

dotenv.config(); // Load environment variables if any

export const newsLetter = async () => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const newsletters = await pool
      .request()
      .query("SELECT * FROM Newsletter WHERE isInformed = 0");

    const newslettersToSend = newsletters.recordset;

    console.log("Informing...", newslettersToSend);

    for (let news of newslettersToSend) {
      ejs.renderFile(
        "templates/newsletter.ejs",
        {
          Title: news.Title,
          NewsBody: news.Body,
          // endDate: news.end_date,
          asignee: news.asignee_email,
        },
        async (error, data) => {
          if (error) {
            console.error("Error rendering email template:", error);
            return; 
          }

          const mailOptions = {
            from: "sharoncherotich112@gmail.com",
            to: news.asignee_email,
            subject: "Your Newsletter Subject",
            html: data,
          };

          try {
            await sendMail(mailOptions);

           
      await pool
        .request()
        .input("id", mssql.VarChar, news.Newsletter_id)
        .query(
          "UPDATE Newsletter SET isInformed = 1 WHERE Newsletter_id = @id"
        );



            console.log("Email sent to user:", news.asignee_email);
          } catch (error) {
            console.error("Error sending email:", error);
            // Handle error appropriately, e.g., log, continue, or break the loop
          }
        }
      );
    }
  } catch (error) {
    console.error("Error processing newsletter:", error);
    // Handle error appropriately
  }
};

// import mssql from "mssql";
// import dotenv from "dotenv";
// import ejs from "ejs";
// import { sqlConfig } from "../Config/sqlConfig";
// import { sendMail } from "../Helpers/email.helpers";

// export const newsLetter = async () => {
//   const pool = await mssql.connect(sqlConfig);

//   const Newsletter = (
//     await pool.request().query("SELECT * FROM Newsletter WHERE isInformed = 0")
//   ).recordset;

//   console.log("Informing...", Newsletter);

//   for (let News of Newsletter) {
//     ejs.renderFile(
//       "templates/informUser.ejs",
//       {
//         Title: News.Title,
//         NewsBody: News.Body,
//         // endDate: News.end_date,
//         // asignee: News.asignee_name,
//       },
//       async (error, data) => {
//         let mailOptions = {
//           from: "sharoncherotich112@gmail.com",
//           to: News.asignee_email,
//           subject: "We are adding new categories.",
//           html: data,
//         };

//         try {
//           await sendMail(mailOptions);

//           await pool
//             .request()
//             .query(
//               "UPDATE Newsletter SET isInformed = 1 WHERE isInformed = 0"
//             );

//           console.log("Emails sent to  users");
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     );
//   }
// };
