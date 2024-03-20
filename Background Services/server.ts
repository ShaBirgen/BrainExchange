import express from "express";
import cron from "node-cron";
import { welcomeuser } from "./mailServices.ts/welcomeUser";
import { informProject } from "./mailServices.ts/projectInformer";
const app = express();

const run = async () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("checking for a new user");

    await welcomeuser();
    await informProject();
  });
};

run();

app.listen(4100, () => {
  console.log("Bg services running on port 4100");
});
