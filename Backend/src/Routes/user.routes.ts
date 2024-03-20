import { Router } from "express";
import {  deleteUser, getAllUsers, getOneUser, registerUser, setRole, setSpecialist, updateUser } from "../Controllers/user.controller";

const userRouter= Router();

    userRouter.post("/register", registerUser)
    userRouter.get("/getAllUsers", getAllUsers);
    userRouter.get("/getOneUser/:id", getOneUser);
    userRouter.post("/updateUser/:id", updateUser);
    userRouter.delete("/deleteUser/:id", deleteUser);
    userRouter.put("/set-role/:id", setRole);
    userRouter.post("/specialist/:id", setSpecialist);

export default userRouter;


