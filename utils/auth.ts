import { Request, Response } from "express";
import { requiresAuth } from "express-openid-connect";

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:8080/",
  clientID: "RiXXmYmW3vgPWEx6hPxweYXcqXlm8qOd",
  issuerBaseURL: "https://jasiopartyapp.eu.auth0.com",
};

export function login(req: Request, res: Response) {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}

export function profile(req: Request, res: Response) {
  requiresAuth();
  res.send(JSON.stringify(req.oidc.user));
}
