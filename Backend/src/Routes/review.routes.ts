import { Router } from "express";
import { bySpecialistId, createReview, deleteReview, getAllReviews, getOneReview } from "../Controllers/reviews.controllers";


const reviewRouter= Router();

reviewRouter.post("/createReview", createReview);
reviewRouter.get("/getAllReviews", getAllReviews);
reviewRouter.get("/getOneReview/:id", getOneReview);
reviewRouter.delete("/deleteReview/:id", deleteReview);
reviewRouter.get("/specialistReview/:id", bySpecialistId)

export default reviewRouter;