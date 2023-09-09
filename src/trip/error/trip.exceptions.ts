type ErrorName =
  | "PERMISION_DENIED"
  | "INVALID_TRIP"
  | "CREATE_TRIP_ERROR"
  | "VALIDATION_TRIP_ERROR"
  | "UPDATE_TRIP_ERROR"
  | "TRIP_NOT_FOUND";
export class TripError extends Error {
  name: string;
  message: string;
  constructor({ name, message }: { name: ErrorName; message: string }) {
    super(name);
    this.name = name;
    this.message = message;
  }
}
