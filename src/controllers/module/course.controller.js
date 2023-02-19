import { CourseModel } from "../../models";
import { ErrorHandler, httpResponse } from "../../config/http";
import { paginate, paginateResource } from "../../database";
import { Op } from "sequelize";

export default {
  getAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, query = "" } = req.query;
      let data = await CourseModel.findAndCountAll(
        paginate(
          {
            where: {
              title: { [Op.like]: `%${query}%` },
            },
            include: ["course_category"],
          },
          { page, limit }
        )
      );

      data = paginateResource(data, page, limit);

      httpResponse(res, "success", "Courses Retrieved Successfully", data, 200);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },

  create: async (req, res, next) => {
    try {
      const { title, course_category_id } = req.body;
      console.log(req.body);

      const course = await CourseModel.create({
        title,
        course_category_id,
      });

      httpResponse(res, "success", "Course created successfully", course, 201);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },

  getParticipant: async (req, res, next) => {
    try {
      const { id } = req.params;

      const course = await CourseModel.findByPk(id, {
        include: [
          {
            association: "users",
            through: { attributes: [] },
          },
        ],
      });
      if (!course) throw new ErrorHandler("Course not found", 404);

      httpResponse(
        res,
        "success",
        "Course participant retrieved successfully",
        course
      );
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },

  detail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await CourseModel.findByPk(id, {
        include: ["course_category"],
      });
      if (!data) throw new ErrorHandler("Course not found", 404);

      httpResponse(res, "success", "Course retrieved successfully", data, 200);
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, course_category_id } = req.body;

      const course = await CourseModel.update(
        { title, course_category_id },
        { where: { id } }
      );

      if (course == 0) throw new ErrorHandler("Course Not Found", 404);

      httpResponse(res, "success", "Course updated successfully");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const course = await CourseModel.destroy({ where: { id } });

      if (course == 0) throw new ErrorHandler("Course Not Found", 404);

      httpResponse(res, "success", "Course deleted successfully");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status));
    }
  },
};
