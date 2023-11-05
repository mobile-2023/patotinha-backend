import { prisma } from "../prisma/prisma.js";
import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import "dotenv/config";

import routes from "./routes/index.js";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", routes.user);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(port || 3333, () => {
  console.log(`Servidor iniciado na porta: 3333`);
});
