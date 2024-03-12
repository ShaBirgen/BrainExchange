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
exports.getUsers = exports.registerUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../Config/sqlConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import Connection from "../DBHelper/dbhelper";
const register_validators_1 = require("../Validators/register.validators");
const login_validators_1 = require("../Validators/login.validators");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        console.log(id);
        const { Username, Email, Password, Phone_number } = req.body;
        console.log(req.body);
        let { error } = register_validators_1.registerUserSchema.validate(req.body);
        if (error) {
            return res.status(404).json({
                error: error.details[0].message,
            });
        }
        const hashed_pwd = yield bcrypt_1.default.hash(Password, 5);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const validatedresult = (yield pool
            .request()
            .input("email", mssql_1.default.VarChar, Email)
            .input("phone_number", mssql_1.default.VarChar, Phone_number)
            .execute("ifUserExists")).recordset;
        console.log("Your result", validatedresult.length);
        if (validatedresult.length >= 1) {
            return res
                .status(201)
                .json({ messageerror: "This email or number is already in use" });
        }
        else {
            const result = (yield pool
                .request()
                .input("user_id", mssql_1.default.VarChar, id)
                .input("username", mssql_1.default.VarChar, Username)
                .input("email", mssql_1.default.VarChar, Email)
                .input("phone_number", mssql_1.default.VarChar, Phone_number)
                .input("password", mssql_1.default.VarChar, hashed_pwd)
                .execute("registerUser")).rowsAffected;
            console.log(result);
            return res.status(201).json({
                message: "Account was created succesfully.",
            });
        }
    }
    catch (err) {
        console.log(err);
        // return res.sendStatus(500).json({ message: err });
    }
});
exports.registerUser = registerUser;
//get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let { error } = login_validators_1.loginUserSchema.validate(req.body);
        if (error) {
            return res.status(404).json({
                error: error.details[0].message,
            });
        }
        const validatedresult = (yield pool
            .request()
            .input("email", mssql_1.default.VarChar, Email)
            .input("password", mssql_1.default.VarChar, Password)
            .execute(("loginUser"))).recordset;
        console.log(validatedresult);
        return res.status(201).json({
            message: "Welcome back to BrainExchange"
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUsers = getUsers;
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
