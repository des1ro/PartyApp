import { Router, Request, Response } from "express";
import { UserValidator } from "../middlewares/validateUserInput";
import { UserController } from "./controler/user.controler";
import { UserService } from "./service/user.db.service";

const routes = Router();
routes.get("/user/:id?", UserService.getUserByEmail);
routes.get("/users", UserController.getAllUsers);
routes.post("/user", UserValidator.createUser, UserController.createUser);
routes.put("/:id", UserValidator.updateUser, UserController.updateUserByEmail);

export default routes;
