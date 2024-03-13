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
exports.logoutUser = exports.resetPassword = exports.checkdetails = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mssql_1 = __importDefault(require("mssql"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_validators_1 = require("../Validators/login.validators");
const sqlConfig_1 = require("../Config/sqlConfig");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        let { error } = login_validators_1.loginUserSchema.validate(req.body);
        if (error) {
            return res.status(404).json({
                error: error.details[0].message,
            });
        }
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = yield pool
            .request()
            .input("Email", Email)
            .input("Password", Password)
            .execute("loginUser");
        let user = result.recordset[0];
        if (!user) {
            return res.status(201).json({ error: "User not found" });
        }
        const correct_pwd = yield bcrypt_1.default.compare(Password, user.Password);
        if (!correct_pwd) {
            return res.status(201).json({ error: "Incorrect password" });
        }
        const loginCredentials = {
            user_id: user.user_id,
            Email: user.email,
            Usernname: user.Fname,
            Role: user.role,
            isdeleted: user.isdeleted,
        };
        let tokenage = 60 * 60 * 24 * 4;
        const token = jsonwebtoken_1.default.sign(loginCredentials, process.env.SECRET, {
            expiresIn: tokenage,
        });
        return res.status(200).json({
            message: "Logged in successfully",
            token,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.loginUser = loginUser;
const checkdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info,
        });
    }
});
exports.checkdetails = checkdetails;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let hashedPwd = yield bcrypt_1.default.hash(Password, 5);
        let result = (yield pool
            .request()
            .input("Email", Email)
            .input("Password", Password)
            .execute("resetPassword")).rowsAffected;
        if (result[0] < 1) {
            return res.json({
                message: "User not found",
            });
        }
        else {
            return res.json({
                message: "Password updated successfully",
            });
        }
    }
    catch (error) {
        return res.sendStatus(501).json({
            error: error,
        });
    }
});
exports.resetPassword = resetPassword;
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};
exports.logoutUser = logoutUser;
