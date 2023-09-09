import { prisma } from "../../../utils/prisma/prismaClient";
import { TripError } from "../error/trip.exceptions";
import { Trip } from "../tripDTO";

export class TripService {
  static async addTripToDb(Trip: Trip) {
    const checkIfExits = await this.findTrip(Trip.title);
    if (!checkIfExits) {
      await prisma.trip.create({ data: Trip });
      return;
    }
    throw new TripError({
      name: "TRIP_NOT_FOUND",
      message: "Trip is already in database",
    });
  }
  static async deleteTripFromDb(tripName: string) {
    const TripToDelete = await this.findTrip(tripName);

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
  static async findTrip(tripName: string) {
    return await prisma.trip.findUnique({
      where: { title: tripName },
    });
  }
}
