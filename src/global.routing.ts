import { Router } from "express";
import { authForUser } from "./middlewares/auth0";
import routesTrip from "./trip/trip.routing";
import routesUser from "./user/routing/user.routing";
import routesFriends from "./friendShip/routing/friendship.routing";
const routes = Router();

routes.use("/", routesUser);
routes.use("/", authForUser, routesTrip);
routes.use("/", routesFriends);
export default routes;
