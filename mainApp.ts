import express, { Application } from "express";
import cors from "cors";
import user from "./router/router";
import product from "./router/product";

export const mainApp = (app: Application) => {
  app
    .use(cors({ origin: "*" }))

    .use(express.json())
    .use("/api/user", user)
    .use("/api/product", product);
};
