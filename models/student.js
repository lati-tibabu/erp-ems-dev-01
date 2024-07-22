const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Student extends Model {}

Student.init(
  {
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birth_date: DataTypes.DATE,
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enrollment_date: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Student",
  }
);

module.exports = Student;
