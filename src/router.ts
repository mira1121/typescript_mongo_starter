import { Router } from "express";
import * as user from "./controllers/user";
import * as uploadController from "./controllers/upload";
import upload from "./helper/upload.helper";

const routers = Router();

routers.post("/user", user.create);
routers.post("/upload", upload.single("file"), uploadController.create);


export default routers;
