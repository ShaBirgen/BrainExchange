"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsLetter = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
const sqlConfig_1 = require("../Config/sqlConfig");
const email_helpers_1 = require("../Helpers/email.helpers");
dotenv_1.default.config(); // Load environment variables if any
const newsLetter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const newsletters = yield pool
            .request()
            .query("SELECT * FROM Newsletter WHERE isInformed = 0");
        const newslettersToSend = newsletters.recordset;
        console.log("Informing...", newslettersToSend);
        for (let news of newslettersToSend) {
            ejs_1.default.renderFile("templates/newsletter.ejs", {
                Title: news.Title,
                NewsBody: news.Body,
                // endDate: news.end_date,
                asignee: news.asignee_email,
            }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield (0, email_helpers_1.sendMail)(mailOptions);
                    yield pool
                        .request()
                        .input("id", mssql_1.default.VarChar, news.Newsletter_id)
                        .query("UPDATE Newsletter SET isInformed = 1 WHERE Newsletter_id = @id");
                    console.log("Email sent to user:", news.asignee_email);
                }
                catch (error) {
                    console.error("Error sending email:", error);
                    // Handle error appropriately, e.g., log, continue, or break the loop
                }
            }));
        }
    }
    catch (error) {
        console.error("Error processing newsletter:", error);
        // Handle error appropriately
    }
});
exports.newsLetter = newsLetter;
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
