import { check, validationResult } from "express-validator";

import { ErrorHandler } from "../../config/http";
import { AdminModel } from "../../models";

const requestAdminValidator = (req) => validationResult(req);

const existEmail = async (val) => {
  const data = await AdminModel.findOne({ where: { email: val }, raw: true });

  if (data) throw new ErrorHandler("Email is already in use", 422);

  return true;
};

const passwordMatch = (val, { req }) => {
  const { password_confirmation } = req.body;

  if (val !== password_confirmation)
    throw new ErrorHandler("Password does not match", 422);

  return true;
};

const name = check("name").notEmpty().withMessage("Name is required");

const loginEmail = check("email")
  .notEmpty()
  .withMessage("Email cannot be empty")
  .normalizeEmail()
  .isEmail()
  .withMessage("Email is invalid");

const registerEmail = check("email")
  .notEmpty()
  .withMessage("Email cannot be empty")
  .normalizeEmail()
  .isEmail()
  .withMessage("Email is invalid")
  .custom(existEmail);

const loginPassword = check("password")
  .notEmpty()
  .withMessage("Password cannot be empty")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters");

const registerPassword = check("password")
  .notEmpty()
  .withMessage("Password cannot be empty")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters")
  .custom(passwordMatch);

const refreshToken = check("token")
  .notEmpty()
  .withMessage("Token cannot be empty");

const login = [loginEmail, loginPassword];
const register = [name, registerEmail, registerPassword];
const refresh = [refreshToken];

export default { requestAdminValidator, login, register, refresh };
