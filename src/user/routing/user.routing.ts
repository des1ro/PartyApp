import { Request, Response, Router } from "express";
import { UserController } from "../controler/user.controller";
const userController = new UserController();
const routes = Router();

routes.get("/my-profile/", async (req: Request, res: Response) => {
  userController.getUser(req, res);
});
routes.post("/user", async (req: Request, res: Response) => {
  console.log("EKI");

  userController.createUser(req, res);
});
routes.post("/user/update", async (req: Request, res: Response) => {
  userController.updateUser(req, res);
});
export default routes;
