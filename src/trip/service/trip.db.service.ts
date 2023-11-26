import { prisma } from "../../../prisma/prismaClient";
import { TripError } from "../error/trip.exceptions";
import { TripDTO } from "../tripDTO";
import { uploadPhotoArray } from "../../utils/cloudinary";

export class TripService {
  constructor(private readonly database = prisma) {}
  async createTrip(trip: TripDTO, imagesPath: string[]) {
    const checkIfExits = await this.getAuthorTripByTitle(trip);
    if (checkIfExits === null) {
      trip.pictures = await uploadPhotoArray(imagesPath);
      await this.database.trip.create({ data: trip });
      return;
    }
    throw new TripError({
      name: "INVALID_TRIP",
      message: "Trip is already in database, check in actual or try change title :)",
    });
  }
  async getUserTripsAll(userId: string) {
    const userTrips = await prisma.trip.findMany({
      where: {
        OR: [{ authorTripId: userId }, { UserToTrip: { some: { userId } } }],
      },
    });
    return userTrips;
  }
  async getUserTripsAcual(userId: string) {
    const userTrips = await prisma.trip.findMany({
      where: {
        OR: [{ authorTripId: userId }, { UserToTrip: { some: { userId } } }],
        AND: [{ isInProgress: true }],
      },
    });
    return userTrips;
  }
  async getUserTripsPropositions(userId: string) {
    const userTrips = await prisma.trip.findMany({
      where: {
        OR: [{ authorTripId: userId }, { UserToTrip: { some: { userId } } }],
        AND: [{ published: true }],
      },
    });
    return userTrips;
  }
  async updateTripByUuid(trip: TripDTO, imagesPath: string[]) {
    if (!trip.uuid) {
      throw new TripError({ name: "UPDATE_TRIP_ERROR", message: "No trip id provided" });
    }
    const itAlreadyExist = await this.getTripByUuid(trip.uuid);
    if (itAlreadyExist === null) {
      throw new TripError({ name: "UPDATE_TRIP_ERROR", message: "Trip don't exist" });
    }
    trip.pictures = await uploadPhotoArray(imagesPath);
    await this.database.trip.create({ data: trip });

    await this.database.trip.update({
      where: {
        uuid: trip.uuid,
      },
      data: {
        title: trip.title,
        place: trip.place,
        category: trip.category,
        views: trip.views,
        published: trip.published,
        attractions: trip.attractions,
        pictures: trip.pictures,
      },
    });
  }
  async getAllTrips() {
    return await this.database.trip.findMany();
  }
  async getPublishedTrips() {}
  async getAcualTrips(uuid: string) {
    this.database.trip.findMany({ where: {} });
  }
  async deleteTripByUuid(uuid: string) {
    const TripToDelete = await this.getTripByUuid(uuid);

    if (TripToDelete) {
      await this.database.trip.delete({
        where: {
          uuid: uuid,
        },
      });
      return;
    }
    throw new TripError({
      name: "TRIP_NOT_FOUND",
      message: "Trip isn't in database",
    });
  }
  async getTripByUuid(uuid: string) {
    const trip = await this.database.trip.findUnique({
      where: { uuid: uuid },
    });
    return trip;
  }
  async getAuthorTripByTitle(trip: TripDTO) {
    const tripToReturn = await this.database.trip.findUnique({
      where: { title: trip.title },
    });
    return tripToReturn;
  }
}
