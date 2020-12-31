import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/uploads";

import BarController from "./controllers/BarController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/bares", BarController.index);
routes.get("/bares/:id", BarController.show);
routes.post("/bares", upload.array("images"), BarController.create);

export default routes;
