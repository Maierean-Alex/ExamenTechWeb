const { Sequelize } = require("sequelize");

const db = require("../db");
const constants = require("../constants");

module.exports = db.define("movie", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    validate: {
      min: {
        args: 3,
        msg: "Title field should have 3 or more characters",
      },
    },
  },
  category: {
    type: Sequelize.ENUM,
    values: constants.movieCategories,
  },
  date: Sequelize.DATE,
});
