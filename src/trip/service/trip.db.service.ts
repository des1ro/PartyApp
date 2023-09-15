import { prisma } from "../../../prisma/prismaClient";
import { TripError } from "../error/trip.exceptions";
import { Trip } from "../tripDTO";

export class TripService {
  static async addTripToDb(Trip: Trip) {
    const checkIfExits = await this.getTripByTitle(Trip.title);
    if (!checkIfExits) {
      await prisma.trip.create({ data: Trip });
      return;
    }
    throw new TripError({
      name: "TRIP_NOT_FOUND",
      message: "Trip is already in database",
    });
  }
  static async updateTripByTitle(title: string, data: Trip) {
    const itAlreadyExist = await this.getTripByTitle(title);
    if (itAlreadyExist === null) {
      throw new TripError({ name: "UPDATE_TRIP_ERROR", message: "Trip don't exist" });
    }
    await prisma.trip.update({
      where: {
        title: title,
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
  static async getAllTrips() {
    return await prisma.trip.findMany();
  }
  static async deleteTripFromDb(tripName: string) {
    const TripToDelete = await this.getTripByTitle(tripName);

    if (TripToDelete) {
      await prisma.trip.delete({
        where: {
          title: tripName,
        },
      });
      return;
    }
    throw new TripError({
      name: "TRIP_NOT_FOUND",
      message: "Trip isn't in database",
    });
  }
  static async getTripByTitle(tripName: string) {
    return await prisma.trip.findUnique({
      where: { title: tripName },
    });
  }
}
