"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object({
    Username: joi_1.default.string().required(),
    Email: joi_1.default.string().email().required(),
    Phone_number: joi_1.default.string().optional(),
    Password: joi_1.default.string().required(),
});
