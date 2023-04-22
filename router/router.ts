import express, { Router } from "express";
import {
  createUser,
  viewUsers,
  viewUser,
  verifyUser,
  signinUser,
  refreshUserToken,
} from "../controller/userController";
import { authMid } from "../utils/authWare";

const router: Router = express.Router();

router.route("/create").post(createUser);
router.route("/signin").post(signinUser);
router.route("/refresh").post(refreshUserToken);

router.route("/").get(authMid, viewUsers);

router.route("/:id").get(viewUser);
router.route("/:id").patch(verifyUser);

export default router;
