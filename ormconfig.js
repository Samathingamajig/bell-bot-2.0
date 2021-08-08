require("dotenv").config();

const { ConnectionOptions } = require("typeorm");

/**
 * @type {ConnectionOptions}
 */
module.exports = {
  type: "postgres",
  host: process.env["DATABASE_HOST"],
  port: Number(process.env["DATABASE_PORT"]),
  database: process.env["DATABASE_NAME"],
  username: process.env["DATABASE_USER"],
  password: process.env["DATABASE_PASSWORD"],
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers",
  },
};
