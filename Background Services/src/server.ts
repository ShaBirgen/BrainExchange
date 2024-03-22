import express from "express";
import cron from "node-cron";
import { newsLetter } from "./mailServices/newsletter";
const app = express();

const run = async () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("checking for a new user");

    await newsLetter();
  });
};

run();

app.listen(4100, () => {
  console.log("Bg services running on port 4100");
});
