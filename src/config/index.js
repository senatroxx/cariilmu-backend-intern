import dotenv from "dotenv";
dotenv.config();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const name = process.env.DB_NAME;

module.exports = {
  development: {
    host,
    username,
    password,
    database: name,
    dialect: "mysql",
  },
  test: {
    host,
    username,
    password,
    database: name,
    dialect: "mysql",
  },
  production: {
    host,
    username,
    password,
    database: name,
    dialect: "mysql",
  },
  jwt: {
    token: process.env.JWT_TOKEN,
  },
};
