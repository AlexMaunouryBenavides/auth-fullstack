import "reflect-metadata";
import { AppDataSource } from "./datasource/data-source.js";
import cors from "cors";

import express from "express";
import router from "./routes.ts";

AppDataSource.initialize()
   .then(async () => {
      console.log("Database connected");

      const app = express();
      app.use(cors({ origin: "http://localhost:5173", credentials: true }));
      app.use(express.json());

      app.use("/api", router);

      app.listen(3000, () => {
         console.log("Server running on http://localhost:3000");
      });
   })
   .catch((error) => console.error("Problem init db:", error));
