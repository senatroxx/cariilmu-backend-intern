import UserModel from "./module/user.model";
import AdminModel from "./module/admin.model";
import CourseModel from "./module/course.model";
import CourseCategoryModel from "./module/course-category.model";

CourseModel.belongsTo(CourseCategoryModel, {
  foreignKey: "course_category_id",
  as: "course_category",
});

CourseCategoryModel.hasMany(CourseModel, {
  foreignKey: "course_category_id",
  as: "courses",
});

UserModel.belongsToMany(CourseModel, {
  through: "user_courses",
  as: "courses",
  foreignKey: "user_id",
});

CourseModel.belongsToMany(UserModel, {
  through: "user_courses",
  as: "users",
  foreignKey: "course_id",
});

export { UserModel, AdminModel, CourseModel, CourseCategoryModel };
