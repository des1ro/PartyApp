import { Response, Request, Router } from "express";
import { FriendshipController } from "../controller/firendShip.controller";
import { FriendshipService } from "../friendsService/friendship.service";
const routes = Router();
const friendshipController = new FriendshipController(new FriendshipService());
routes.get("/friends/:uuid?", async (req: Request, res: Response) => {
  await friendshipController.getUserFriends(req, res);
});

export default routes;
