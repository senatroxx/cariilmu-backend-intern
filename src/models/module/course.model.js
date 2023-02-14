import { db } from "../../database";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const Course = db.define(
  "Course",
  {
    id: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    courseCategoryId: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
      references: {
        model: "course_categories",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Course.associations = (models) => {
  Course.belongsToMany(models.User, {
    through: "user_courses",
  });
  Course.belongsTo(models.CourseCategory);
};

export default Course;
