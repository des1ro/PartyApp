import { DataBaseError } from "../../database/error/database.exceptions";
import { TripError } from "../error/trip.exceptions";
import { TripService } from "../service/trip.db.service";
import { Trip } from "../tripDTO";
import { Request, Response } from "express";
const tripService = new TripService(); //działa
export class TripController {
  // tripService2: TripService;
  // constructor(private readonly tripService = tripService1 // nie działa
  //   ) {
  //   this.tripService2 = new TripService(); // nie działa
  // }

  async getAllTrips(req: Request, res: Response): Promise<void> {
    try {
      const trips = await tripService.getAllTrips();
      const data = {
        pageTitle: "Trips",
        trips: trips,
        authenticated: req.oidc.isAuthenticated(),
        propos: req.params.propos,
      };
      res.status(200).render("trips", data);
    } catch (error) {
      console.log(error);
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError });
    }
  }
  async getAcualTrips(req: Request, res: Response) {
    const userUuid: string = req.params.uuid;
  }
  async createTrip(req: Request, res: Response) {
    const data: Trip = req.body;
    const userId = req.query?.userId;
    try {
      // await tripService.createTrip(data);
      console.log(data);

      res.status(201).send(data);
    } catch (error) {
      if (error instanceof TripError) {
        res.status(409).json({ name: error.name, message: error.message });
        return;
      }
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError });
    }
  }
  async deleteTripByUuid(req: Request, res: Response) {
    const uuid = req.params.uuid;
    try {
      await tripService.deleteTripByUuid(uuid);
    } catch (error) {
      if (error instanceof TripError) {
        res.status(409).json({ name: error.name, message: error.message });
        return;
      }
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError });
    }
  }
  async updateTripByUuid(req: Request, res: Response) {
    const data = req.body;
    const uuid = req.params.uuid;
    try {
      await tripService.updateTripByUuid(uuid, data);
    } catch (error) {
      if (error instanceof TripError) {
        res.status(409).json({ name: error.name, message: error.message });
        return;
      }
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError });
    }
  }
  async getTripByUuid(req: Request, res: Response) {
    try {
      const trip = await tripService.getTripByUuid(req.params.uuid);
      if (trip) {
        const data = {
          pageTitle: "Trips",
          message: "Witaj na mojej stronie!",
          trip: trip,
          authenticated: req.oidc.isAuthenticated(),
        };
        res.render("trip", data);
        return;
      }
    } catch (error) {
      res.status(404).send(`Error: ${error}`);
    }
  }
}
