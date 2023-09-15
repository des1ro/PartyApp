import { Router } from "express";
import routesUser from "./user/routing/user.routing";
import routesTrip from "./trip/trip.routing";
const routes = Router();

routes.use("/", routesUser);
routes.use("/", routesTrip);
export default routes;
