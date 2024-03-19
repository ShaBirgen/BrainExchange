"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_controllers_1 = require("../Controllers/reviews.controllers");
const reviewRouter = (0, express_1.Router)();
reviewRouter.post("/createReview", reviews_controllers_1.createReview);
reviewRouter.get("/getAllReviews", reviews_controllers_1.getAllReviews);
reviewRouter.get("/getOneReview/:id", reviews_controllers_1.getOneReview);
reviewRouter.delete("/deleteReview/:id", reviews_controllers_1.deleteReview);
exports.default = reviewRouter;
