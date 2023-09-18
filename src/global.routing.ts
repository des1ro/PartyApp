import { Router } from "express";
import { authorization } from "./middlewares/auth";
import routesTrip from "./trip/trip.routing";
import routesUser from "./user/routing/user.routing";
const routes = Router();

routes.use("/", authorization, routesUser);
routes.use("/", authorization, routesTrip);
export default routes;
