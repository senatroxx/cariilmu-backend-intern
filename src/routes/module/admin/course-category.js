import express from "express";

import { CourseCategoryController } from "../../../controllers";
import { resultValidator, CourseCategoryValidator } from "../../../validator";

const route = express.Router();

const router = () => {
  route.get("/", CourseCategoryController.getAll);
  route.post(
    "/",
    CourseCategoryValidator.create,
    resultValidator,
    CourseCategoryController.create
  );
  route.get("/:id", CourseCategoryController.detail);
  route.put(
    "/:id",
    CourseCategoryValidator.update,
    resultValidator,
    CourseCategoryController.update
  );
  route.delete("/:id", CourseCategoryController.delete);

  return route;
};

export default router;
