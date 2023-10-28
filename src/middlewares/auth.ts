import { NextFunction, Request, Response } from "express";
import { requiresAuth } from "express-openid-connect";
import dotenv from "dotenv";
dotenv.config();

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: `http://localhost:${process.env.PORT}`,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

export function login(req: Request, res: Response) {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}

export function profile(req: Request, res: Response) {
  requiresAuth();
  res.send(JSON.stringify(req.oidc.user));
}
export function authorization(req: Request, res: Response, next: NextFunction) {
  const validate = req.oidc.isAuthenticated();
  if (validate) {
    next();
    return;
  }
  const data = {
    pageTitle: "Not logged",
    message: "Witaj na mojej stronie!",
    authenticated: req.oidc.isAuthenticated(),
  };
  res.render("authError", data);
}
