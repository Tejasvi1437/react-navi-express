const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./config/database.sqlite", // SQLite file
  logging: false,
});

module.exports = sequelize;