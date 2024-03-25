import { Router } from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getBySpecialists,
  getByUser,
  getOneGig,
  updateGig,
} from "../Controllers/gigs.controller";

const gigRouter = Router();

gigRouter.post("/createGig/:user_id/:Specialists_id", createGig);
gigRouter.get("/getAllGigs", getAllGigs);
gigRouter.get("/getOneGig/:id", getOneGig);
gigRouter.get("/gigSpecialists/:id", getBySpecialists);
gigRouter.get("/userGigs/:id", getByUser);
gigRouter.put("/updateGig/:id", updateGig);
gigRouter.delete("/deleteGig/:id", deleteGig);

export default gigRouter;
