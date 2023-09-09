import { Router } from "express";
import routesUser from "./user/routing/user.routing";
const routes = Router();

routes.use("/", routesUser);
export default routes;
