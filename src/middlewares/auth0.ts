import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { UserService } from "../user/service/user.db.service";
dotenv.config();

export const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: `http://localhost:${process.env.PORT}`,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

export function authorization(req: Request, res: Response, next: NextFunction) {
  const validate = req.oidc.isAuthenticated();
  if (validate) {
    next();
    return;
  }
  const data = {
    pageTitle: "Not logged",
    authenticated: req.oidc.isAuthenticated(),
  };
  res.status(401).render("authError", data);
}

export async function authForUser(req: Request, res: Response, next: NextFunction) {
  const sub = req.oidc.user!.sub;
  const service = new UserService();

  const user = await service.findUserBySub(sub);
  if (user !== null) {
    next();
    return;
  }
  const userData = {
    firstName: req.oidc.user!.given_name,
    lastName: req.oidc.user!.family_name,
    email: req.oidc.user!.email,
  };
  const data = {
    pageTitle: "Complete registration",
    authenticated: req.oidc.isAuthenticated(),
    user: userData,
  };
  console.log("ELOOO");

  res.status(401).render("registration-form", data);
}
// middleware/authMiddleware.ts

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Dodaj dane autentykacji do obiektu `res.locals`, aby były dostępne w szablonach EJS lub innych częściach aplikacji
  res.locals.authData = {
    authenticated: req.oidc.isAuthenticated(),
    uuid: req.oidc.user ? req.oidc.user.sub : null,
  };

  // Przejdź do następnego kroku w przetwarzaniu żądania
  next();
};

export default authMiddleware;
