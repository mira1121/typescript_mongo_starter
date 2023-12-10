import { Router } from "express";
import * as user from "./controllers/user";

const routers = Router();

routers.post("/user", user.create);


export default routers;
