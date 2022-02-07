const { Sequelize } = require("sequelize");

const db = require("../db");
const Movie = require("./Movie");
const constants = require("../constants");

module.exports = db.define("crewmember", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      min: {
        args: 5,
        msg: "Name field should have 5 or more characters",
      },
    },
  },
  role: {
    type: Sequelize.ENUM,
    values: constants.crewMemberRoles,
  },
  movie_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Movie,
      key: "id",
    },
  },
});
