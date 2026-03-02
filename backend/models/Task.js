// models/Task.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

class Task extends Model {}

Task.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    end_date: { type: DataTypes.DATE, allowNull: false }, // renamed to match DB
  },
  { sequelize, modelName: "Task" }
);

// Associations
Task.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Task, { foreignKey: "user_id" });

module.exports = Task;