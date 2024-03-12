import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql, { pool } from "mssql";
import { User } from "../Interfaces/UserInterface";
import { sqlConfig } from "../Config/sqlConfig";
import bcrypt from "bcrypt";
// import Connection from "../DBHelper/dbhelper";
import { registerUserSchema } from "../Validators/register.validators";
import jwt from "jsonwebtoken";
import { loginUserSchema } from "../Validators/login.validators";
import { loginUser } from "./auth.controller";

export const registerUser = async (req: Request, res: Response) => {
  try {
    let id = v4();

    console.log(id);

    const { Username, Email, Password, Phone_number }: User = req.body;

    console.log(req.body);

    let { error } = registerUserSchema.validate(req.body);
    if (error) {
      return res.status(404).json({
        error: error.details[0].message,
      });
    }

    const hashed_pwd = await bcrypt.hash(Password, 5);

    const pool = await mssql.connect(sqlConfig);

    const validatedresult = (
      await pool
        .request()
        .input("email", mssql.VarChar, Email)
        .input("phone_number", mssql.VarChar, Phone_number)
        .execute("ifUserExists")
    ).recordset;

    console.log("Your result", validatedresult.length);

    if (validatedresult.length >= 1) {
      return res
        .status(201)
        .json({ messageerror: "This email or number is already in use" });
    } else {
      const result = (
        await pool
          .request()
          .input("user_id", mssql.VarChar, id)
          .input("username", mssql.VarChar, Username)
          .input("email", mssql.VarChar, Email)
          .input("phone_number", mssql.VarChar, Phone_number)
          .input("password", mssql.VarChar, hashed_pwd)
          .execute("registerUser")
      ).rowsAffected;

      console.log(result);
      return res.status(201).json({
        message: "Account was created succesfully.",
      });
    }
  } catch (err) {
    console.log(err);
    // return res.sendStatus(500).json({ message: err });
  }
};
//get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const {Email,Password}: User = req.body

    console.log(req.body);
     const pool = await mssql.connect(sqlConfig);

    let{error}= loginUserSchema.validate(req.body);
        if(error){
            return res.status(404).json({
                error: error.details[0].message,
            })
        }

        const validatedresult= (
            await pool
            .request()
            .input("email", mssql.VarChar, Email)
            .input("password", mssql.VarChar, Password)
            .execute(("loginUser"))
        ).recordset;

        console.log(validatedresult);
        return res.status(201).json({
            message: "Welcome back to BrainExchange"  
        });
    } catch(err){
        console.log(err);
        
    }
};

        
    


// export const getOneUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     console.log("User ID:", id);
//     let user = (await Connection.execute("getOneUser", { user_id: id }))
//       .recordset;

//     return res.json({ user });
//   } catch (error) {
//     console.log("Error in getting data from database", error);
//     return res
//       .status(201)
//       .json({ message: "There was an issue retrieving user" });
//   }
// };

// //updateUser

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;

//     const { Fname, Lname, email, phone_number }: User = req.body;
//     console.log("User ID:", id);
//     let result = (
//       await Connection.execute("updateUser", {
//         user_id: id,
//         Fname,
//         Lname,
//         email,
//         phone_number,
//       })
//     ).recordset;
//     return res.json({ message: "User updated successfully" });
//   } catch (error) {
//     console.log("Error in getting data from database", error);
//     return res.status(201).json({ message: "There was an issue updatinguser" });
//   }
// };

// //deleteUser
// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     console.log("User ID:", id);
//     let user = (await Connection.execute("deleteUser", { user_id: id }))
//       .rowsAffected;

//     return res.json({ message: "User Deleted Successfully" });
//   } catch (error) {
//     console.log("Error in getting data from database", error);
//     return res
//       .status(201)
//       .json({ message: "There was an issue deleting user" });
//   }
// };
