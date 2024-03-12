import { Router } from "express";
import { registerUser } from "../Controllers/user.controller";

const userRouter= Router();

    userRouter.post("/register", registerUser)

export default userRouter;


