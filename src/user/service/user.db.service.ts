import { prisma } from "../../../prisma/prismaClient";
import { UserError } from "../error/user.exceptions";
import { UserDTO } from "../user.type";

export class UserService {
  async createUser(newUser: UserDTO) {
    const user = await this.isUserExist(newUser);
    if (!user) {
      throw new UserError({
        name: "CREATE_USER_ERROR",
        message: "Email or phone number already taken",
      });
    }
    await prisma.user.create({ data: newUser });
  }
  async updateUser(data: UserDTO) {
    const uuid = data.uuid;
    const isExist = await this.findUserBySub(uuid);
    if (!isExist) {
      throw new UserError({ name: "UPDATE_USER_ERROR", message: "User don't exist" });
    }

    await prisma.user.update({
      where: {
        uuid: uuid,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        phoneNumber: data.phoneNumber,
        picture: data.picture,
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
  async isUserExist(userToFind: UserDTO): Promise<boolean> {
    const user = await prisma.user.findMany({
      where: {
        OR: [{ email: userToFind.email }, { phoneNumber: userToFind.phoneNumber }],
      },
    });

    return user ? true : false;
  }
  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async findUserBySub(sub: string) {
    const user = await prisma.user.findUnique({ where: { uuid: sub } });
    if (user?.dateOfBirth) {
      user.dateOfBirth = user.dateOfBirth;
    }
    return user;
  }
}
