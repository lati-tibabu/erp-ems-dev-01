const { Sequelize } = require("sequelize");
const config = require("./config.json");

const env = "development";

const dbConfig = config[env];
console.log("Database Config: ");
console.log(dbConfig);

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

module.exports = sequelize;
