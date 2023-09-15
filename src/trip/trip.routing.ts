import { Router } from "express";
import { TripController } from "./service/trip.controller";
const routes = Router();
routes.get("/trip/:title?", TripController.getTripByTitle);
routes.get("/trips", TripController.getAllTrips);
routes.post("/trip/:userId?", TripController.createTrip);
routes.put("/trip", TripController.updateTripByTitle);
routes.delete("/trip/:title", TripController.deleteTripByTitle);
export default routes;
