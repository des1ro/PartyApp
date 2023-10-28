import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./global.routing";
import { auth } from "express-openid-connect";
import path from "path";
import { config, profile } from "./middlewares/auth";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(auth(config));
app.use(express.json()); // To handle req.body
app.use("/api", routes);
app.use(express.static(path.join(process.cwd(), "public")));
// Ustawienie EJS jako widok silnika
app.set("view engine", "ejs");
// Middleware do serwowania plików statycznych (CSS, JS, itp.)
app.use(express.urlencoded({ extended: true }));
// Czytanie formularzy post z ejs
app.set("views", path.join(process.cwd(), "views"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get("/profile", profile);

app.get("/", (req: Request, res: Response) => {
  const data = {
    pageTitle: "TripApp",
    authenticated: req.oidc.isAuthenticated(),
  };

  res.render("strona", data);
});
