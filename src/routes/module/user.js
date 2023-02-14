import express from "express";

import { UserController } from "../../controllers";
import { resultValidator, UserValidator } from "../../validator";

const route = express.Router();

export default function userRouter() {
  route.get("/", UserController.getAll);
  route.post(
    "/",
    UserValidator.createData,
    resultValidator,
    UserController.create
  );
  route.get("/:id", UserController.detail);
  route.put(
    "/:id",
    UserValidator.updateData,
    resultValidator,
    UserController.update
  );
  route.delete("/:id", UserController.delete);

  return route;
}
