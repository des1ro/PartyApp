import { prisma } from "../../../utils/prismaClient";
import { GroupError } from "../error/group.exceptions";
import { Group } from "../group.type";

export class GroupService {
  static async addGroupToDb(Group: Group) {
    const checkIfExits = await this.findGroup(Group.title);
    if (!checkIfExits) {
      await prisma.group.create({ data: Group });
      return;
    }
    throw new GroupError({
      name: "GROUP_NOT_FOUND",
      message: "Group is already in database",
    });
  }
  static async deleteGroupFromDb(GroupName: string) {
    const GroupToDelete = await this.findGroup(GroupName);

    if (GroupToDelete) {
      await prisma.group.delete({
        where: {
          title: GroupName,
        },
      });
      return;
    }
    throw new GroupError({
      name: "GROUP_NOT_FOUND",
      message: "Group isn't in database",
    });
  }
  static async findGroup(GroupName: string) {
    return await prisma.group.findUnique({
      where: { title: GroupName },
    });
  }
}
