import express from "express";

import authRouter from "./auth";
import courseRouter from "./course";
import userRouter from "./user";
import { auth } from "../../../middleware";

const route = express.Router();

const router = () => {
  route.use("/auth", authRouter());
  route.use(auth);
  route.use("/courses", courseRouter());
  route.use("/users", userRouter());

  return route;
};

export default router;
