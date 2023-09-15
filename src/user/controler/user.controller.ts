import { Request, Response } from "express";
import { UserService } from "../service/user.db.service";
import { UserError } from "../error/user.exceptions";
import { DataBaseError } from "../../database/error/database.exceptions";
export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }
  static async createUser(req: Request, res: Response) {
    try {
      await UserService.createUser(req.body);
      res.status(201).send("User created");
    } catch (error) {
      if (error instanceof UserError) {
        res.status(409).json({ name: error.name, message: error.message });
        return;
      }
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError });
    }
  }
  static async deleteUserByEmail(req: Request, res: Response) {
    const email = req.params.email;
    try {
      await UserService.deleteUserByEmail(email);
    } catch (error) {
      if (error instanceof UserError) {
        res.status(409).json({ name: error.name, message: error.message });
        return;
      }
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError });
    }
  }
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error:", error });
    }
  }
  static async updateUserByEmail(req: Request, res: Response) {
    const data = req.body;
    const email = req.body.email;
    try {
      await UserService.updateUserByEmail(email, data);
    } catch (error) {
      if (error instanceof UserError) {
        res.status(409).json({ name: error.name, message: error.message });
        return;
      }
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError });
    }
  }
  static async getUserByEmail(req: Request, res: Response) {
    try {
      const user = await UserService.getUserByEmail(req.body.email);
      res.status(200).send({ user });
    } catch (error) {
      res.status(404).send(`Error: ${error}`);
    }
  }
}
