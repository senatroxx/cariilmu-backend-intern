import { Op } from "sequelize";
import { ErrorHandler, httpResponse } from "../../config/http";
import { paginate, paginateResource } from "../../database";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";

export default {
  getAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, query = "" } = req.query;
      let data = await UserModel.findAndCountAll(
        paginate(
          {
            where: {
              name: { [Op.like]: `%${query}%` },
            },
          },
          { page, limit }
        )
      );

      data = paginateResource(data, page, limit);

      httpResponse(res, "success", "Users Retrivied Successfly", data);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const data = await UserModel.create({ name, email, password });

      httpResponse(res, "success", "User Created Successfly", data);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  detail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await UserModel.findByPk(id, {
        include: [
          {
            association: "courses",
            through: { attributes: [] },
          },
        ],
      });
      if (!data) throw new ErrorHandler("User Not Found", 404);

      httpResponse(res, "success", "User Retrivied Successfly", data);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await UserModel.update({ name, email }, { where: { id } });
      if (user == 0) throw new ErrorHandler("User Not Found", 404);

      httpResponse(res, "success", "User Updated Successfly");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const user = await UserModel.update(
        { password: await bcrypt.hash(password, 12) },
        { where: { id } }
      );
      if (user == 0) throw new ErrorHandler("User Not Found", 404);

      httpResponse(res, "success", "User Updated Successfly");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await UserModel.destroy({ where: { id } });
      if (data == 0) throw new ErrorHandler("User Not Found", 404);

      httpResponse(res, "success", "User Deleted Successfly");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },
};
