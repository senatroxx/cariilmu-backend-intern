import { validationResult } from "express-validator";
import { ErrorHandler } from "../config/http";
import UserValidator from "./module/user.validator";
import AuthValidator from "./module/auth.validator";

function resultValidator(req, res, next) {
  const validated = validationResult(req);
  if (!validated.isEmpty())
    return next(new ErrorHandler("Validation Error", 422, validated.errors));

  return next();
}

export { resultValidator, AuthValidator };
