import { RequestStatus } from "./statusFirendRequest.enum";

const friendRequestsDataExample = [
  {
    userId: "uuid-of-user-1", // UUID of the user sending the request
    friendId: "uuid-of-user-2", // UUID of the user receiving the request
    status: "pending",
    actionUserId: "uuid-of-user-1",
  },
  {
    userId: "uuid-of-user-1",
    friendId: "uuid-of-user-3",
    status: "pending",
    actionUserId: "uuid-of-user-1",
  },
  // ... more friend requests
];
export type FriendRequestData = {
  userId: string;
  friendId: string;
  status: RequestStatus;
  actionUserId: string;
};
