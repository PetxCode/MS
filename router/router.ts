import express, { Router } from "express";
import {
  createUser,
  viewUsers,
  viewUser,
  verifyUser,
} from "../controller/userController";

const router: Router = express.Router();

router.route("/create").post(createUser);
router.route("/").get(viewUsers);
router.route("/:id").get(viewUser);
router.route("/:id").patch(verifyUser);

export default router;
