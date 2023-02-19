import { Op } from "sequelize";
import { ErrorHandler, httpResponse } from "../../config/http";
import { paginate, paginateResource } from "../../database";
import { CourseCategoryModel } from "../../models";

export default {
  getAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, query = "" } = req.query;
      let data = await CourseCategoryModel.findAndCountAll(
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

      httpResponse(
        res,
        "success",
        "Course Categories Retrivied Successfly",
        data
      );
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      const data = await CourseCategoryModel.create({ name });

      httpResponse(res, "success", "Course Category Created Successfly", data);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  detail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await CourseCategoryModel.findByPk(id);
      if (!data) throw new ErrorHandler("Course Category Found", 404);

      httpResponse(
        res,
        "success",
        "Course Category Retrivied Successfly",
        data
      );
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const data = await CourseCategoryModel.update(
        { name },
        { where: { id } }
      );

      if (data == 0) throw new ErrorHandler("Course Category Not Found", 404);

      httpResponse(res, "success", "Course Category Updated Successfly");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await CourseCategoryModel.destroy({ where: { id } });
      if (data == 0) throw new ErrorHandler("Course Category Not Found", 404);

      httpResponse(res, "success", "Course Category Deleted Successfly");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },
};
