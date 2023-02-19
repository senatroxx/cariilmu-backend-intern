import { check, validationResult } from "express-validator";
import { UserModel, CourseModel } from "../../models";
import { ErrorHandler } from "../../config/http";

const requestCourseValidator = (req) => validationResult(req);

const existCourse = async (val) => {
  const data = await CourseModel.findAll({
    where: { id: val },
  });

  if (data.length !== val.length)
    throw new ErrorHandler("Course Not Found", 404);
  return true;
};

const courses = check("course_id")
  .notEmpty()
  .withMessage("course_id is required")
  .isArray()
  .withMessage("course_id must be an array")
  .custom(existCourse);

const create = [courses];

export default { requestCourseValidator, create };
