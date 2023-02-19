import { check, validationResult } from "express-validator";
import { CourseCategoryModel } from "../../models";
import { ErrorHandler } from "../../config/http";

const requestCourseValidator = (req) => validationResult(req);

const existCourseCategoryId = async (val) => {
  const data = await CourseCategoryModel.findOne({
    where: { id: val },
    raw: true,
  });

  if (!data) throw new ErrorHandler("Course Category not found", 422);

  return true;
};

const title = check("title")
  .notEmpty()
  .withMessage("title is required")
  .isLength({ min: 3 })
  .withMessage("title must be at least 3 characters long");

const course_category_id = check("course_category_id")
  .notEmpty()
  .withMessage("course_category_id is required")
  .isInt()
  .withMessage("course_category_id must be an integer")
  .custom(existCourseCategoryId);

const create = [title, course_category_id];
const update = [title, course_category_id];

export default { requestCourseValidator, create, update };
