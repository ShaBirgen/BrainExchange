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
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    let allusers = (await pool.request().execute("getAllUsers")).recordset;

    return res.status(200).json({
      users: allusers,
    });
  } catch (error) {
    return res.json({ error });
  }
};
        
    


export const getOneUser = async(req: Request, res:Response)=>{
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let user = (await pool.request().input("user_id", id).execute('getOneUser')).recordset

        return res.json({
            user
        })
    } catch (error) {
        return res.json({error})
    }
  }

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { Username, Email, Phone_number} = req.body;

    console.log(req.body);
    

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool
        .request()
        .input("user_id", id)
        .input("Username", mssql.VarChar, Username)
        .input("Email", mssql.VarChar, Email)
        .input("Phone_number", mssql.VarChar, Phone_number)
        .execute("updateUser")
    ).rowsAffected;

    console.log(result);

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.json({ error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool
        .request()
        .input("user_id", mssql.VarChar, id)
        .execute("deleteuser")
    ).rowsAffected;

    console.log(result[0]);

    if (result[0] == 0) {
      return res.status(201).json({
        error: "User not found",
      });
    } else {
      return res.status(200).json({
        message: "Account deleted successfully",
      });
    }
  } catch (error) {
    return res.json({ error });
  }
};