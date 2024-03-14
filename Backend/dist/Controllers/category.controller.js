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
exports.deleteCategory = exports.updateCategory = exports.getOneCategory = exports.getallCategories = exports.createCategory = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../Config/sqlConfig");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        console.log(id);
        const { categoryname, image } = req.body;
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const validatedresult = (yield pool
            .request()
            .input("categoryname", mssql_1.default.VarChar, categoryname)
            .execute("IfCategoryExists")).recordset;
        console.log("Your result", validatedresult.length);
        if (validatedresult.length >= 1) {
            return res
                .status(201)
                .json({ messageerror: "This Category Name already Exist" });
        }
        else {
            const result = (yield pool
                .request()
                .input("category_id", mssql_1.default.VarChar, id)
                .input("categoryname", mssql_1.default.VarChar, categoryname)
                .input("image", mssql_1.default.VarChar, image)
                .execute("createCategory")).rowsAffected;
            console.log(result);
            return res.status(201).json({
                message: `${categoryname} was added succesfully.`,
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500).json({ message: err });
    }
});
exports.createCategory = createCategory;
//get all Categories
const getallCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let allCategories = (yield pool.request().execute("getAllCategories")).recordset;
        return res.status(200).json({
            Categories: allCategories,
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getallCategories = getallCategories;
//get a Category
const getOneCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let category = (yield pool.request().input("category_id", id).execute('getOneCategory')).recordset;
        return res.json({
            category
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getOneCategory = getOneCategory;
//updateCategory
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { categoryname, image } = req.body;
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool
            .request()
            .input("category_id", id)
            .input("categoryname", mssql_1.default.VarChar, categoryname)
            .input("image", mssql_1.default.VarChar, image)
            .execute("updateCategory")).rowsAffected;
        console.log(result);
        return res.status(200).json({
            message: "Category updated successfully",
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.updateCategory = updateCategory;
// deleteCategory
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool
            .request()
            .input("category_id", mssql_1.default.VarChar, id)
            .execute("deleteCategory")).rowsAffected;
        console.log(result[0]);
        if (result[0] == 0) {
            return res.status(201).json({
                error: "Category not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Category deleted successfully",
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteCategory = deleteCategory;
