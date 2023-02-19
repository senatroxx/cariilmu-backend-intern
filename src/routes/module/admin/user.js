import express from "express";

import { UserController } from "../../../controllers";
import { resultValidator, UserValidator } from "../../../validator";
import userCourseRouter from "./user-course";

const route = express.Router();

const router = () => {
  route.get("/", UserController.getAll);
  route.post("/", UserValidator.create, resultValidator, UserController.create);
  route.get("/:id", UserController.detail);
  route.use("/:id/courses", userCourseRouter());
  route.put(
    "/:id/password",
    UserValidator.updatePassword,
    resultValidator,
    UserController.updatePassword
  );
  route.put(
    "/:id",
    UserValidator.update,
    resultValidator,
    UserController.update
  );
  route.delete("/:id", UserController.delete);

  return route;
};

export default router;
