"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./Routes/user.routes"));
const auth_routes_1 = __importDefault(require("./Routes/auth.routes"));
const category_routes_1 = __importDefault(require("./Routes/category.routes"));
const gig_routes_1 = __importDefault(require("./Routes/gig.routes"));
const review_routes_1 = __importDefault(require("./Routes/review.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
// Routes
app.use("/users", user_routes_1.default);
app.use("/users", auth_routes_1.default);
app.use("/category", category_routes_1.default);
app.use("/gigs", gig_routes_1.default);
app.use("/reviews", review_routes_1.default);
const PORT = process.env.PORT;
app.use((error, req, res, next) => {
    res.status(500).json({
        error,
    });
});
app.listen(PORT, () => {
    console.log("App is listening on port", PORT);
});
