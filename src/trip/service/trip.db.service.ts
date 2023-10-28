import { prisma } from "../../../prisma/prismaClient";
import { TripError } from "../error/trip.exceptions";
import { Trip } from "../tripDTO";

export class TripService {
  constructor(private readonly database = prisma) {}
  async createTrip(Trip: Trip) {
    const checkIfExits = await this.getTripByUuid(Trip.uuid);
    if (!checkIfExits) {
      await this.database.trip.create({ data: Trip });
      return;
    }
    throw new TripError({
      name: "TRIP_NOT_FOUND",
      message: "Trip is already in database",
    });
  }
  async updateTripByUuid(uuid: string, data: Trip) {
    const itAlreadyExist = await this.getTripByUuid(uuid);
    if (itAlreadyExist === null) {
      throw new TripError({ name: "UPDATE_TRIP_ERROR", message: "Trip don't exist" });
    }
    await this.database.trip.update({
      where: {
        uuid: uuid,
      },
      data: {
        title: data.title,
        Place: data.Place,
        likes: data.likes,
        category: data.category,
        views: data.views,
        published: data.published,
        attractions: data.attractions,
        pictures: data.pictures,
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
}
