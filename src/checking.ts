import { prisma } from "../prisma/prismaClient";

const userTrips = async (userId: string) => {
  const userTrips = await prisma.trip.findMany({
    where: {
      OR: [{ authorTripId: userId }, { UserToTrip: { some: { userId } } }],
    },
  });
  console.log(userTrips.length);
};
userTrips(`google-oauth2|107131605981197161442`);
