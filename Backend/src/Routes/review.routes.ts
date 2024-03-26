import { Router } from "express";
import {  bySpecialistsId, createReview, deleteReview, getAllReviews, getOneReview } from "../Controllers/reviews.controllers";


const reviewRouter= Router();

reviewRouter.post("/createReview/:user_id/:Specialists_id", createReview);
reviewRouter.get("/getAllReviews", getAllReviews);
reviewRouter.get("/getOneReview/:id", getOneReview);
reviewRouter.delete("/deleteReview/:id", deleteReview);
reviewRouter.get("/specialistReview/:id", bySpecialistsId)

export default reviewRouter;