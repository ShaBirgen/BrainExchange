import { Request, Response } from "express";
import bcrypt from "bcrypt";
import mssql from "mssql";
import jwt from "jsonwebtoken";
import { loginUserSchema } from "../Validators/login.validators";
import { sqlConfig } from "../Config/sqlConfig";
import dotenv from 'dotenv';

dotenv.config()

import { ExtendedUserRequest } from "../Middlewares/verifyToken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    let { error } = loginUserSchema.validate(req.body);
    if (error) {
      return res.status(404).json({
        error: error.details[0].message,
      });
    }
    const pool = await mssql.connect(sqlConfig);

    let result = await pool
      .request()
      .input("Email", Email)
      .input("Password", Password)
      .execute("loginUser");
    let user = result.recordset[0];

    if (!user) {
      return res.status(201).json({ error: "User not found" });
    }

    const correct_pwd = await bcrypt.compare(Password, user.Password);
    if (!correct_pwd) {
      return res.status(201).json({ error: "Incorrect password" });
    }

    const loginCredentials = {
      user_id: user.user_id,
      Email: user.Email,
      Usernname: user.Username,
      Role: user.Role,
      isdeleted: user.isdeleted,
    };

    console.log(user);
    

    let tokenage = 60 * 60 * 24 * 4;

    const token = jwt.sign(loginCredentials, process.env.SECRET as string, {
      expiresIn: tokenage,
    });

    return res.status(200).json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const checkdetails = async (req: ExtendedUserRequest, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    const pool = await mssql.connect(sqlConfig);

    let hashedPwd = await bcrypt.hash(Password, 5);

    let result = (
      await pool
        .request()
        .input("Email", Email)
        .input("Password", Password)
        .execute("resetPassword")
    ).rowsAffected;

    if (result[0] < 1) {
      return res.json({
        message: "User not found",
      });
    } else {
      return res.json({
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    return res.sendStatus(501).json({
      error: error,
    });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
