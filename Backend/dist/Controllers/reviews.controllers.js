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
exports.bySpecialistsId = exports.deleteReview = exports.getOneReview = exports.getAllReviews = exports.createReview = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../Config/sqlConfig");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        console.log(id);
        const user_id = req.params.user_id;
        const Specialists_id = req.params.Specialists_id;
        const { Stars, Review } = req.body;
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        if (Stars >= 1 && Stars <= 5) {
            const result = yield pool
                .request()
                .input("Review_id", mssql_1.default.VarChar, id)
                .input("user_id", mssql_1.default.VarChar, user_id)
                .input("Specialists_id", mssql_1.default.VarChar, Specialists_id)
                .input("Stars", mssql_1.default.Int, Stars)
                .input("Review", mssql_1.default.VarChar, Review)
                .execute("createReview");
            if (result.rowsAffected[0] > 0) {
                return res.status(201).json({
                    message: "Review submitted successfully",
                });
            }
            else {
                return res.status(500).json({
                    message: "Failed to submit review",
                });
            }
        }
        else {
            return res.status(400).json({
                message: "Stars must be between 1 and 5.",
            });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
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
        let Review = ((yield pool.request().input("Review_id", id).execute('getOneReview')).recordset);
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
            .input("Review_id", mssql_1.default.VarChar, id)
            .execute("deleteReview")).rowsAffected;
        console.log(result[0]);
        if (result[0] == 0) {
            return res.status(201).json({
                error: "Review not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Review deleted successfully",
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteReview = deleteReview;
const bySpecialistsId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Specialists_id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let Reviews = (yield pool.request().input("Specialists_id", Specialists_id).execute("specialistReview"))
            .recordset;
        if (Reviews.length > 0) {
            return res.json({
                Reviews
            });
        }
        else {
            return res.status(404).json({
                message: "No reviews found for this specialist",
            });
        }
    }
    catch (error) {
        console.log("Error in getting data from the database", error);
        return res.status(500).json({
            message: "There was an issue retrieving reviews"
        });
    }
});
exports.bySpecialistsId = bySpecialistsId;
