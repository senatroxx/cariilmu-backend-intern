import express from "express";

import { UserCourseController } from "../../../controllers";
import { resultValidator, UserCourseValidator } from "../../../validator";

const route = express.Router({
  mergeParams: true,
});

const router = () => {
  route.post(
    "/",
    UserCourseValidator.create,
    resultValidator,
    UserCourseController.create
  );
  route.delete("/:course_id", UserCourseController.delete);

  return route;
};

export default router;
