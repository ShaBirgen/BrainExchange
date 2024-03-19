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
exports.deleteGig = exports.updateGig = exports.getOneGig = exports.getAllGigs = exports.createGig = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../Config/sqlConfig");
const createGig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        console.log(id);
        const { user_id, Specialists_id, Description, Deadline, Salary, Duration, } = req.body;
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = (yield pool
            .request()
            .input("Gig_id", mssql_1.default.VarChar, id)
            .input("user_id", mssql_1.default.VarChar, user_id)
            .input("Specialists_id", mssql_1.default.VarChar, Specialists_id)
            .input("Description", mssql_1.default.VarChar, Description)
            .input("Deadline", mssql_1.default.VarChar, Deadline)
            .input("Salary", mssql_1.default.Int, Salary)
            .input("Duration", mssql_1.default.VarChar, Duration)
            .execute("createGig")).rowsAffected;
        console.log(result);
        return res.status(201).json({
            message: "Gig created successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500).json({ message: err });
    }
});
exports.createGig = createGig;
//GET ALL CATEGORIES
const getAllGigs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let allGigs = (yield pool.request().execute("getAllGigs")).recordset;
        return res.status(200).json({
            Gigs: allGigs,
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getAllGigs = getAllGigs;
//GET ONE CATEGORY
const getOneGig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let Gig = (yield pool.request().input("Gig_id", id).execute("getOneGig"))
            .recordset;
        return res.json({
            Gig,
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getOneGig = getOneGig;
//UPDATE CATEGORY
const updateGig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { user_id, Specialists_id, Description, Deadline, Salary, Duration } = req.body;
        console.log("Hello", id);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool
            .request()
            .input("Gig_id", id)
            .input("user_id", user_id)
            .input("Specialists_id", Specialists_id)
            .input("Description", Description)
            .input("Deadline", Deadline)
            .input("Salary", Salary)
            .input("Duration", Duration)
            .execute("updateGig")).rowsAffected;
        console.log(result);
        return res.status(200).json({
            message: "Gig updated successfully",
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.updateGig = updateGig;
// deleteGig
const deleteGig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool
            .request()
            .input("Gig_id", mssql_1.default.VarChar, id)
            .execute("deleteGig")).rowsAffected;
        console.log(result[0]);
        if (result[0] == 0) {
            return res.status(201).json({
                error: "Gig not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Gig deleted successfully",
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteGig = deleteGig;
