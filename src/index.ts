import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./global.routing";
import { auth } from "express-openid-connect";
import { requiresAuth } from "express-openid-connect";
import { config, profile } from "../utils/auth";
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(auth(config));
app.use(express.json()); // To handle req.body
app.use("/api", routes);
app.get("/profile", profile);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
