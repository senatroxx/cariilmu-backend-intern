import { validationResult } from "express-validator";
import { ErrorHandler } from "../config/http";
import AuthValidator from "./module/auth.validator";
import CourseCategoryValidator from "./module/course-category.validator";
import CourseValidator from "./module/course.validator";
import UserValidator from "./module/user.validator";
import UserCourseValidator from "./module/user-course.validator";

function resultValidator(req, res, next) {
  const validated = validationResult(req);
  if (!validated.isEmpty())
    return next(new ErrorHandler("Validation Error", 422, validated.errors));

  return next();
}

export {
  resultValidator,
  AuthValidator,
  CourseCategoryValidator,
  CourseValidator,
  UserValidator,
  UserCourseValidator,
};
