import { prisma } from "../../../prisma/prismaClient";
import { UserDTO } from "../../user/user.type";
import { FriendRequestData } from "../models/firendsRequestData.type";
import { RequestStatus } from "../models/statusFirendRequest.enum";
export class FriendshipService {
  async sendFriendRequest(actionUserId: string, friendId: string) {
    await prisma.friendship.create({
      data: {
        status: RequestStatus.pending,
        userId: actionUserId, // ID of the user sending the request
        friendId: friendId, // ID of the user receiving the request
      },
    });
  }
  async deleteFriendFromFrienship(actionUserId: string, friendId: string) {
    await prisma.friendship.delete({
      where: {
        userId_friendId: {
          userId: actionUserId,
          friendId: friendId,
        },
      },
    });
  }

  async acceptFriendRequest(friendshipId: number) {
    await prisma.friendship.update({
      where: {
        // You need to provide the unique identifier for the friendship record here
        id: friendshipId, // This should be the ID of the friendship record
      },
      data: {
        status: RequestStatus.accepted,
      },
    });
  }
  async checkFriendshipStatus(actionUserId: string, friendId: string) {
    const users = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            userId: actionUserId, // ID of the first user
            friendId: friendId, // ID of the second user
          },
          {
            userId: friendId, // ID of the second user
            friendId: actionUserId, // ID of the first user
          },
        ],
      },
    });
    return users;
  }

  // Fetch friend requests sent by a user with a specific UUID
  async sentRequests(actionUserId: string) {
    const users = await prisma.friendship.findMany({
      where: {
        friendId: actionUserId, // Replace `userUuid` with the actual UUID of the user
        // Assuming 'PENDING' is a possible status for a friend request
      },
      include: {
        friend: {
          select: {
            firstName: true,
            lastName: true,
            uuid: true,
            picture: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });
    if (users) {
      const friends = users.map((friend) => friend.friend);
      return friends;
    }
    return [];
  }
  // Fetch friend requests received by a user with a specific UUID
  async receivedRequests(actionUserId: string) {
    const users = await prisma.friendship.findMany({
      where: {
        userId: actionUserId, // Replace `actionUserUuid` with the actual UUID of the user
        // Optionally, you can filter by status if your model has a status field
        // status: 'PENDING', // Uncomment and use the actual status if applicable
        status: RequestStatus.pending,
      },
      include: {
        friend: {
          select: {
            firstName: true,
            lastName: true,
            uuid: true,
            picture: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });
    if (users) {
      const friends = users.map((friend) => friend.friend);
      return friends;
    }
    return [];
  }
  async sendMultipleFriendRequests(friendRequestsData: FriendRequestData) {
    await prisma.friendship.createMany({
      data: friendRequestsData,
    });
  }
  async getUserFriends(userId: string): Promise<UserDTO[]> {
    const userFriends = await prisma.user.findUnique({
      where: {
        uuid: userId,
      },
      include: {
        friends: {
          select: {
            friend: {
              select: {
                firstName: true,
                lastName: true,
                dateOfBirth: true,
                uuid: true,
                picture: true,
                email: true,
                phoneNumber: true,
              },
            },
          },
        },
        friendOf: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                dateOfBirth: true,
                uuid: true,
                picture: true,
                email: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });

    // Combine friends and friendOf arrays to get all friends
    if (userFriends) {
      const allFriends = [
        ...userFriends.friends.map((friendship) => friendship.friend),
        ...userFriends.friendOf.map((friendship) => friendship.user),
      ];
      return allFriends;
    }
    return [];
  }
}
