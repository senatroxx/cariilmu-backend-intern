import express from "express";

import CourseCategoryRouter from "./course-category";
import { CourseController } from "../../../controllers";
import { resultValidator, CourseValidator } from "../../../validator";

const route = express.Router();

const router = () => {
  route.use("/categories", CourseCategoryRouter());
  route.get("/", CourseController.getAll);
  route.post(
    "/",
    CourseValidator.create,
    resultValidator,
    CourseController.create
  );
  route.get("/:id/participant", CourseController.getParticipant);
  route.get("/:id", CourseController.detail);
  route.put(
    "/:id",
    CourseValidator.update,
    resultValidator,
    CourseController.update
  );
  route.delete("/:id", CourseController.delete);

  return route;
};

export default router;
