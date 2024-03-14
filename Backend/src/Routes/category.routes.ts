import { Router } from "express";
import {
  createCategory, deleteCategory, getOneCategory, getallCategories, updateCategory,
} from "../Controllers/category.controller";

const categoryRouter = Router();

categoryRouter.post("/createCategory", createCategory);
categoryRouter.get("/getAllCategories", getallCategories);
categoryRouter.get("/getOneCategory/:id",  getOneCategory);
categoryRouter.put("/updateCategory/:id", updateCategory);
categoryRouter.delete("/deleteCategory/:id",  deleteCategory);
export default categoryRouter;
