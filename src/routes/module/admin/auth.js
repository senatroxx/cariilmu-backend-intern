import express from "express";

import { AuthController } from "../../../controllers";
import { resultValidator, AuthValidator } from "../../../validator";
import { auth } from "../../../middleware";

const route = express.Router();

const router = () => {
  route.post(
    "/login",
    AuthValidator.login,
    resultValidator,
    AuthController.login
  );

  route.post(
    "/register",
    AuthValidator.register,
    resultValidator,
    AuthController.register
  );

  return route;
};

export default router;
