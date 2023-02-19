import { check, validationResult } from "express-validator";

import { ErrorHandler } from "../../config/http";
import { CourseCategoryModel } from "../../models";

const requestCourseCategoryValidator = (req) => validationResult(req);

const existName = async (val) => {
  const data = await CourseCategoryModel.findOne({
    where: { name: val },
    raw: true,
  });

  if (data) throw new ErrorHandler("Name is already in use", 422);

  return true;
};

const nameCreate = check("name")
  .notEmpty()
  .withMessage("Name is required")
  .custom(existName);

const nameUpdate = check("name").notEmpty().withMessage("Name is required");

const create = [nameCreate];
const update = [nameUpdate];

export default { requestCourseCategoryValidator, create, update };
