import { ErrorHandler, httpResponse } from "../../config/http";
import { UserModel } from "../../models";

export default {
  create: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { course_id } = req.body;

      const user = await UserModel.findByPk(id);
      if (!user) throw new ErrorHandler("User Not Found", 404);

      const courses = await user.getCourses();
      const user_courses = courses.map((course) => course.id);

      await user.setCourses([
        ...new Set(user_courses.concat(course_id.map(Number))),
      ]);

      httpResponse(res, "success", "User Course Created Successfully");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id, course_id } = req.params;

      const user = await UserModel.findByPk(id);
      if (!user) throw new ErrorHandler("User Not Found", 404);

      await user.removeCourses(course_id);

      httpResponse(res, "success", "User Course Deleted Successfully");
    } catch (err) {
      next(new ErrorHandler(err.message, err.status || 500));
    }
  },
};
