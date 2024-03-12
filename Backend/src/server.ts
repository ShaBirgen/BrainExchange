import express, { json, Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
import { sqlConfig } from "./Config/sqlConfig";
import mssql, { ConnectionPool } from "mssql";
import cors from "cors";
import userRouter from "./Routes/user.routes";
import auth_Router from "./Routes/auth.routes";
const app = express();

dotenv.config();

app.use(json());
app.use(cors());

// Routes
app.use("/users", userRouter)
app.use("/users", auth_Router)

const PORT = process.env.PORT as string;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error,
  });
});


      app.listen(PORT, () => {
        console.log("App is listening on port", PORT);
      });

