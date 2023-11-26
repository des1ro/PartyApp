import { Response, Request, Router } from "express";
import { TripController } from "./controller/trip.controller";
import { TripService } from "./service/trip.db.service";
const routes = Router();
const tripController = new TripController(new TripService());
routes.get("/trip/:uuid?", async (req: Request, res: Response) => {
  await tripController.getTripByUuid(req, res);
});
routes.get("/trips/:propos?", async (req: Request, res: Response) => {
  await tripController.getAllTrips(req, res);
});
routes.post("/trip/", async (req: Request, res: Response) => {
  await tripController.createTrip(req, res);
});
routes.get("/trip-form", async (req: Request, res: Response) => {
  await tripController.getFrom(req, res);
});
routes.post("/trip", async (req: Request, res: Response) => {
  await tripController.updateTripByUuid(req, res);
});
routes.delete("/trip/:uuid?", async (req: Request, res: Response) => {
  await tripController.deleteTripByUuid(req, res);
});
export default routes;
