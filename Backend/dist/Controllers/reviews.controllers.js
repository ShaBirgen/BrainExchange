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
exports.deleteReview = exports.getOneReview = exports.getAllReviews = exports.createReview = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../Config/sqlConfig");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        console.log(id);
        const { user_id, Specialists_id, review } = req.body;
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = (yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .input("Specialists_id", mssql_1.default.VarChar, Specialists_id)
            .input("review", mssql_1.default.VarChar, review)
            .execute("createReview")).rowsAffected;
        console.log(result);
        return res.status(201).json({
            message: "Review submitted successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500).json({ message: err });
    }
});
exports.createReview = createReview;
// GET ALL REVIEWS
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let allReviews = (yield pool.request().execute("getAllReviews")).recordset;
        return res.status(200).json({
            Reviews: allReviews,
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getAllReviews = getAllReviews;
// GET ONE REVIEW
const getOneReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let Review = ((yield pool.request().input("review_id", id).execute('getOneReview')).recordset);
        return res.json({ Review });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getOneReview = getOneReview;
// DELETE REVIEW 
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool
            .request()
            .input("review_id", mssql_1.default.VarChar, id)
            .execute("deleteReview")).rowsAffected;
        console.log(result[0]);
        if (result[0] == 0) {
            return res.status(201).json({
                error: "Review not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Revies deleted successfully",
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteReview = deleteReview;
