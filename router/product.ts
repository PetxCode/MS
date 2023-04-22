import express, { Router } from "express";
import { authMid } from "../utils/authWare";
import { createProduct, getProduct } from "../controller/productController";

const router: Router = express.Router();

router.route("/create").post(authMid, createProduct);
router.route("/").get(authMid, getProduct);

export default router;
