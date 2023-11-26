import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./global.routing";
import { auth } from "express-openid-connect";
import path from "path";
import authMiddleware, { authConfig } from "./middlewares/auth0";
import fileUpload from "express-fileupload";
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
//Auth0
app.use(auth(authConfig));
app.use(authMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 },
  }),
);
app.use("/api", routes);
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
