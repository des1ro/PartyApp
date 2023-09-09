type ErrorName =
  | "PERMISION_DENIED"
  | "INVALID_USER"
  | "CREATE_USER_ERROR"
  | "VALIDATION_USER_ERROR"
  | "UPDATE_USER_ERROR"
  | "USER_NOT_FOUND";
export class UserError extends Error {
  name: string;
  message: string;
  constructor({ name, message }: { name: ErrorName; message: string }) {
    super(name);
    this.name = name;
    this.message = message;
  }
}
