import Joi from "joi";
import { Request, Response, NextFunction } from "express";
export class UserValidator {
  static async validate(
    req: Request,
    res: Response,
    next: NextFunction,
    schema: Joi.ObjectSchema,
  ) {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        return res.status(400).json({ name: "VALIDATION_ERROR", error: error.message });
      } else {
        return res
          .status(400)
          .json({ error: "An unknown error occurred in user validation" });
      }
    }
  }
  static async createUser(req: Request, res: Response, next: NextFunction) {
    const schema = validateSchema.create;
    await UserValidator.validate(req, res, next, schema);
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const schema = validateSchema.update;
    await UserValidator.validate(req, res, next, schema);
  }
}
const commonFields = {
  name: Joi.string().alphanum().min(2).max(30),
  dateOfBirth: Joi.number().integer().min(1900).max(2023),
  phoneNumber: Joi.string()
    .length(9)
    .pattern(/^[0-9]+$/),
  email: Joi.array().items(Joi.string().email().max(256).required()).single(),
  password: Joi.string().min(8).max(40),
};

const validateSchema = {
  update: Joi.object(commonFields),
  create: Joi.object({
    ...commonFields,
    name: commonFields.name.required(),
    dateOfBirth: commonFields.dateOfBirth.required(),
    password: commonFields.password.required(),
  }),
};
