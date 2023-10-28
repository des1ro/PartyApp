import { prisma } from "../../../prisma/prismaClient";
import { UserError } from "../error/user.exceptions";
import { UserDTO } from "../user.type";
import { hashPassword } from "./userPasswordHasher";

export class UserService {
  async createUser(newUser: UserDTO) {
    const isInDatabaseEmail = await this.ifUserExistByEmail(newUser.email);
    const isInDatabasePhoneNumber = await this.ifUserExistByEmail(newUser.email);
    if (isInDatabaseEmail || isInDatabasePhoneNumber) {
      throw new UserError({
        name: "CREATE_USER_ERROR",
        message: "Email or phone number already taken",
      });
    }
    newUser.password = await hashPassword(newUser.password);
    await prisma.user.create({ data: newUser });
  }
  async updateUserByEmail(email: string, data: UserDTO) {
    const itAlreadyExist = await this.getUserByEmail(email);
    if (itAlreadyExist === null) {
      throw new UserError({ name: "UPDATE_USER_ERROR", message: "User don't exist" });
    }
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (user === null) {
      throw new UserError({
        name: "USER_NOT_FOUND",
        message: "User with this email don't exist",
      });
    }
    return user;
  }
  async ifUserExistByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    return user ? true : false;
  }
  async ifUserExistByPhoneNumber(phoneNumber: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });

    return user ? true : false;
  }
  async deleteUserByEmail(email: string) {
    const exist = await this.ifUserExistByEmail(email);
    if (exist) {
      await prisma.user.delete({
        where: {
          email: email,
        },
      });
    }
  }
  async getAllUsers() {
    return await prisma.user.findMany();
  }
}
