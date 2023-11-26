import { Request, Response } from "express";
import { FriendshipService } from "../friendsService/friendship.service";
import { UserDTO } from "../../user/user.type";

export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  async sendFriendRequest(req: Request, res: Response): Promise<void> {
    const actionUserId: string = req.body.params;
    const friendId: string = req.body.friendId;

    try {
      await this.friendshipService.sendFriendRequest(actionUserId, friendId);
      res.json({ success: true, message: "Friend request sent successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  async deleteFriendFromFriendship(req: Request, res: Response): Promise<void> {
    const actionUserId: string = req.body.params;
    const friendId: string = req.body.friendId;
    try {
      await this.friendshipService.deleteFriendFromFrienship(actionUserId, friendId);
      res.json({ success: true, message: "Friend deleted successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  async getUserFriends(req: Request, res: Response): Promise<void> {
    const actionUserId: string = req.params.uuid;
    console.log(actionUserId, 5);

    try {
      const firends: UserDTO[] = await this.friendshipService.getUserFriends(
        actionUserId,
      );
      const recivedRequests: UserDTO[] = await this.friendshipService.receivedRequests(
        actionUserId,
      );
      const sentRequests: UserDTO[] = await this.friendshipService.sentRequests(
        actionUserId,
      );
      const data = {
        friendsData: firends,
        sentRequestsFriends: sentRequests,
        recivedRequestsFriends: recivedRequests,
      };

      res.status(200).render("friends", data);
    } catch (error) {
      console.log(error);

      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
}
