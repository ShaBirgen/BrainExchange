import { Router } from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getOneGig,
  updateGig,
} from "../Controllers/gigs.controller";

const gigRouter = Router();

gigRouter.post("/createGig", createGig);
gigRouter.get("/getAllGigs", getAllGigs);
gigRouter.get("/getOneGig/:id", getOneGig);
gigRouter.put("/updateGig/:id", updateGig);
gigRouter.delete("/deleteGig/:id", deleteGig);

export default gigRouter;
