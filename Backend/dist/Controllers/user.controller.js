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
exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getAllUsers = exports.registerUser = exports.setSpecialist = exports.setRole = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../Config/sqlConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register_validators_1 = require("../Validators/register.validators");
const setRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_Id = req.params.id;
        const { Role } = req.body;
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = (yield pool
            .request()
            .input("user_Id", mssql_1.default.VarChar, user_Id)
            .input("Role", mssql_1.default.VarChar, Role.trim())
            .query("UPDATE Users SET Role = @Role WHERE user_Id = @user_Id")).rowsAffected;
        return res.status(200).json({
            success: "Role set successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
});
exports.setRole = setRole;
const setSpecialist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        const { First_Name, Last_Name, Speciality, Rate, Description } = req.body;
        console.log(req.body);
        // Validate incoming data
        const { error } = register_validators_1.specialistInfoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message,
            });
        }
        // Connect to the database
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // Execute stored procedure
        const result = yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .input("First_Name", mssql_1.default.VarChar, First_Name)
            .input("Last_Name", mssql_1.default.VarChar, Last_Name)
            .input("Speciality", mssql_1.default.VarChar, Speciality)
            .input("Rate", mssql_1.default.Int, Rate)
            .input("Description", mssql_1.default.VarChar, Description)
            .execute("SpecialistInfo");
        // Check if any rows were affected
        if (result.rowsAffected[0] > 0) {
            console.log("Specialist information saved successfully.");
            return res.status(201).json({
                message: "Your information has been saved successfully.",
            });
        }
        else {
            // If no rows were affected, handle accordingly
            console.log("No rows were affected. Specialist information not saved.");
            return res.status(400).json({
                error: "Failed to save specialist information.",
            });
        }
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            error: "Internal server error.",
        });
    }
});
exports.setSpecialist = setSpecialist;
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
                id,
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
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let allusers = (yield pool.request().execute("getAllUsers")).recordset;
        return res.status(200).json({
            users: allusers,
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let user = (yield pool.request().input("user_id", id).execute("JoinSpecialist"))
            .recordset;
        return res.json({
            user,
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getOneUser = getOneUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { Username, Email, Phone_number } = req.body;
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool
            .request()
            .input("user_id", id)
            .input("Username", mssql_1.default.VarChar, Username)
            .input("Email", mssql_1.default.VarChar, Email)
            .input("Phone_number", mssql_1.default.VarChar, Phone_number)
            .execute("updateUser")).rowsAffected;
        console.log(result);
        return res.status(200).json({
            message: "User updated successfully",
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, id)
            .execute("deleteuser")).rowsAffected;
        console.log(result[0]);
        if (result[0] == 0) {
            return res.status(201).json({
                error: "User not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Account deleted successfully",
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteUser = deleteUser;
