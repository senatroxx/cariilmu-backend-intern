import { check, validationResult } from "express-validator";
import { Op } from "sequelize";

import { ErrorHandler } from "../../config/http";
import { UserModel } from "../../models";

function requestUserValidator(req) {
  return validationResult(req);
}

async function existEmail(val) {
  const data = await UserModel.findOne({ where: { email: val }, raw: true });

  if (data) throw new ErrorHandler("Email is already in use", 422);

  return true;
}

async function updateExistEmail(val, { req }) {
  const data = await UserModel.findOne({
    where: {
      [Op.and]: [
        { email: val },
        {
          id: {
            [Op.ne]: req.params.id,
          },
        },
      ],
    },
    raw: true,
  });

  if (data) throw new ErrorHandler("Email is already in use", 422);

  return true;
}

const name = check("name").notEmpty().withMessage("Name cannot be empty");

const createEmail = check("email")
  .notEmpty()
  .withMessage("Email cannot be empty")
  .normalizeEmail()
  .isEmail()
  .withMessage("Email Invalid")
  .custom(existEmail);

const updateEmail = check("email")
  .notEmpty()
  .withMessage("Email cannot be empty")
  .normalizeEmail()
  .isEmail()
  .withMessage("Email Invalid")
  .custom(updateExistEmail);

const password = check("password")
  .notEmpty()
  .withMessage("Password cannot be empty")
  .isLength({ min: 6 })
  .withMessage("Password minimum 6 characters");

const create = [name, createEmail, password];

const update = [name, updateEmail];

const updatePassword = [password];

export default {
  requestUserValidator,
  create,
  update,
  updatePassword,
};
