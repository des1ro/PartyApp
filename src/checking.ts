import { TripService } from "./trip/service/trip.db.service";

class TripController {
  constructor(private readonly tripService = new TripService()) {}

  async getAllTrips() {
    try {
      const trips = await this.tripService.getAllTrips();
      const data = {
        pageTitle: "Trips",
        message: "Witaj na mojej stronie!",
        trips: trips,
      };
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
const service = new TripController();
const users = async () => {
  const user = await service.getAllTrips();
};

users();
