import { Router } from "express";
import { UserValidator } from "../../middlewares/validateUserInput";
import { UserController } from "../controler/user.controller";
const userController = new UserController();
const validator = new UserValidator();
const routes = Router();
routes.get("/user/:id?", userController.getUserByEmail);
routes.get("/users", userController.getAllUsers);
routes.post("/user", validator.createUser, userController.createUser);
routes.put("/:id", validator.updateUser, userController.updateUserByEmail);
routes.delete("/user/:email?", userController.deleteUserByEmail);
export default routes;
