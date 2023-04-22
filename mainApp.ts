import express, { Application } from "express";
import cors from "cors";
import user from "./router/router";

export const mainApp = (app: Application) => {
  app
    .use(cors({ origin: "*" }))

    .use(express.json())
    .use("/api/user", user);
};
