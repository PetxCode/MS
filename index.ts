import express, { Application } from "express";
import { database } from "./utils/database";
import { mainApp } from "./mainApp";

const app: Application = express();
mainApp(app);

database
  .initialize()
  .then(() => {
    const server = app.listen(3355, () => {
      console.log("");
      console.log("create services activated: 3355");
    });

    console.log("database connected");

    process.on("uncaughtException", (err: Error) => {
      console.log("Shutting down server: uncaughtException");
      console.log(err);

      process.exit(1);
    });

    process.on("unhandledRejection", (reason: any) => {
      console.log("Shutting down server: unhandledRejection");
      console.log(reason);

      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
