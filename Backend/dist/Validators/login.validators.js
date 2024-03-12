"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginUserSchema = joi_1.default.object({
    Email: joi_1.default.string().email().required(),
    Password: joi_1.default.string().required(),
});
