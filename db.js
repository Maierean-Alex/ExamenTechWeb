const Sequelize = require("sequelize");
const { config } = require("dotenv");

config();

const db =
  process.env.NODE_ENV === "dev"
    ? new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
          host: process.env.DB_HOST,
          dialect: "mysql",
        }
      )
    : new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });

module.exports = db;
