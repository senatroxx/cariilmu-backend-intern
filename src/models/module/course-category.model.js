import { CourseModel } from "..";
import { db } from "../../database";
import { DataTypes } from "sequelize";

const CourseCategory = db.define(
  "CourseCategory",
  {
    id: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default CourseCategory;
