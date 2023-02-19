import express from "express";

import adminRouter from "./module/admin";

const route = express.Router();

export default function router() {
  route.use("/admin", adminRouter());

  return route;
}
