import { Request, Response } from "express";
import { DataBaseError } from "../../database/error/database.exceptions";
import { TripError } from "../error/trip.exceptions";
import { TripService } from "../service/trip.db.service";
import { TripDTO } from "../tripDTO";
export class TripController {
  constructor(private readonly tripService: TripService) {}
  async getFrom(req: Request, res: Response) {
    const data = {
      authenticated: req.oidc.isAuthenticated(),
      propos: req.params.propos,
      users: [
        {
          uuid: "1",
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: new Date("1990-01-01"),
          email: "john.doe@example.com",
          phoneNumber: "123456789",
          picture: "",
        },
        {
          uuid: "2",
          firstName: "Jane",
          lastName: "Doe",
          dateOfBirth: new Date("1992-05-15"),
          email: "jane.doe@example.com",
          phoneNumber: "987654321",
          picture:
            "https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-18-27-49.png",
        },
        {
          uuid: "3",
          firstName: "Alice",
          lastName: "Smith",
          dateOfBirth: new Date("1985-08-22"),
          email: "alice.smith@example.com",
          picture:
            "https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-18-27-49.png",
        },
        {
          uuid: "google-oauth2|10713160598123197161442",
          firstName: "Jan",
          lastName: "Maliszewski",
          dateOfBirth: new Date(2023 - 11 - 23),
          email: "jasio182016@gmail.com",
          phoneNumber: "796368599",
          picture:
            "https://lh3.googleusercontent.com/a/ACg8ocKc5jyE0IvfPXdlP2i96Uqytqf28LH_gPE7UM7xmQJ-IA=s96-c",

          role: "USER",
        },
        {
          uuid: "google-oauth2|1071316052323323981197161442",
          firstName: "Jan",
          lastName: "Maliszewski",
          dateOfBirth: new Date(2023 - 11 - 23),
          email: "jasio182016@gmail.com",
          phoneNumber: "796368599",
          picture:
            "https://lh3.googleusercontent.com/a/ACg8ocKc5jyE0IvfPXdlP2i96Uqytqf28LH_gPE7UM7xmQJ-IA=s96-c",

          role: "USER",
        },
        {
          uuid: "google-oauth2|107131623323232305981197161442",
          firstName: "Jan",
          lastName: "Maliszewski",
          dateOfBirth: new Date(2023 - 11 - 23),
          email: "jasio182016@gmail.com",
          phoneNumber: "796368599",
          picture:
            "https://lh3.googleusercontent.com/a/ACg8ocKc5jyE0IvfPXdlP2i96Uqytqf28LH_gPE7UM7xmQJ-IA=s96-c",

          role: "USER",
        },
        {
          uuid: "google-oauth2|107131602332323232981197161442",
          firstName: "Jan",
          lastName: "Maliszewski",
          dateOfBirth: new Date(2023 - 11 - 23),
          email: "jasio182016@gmail.com",
          phoneNumber: "796368599",
          picture:
            "https://lh3.googleusercontent.com/a/ACg8ocKc5jyE0IvfPXdlP2i96Uqytqf28LH_gPE7UM7xmQJ-IA=s96-c",

          role: "USER",
        },
        {
          uuid: "google-oauth2|107233232323232131605981197161442",
          firstName: "Jan",
          lastName: "Maliszewski",
          dateOfBirth: new Date(2023 - 11 - 23),
          email: "jasio182016@gmail.com",
          phoneNumber: "796368599",
          picture:
            "https://lh3.googleusercontent.com/a/ACg8ocKc5jyE0IvfPXdlP2i96Uqytqf28LH_gPE7UM7xmQJ-IA=s96-c",

          role: "USER",
        },
        {
          uuid: "google-oauth2|10713162342342305981197161442",
          firstName: "Jan",
          lastName: "Maliszewski",
          dateOfBirth: new Date(2023 - 11 - 23),
          email: "jasio182016@gmail.com",
          phoneNumber: "796368599",
          picture:
            "https://lh3.googleusercontent.com/a/ACg8ocKc5jyE0IvfPXdlP2i96Uqytqf28LH_gPE7UM7xmQJ-IA=s96-c",

          role: "USER",
        },
        {
          uuid: "google-oauth2|10712342342331605981197161442",
          firstName: "Jan",
          lastName: "Maliszewski",
          dateOfBirth: new Date(2023 - 11 - 23),
          email: "jasio182016@gmail.com",
          phoneNumber: "796368599",
          picture:
            "https://lh3.googleusercontent.com/a/ACg8ocKc5jyE0IvfPXdlP2i96Uqytqf28LH_gPE7UM7xmQJ-IA=s96-c",

          role: "USER",
        },
      ],
    };
    res.status(200).render("trip-form", data);
  }
  async createTrip(req: Request, res: Response) {
    const trip: TripDTO = {
      authorTripId: req.oidc.user!.sub,
      title: req.body.title,
      place: req.body.place,
      published: !!req.body.published,
      category: req.body.category,
    };
    let imagesPath: string[] = [];
    if (req.files && req.files.pictures) {
      const images = Array.isArray(req.files.pictures)
        ? req.files.pictures
        : [req.files.pictures];
      console.log(images);

      for (const image of images) {
        imagesPath.push(image.tempFilePath);
      }
      console.log(imagesPath);
    }
    try {
      await this.tripService.createTrip(trip, imagesPath);
      const data = {
        pageTitle: "Trips",
        authenticated: req.oidc.isAuthenticated(),
        propos: req.params.propos,
      };
      res.status(201).render("index", data);
    } catch (error) {
      console.log(error);

      if (error instanceof TripError) {
        res.status(409).render("tripError", {
          authenticated: req.oidc.isAuthenticated(),
          pageTitle: "Trips",
          error: error.message,
        });
        return;
      }
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError }).render("tripError", {
        authenticated: req.oidc.isAuthenticated(),
        pageTitle: "Trips",
      });
    }
  }
  async getAllTrips(req: Request, res: Response): Promise<void> {
    try {
      const trips = await this.tripService.getAllTrips();
      const data = {
        pageTitle: "Trips",
        trips: trips,
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

  async deleteTripByUuid(req: Request, res: Response) {
    const uuid = req.params.uuid;
    try {
      await this.tripService.deleteTripByUuid(uuid);
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
    data.uuid = req.body.params || " ";
    let imagesPath: string[] = [];
    if (req.files && req.files.pictures) {
      const images = Array.isArray(req.files.pictures)
        ? req.files.pictures
        : [req.files.pictures];
      console.log(images);

      for (const image of images) {
        imagesPath.push(image.tempFilePath);
      }
      console.log(imagesPath);
    }
    try {
      await this.tripService.updateTripByUuid(data, imagesPath);
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
      const trip = await this.tripService.getTripByUuid(req.params.uuid);
      if (trip) {
        const data = {
          trip: trip,
          authenticated: req.oidc.isAuthenticated(),
          users: [],
        };
        console.log(trip);

        res.render("trip", data);
        return;
      }
    } catch (error) {
      res.status(404).send(`Error: ${error}`);
    }
  }
}
