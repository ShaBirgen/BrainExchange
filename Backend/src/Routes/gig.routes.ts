import { Router } from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getBySpecialists,
  getOneGig,
  updateGig,
} from "../Controllers/gigs.controller";

const gigRouter = Router();

gigRouter.post("/createGig/:user_id/:Specialists_id", createGig);
gigRouter.get("/getAllGigs", getAllGigs);
gigRouter.get("/getOneGig/:id", getOneGig);
gigRouter.get("/gigSpecialists/:id", getBySpecialists);
gigRouter.put("/updateGig/:id", updateGig);
gigRouter.delete("/deleteGig/:id", deleteGig);

export default gigRouter;
