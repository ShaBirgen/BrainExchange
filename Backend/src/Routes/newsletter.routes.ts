import {Router} from "express"
import { saveEmailToDatabase } from "../Controllers/newsletter";


const newsRouter = Router();

newsRouter.post("/sendEmail", saveEmailToDatabase);

export default newsRouter;