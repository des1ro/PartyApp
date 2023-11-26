export type UserDTO = {
  uuid: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date | null;
  email: string;
  phoneNumber: string;

  picture?: string | null;
};
