import express from "express";

import authRouter from "./module/auth";

const route = express.Router();

export default function router() {
  route.use("/auth", authRouter());

  return route;
}
