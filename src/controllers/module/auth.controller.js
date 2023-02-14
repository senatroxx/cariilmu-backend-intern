import { Admin } from "../../models";
import { ErrorHandler, httpResponse } from "../../config/http";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

export default {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const admin = await Admin.create({
        name,
        email,
        password,
      });

      httpResponse(res, "success", "Admin created successfully", admin, 201);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await Admin.scope("withPassword").findOne({
        where: { email },
      });
      if (!user) throw new ErrorHandler("Invalid credentials", 401);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new ErrorHandler("Invalid credentials", 401);

      delete user.password;
      const token = await generateToken(user);

      httpResponse(res, "success", "Admin logged in successfully", token, 200);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },

  me: async (req, res, next) => {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      httpResponse(res, "success", "User found", user);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },
};
