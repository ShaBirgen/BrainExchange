import { Router } from "express";
import {  deleteUser, getAllUsers, getOneUser, registerUser, updateUser } from "../Controllers/user.controller";

const userRouter= Router();

    userRouter.post("/register", registerUser)
    userRouter.get("/getAllUsers", getAllUsers);
    userRouter.get("/getOneUser/:id", getOneUser);
    userRouter.post("/updateUser/:id", updateUser);
    userRouter.delete("/deleteUser/:id", deleteUser);
    

export default userRouter;


