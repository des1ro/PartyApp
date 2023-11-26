import { Request, Response } from "express";
import { DataBaseError } from "../../database/error/database.exceptions";
import { uploadPhoto } from "../../utils/cloudinary";
import { UserError } from "../error/user.exceptions";
import { UserService } from "../service/user.db.service";
import { UserDTO } from "../user.type";
import fileUpload from "express-fileupload";
export class UserController {
  constructor(private readonly userService = new UserService()) {}

  async getUser(req: Request, res: Response) {
    const id = req.oidc.user!.sub;

    let user = {
      uuid: "1",
      firstName: "name",
      lastName: "last name",
      email: "email@example.com",
    };
    const data = {
      pageTitle: "Trips",
      authenticated: req.oidc.isAuthenticated(),
      propos: req.params.propos,
      user: user,
    };
    const foundUser = await this.userService.findUserBySub(id);
    if (foundUser === null) {
      res.status(404).render("registration-form", data);
      return;
    }
    data.user = foundUser;
    res.status(202).render("user", data);
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error:", error });
    }
  }
  async updateUser(req: Request, res: Response) {
    const id = req.oidc.user!.sub;
    const userToUpdate: UserDTO = {
      uuid: req.oidc.user!.sub,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      email: req.oidc.user!.email,
    };

    try {
      if (req.body.dateOfBirth) {
        userToUpdate.dateOfBirth = new Date(req.body.dateOfBirth);
      }
      console.log(userToUpdate);

      if (req.files) {
        const image = req.files.image as fileUpload.UploadedFile;
        const picture = await uploadPhoto(image.tempFilePath);
        userToUpdate.picture = picture;
      }
      await this.userService.updateUser(userToUpdate);
      const user = await this.userService.findUserBySub(id);
      const data = {
        authenticated: req.oidc.isAuthenticated(),
        propos: req.params.propos,
        user: user,
      };
      if (user) {
        res.status(202).render("user", data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getUserByEmail(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserByEmail(req.body.email);
      res.status(200).send({ user });
    } catch (error) {
      res.status(404).send(`Error: ${error}`);
    }
  }
  async createUser(req: Request, res: Response) {
    const userToCreate: UserDTO = {
      uuid: req.oidc.user!.sub,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      picture: req.oidc.user!.picture || "",
    };
    try {
      if (req.files) {
        const image = req.files.image as fileUpload.UploadedFile;
        const picture = await uploadPhoto(image.tempFilePath);
        userToCreate.picture = picture;
      } else if (req.oidc.user!.picutre) {
        const image = req.oidc.user!.picutre as fileUpload.UploadedFile;
        const picture = await uploadPhoto(image.tempFilePath);
        userToCreate.picture = picture;
      }
      await this.userService.createUser(userToCreate);
    } catch (error) {
      if (error instanceof UserError) {
        res.status(409).render("tripError", {
          authenticated: req.oidc.isAuthenticated(),
          error: error.message,
        });
        return;
      }
      const typedError = error as DataBaseError;
      res.status(500).json({ message: typedError });
      return;
    }
    const data = {
      authenticated: req.oidc.isAuthenticated(),
      propos: req.params.propos,
    };
    console.log(userToCreate);
    res.status(201).render("index", data);
    return;
  }
}
