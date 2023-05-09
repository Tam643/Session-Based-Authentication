require("dotenv").config();
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASENAME,
  process.env.USER,
  process.env.PASSWORD,
  {
      host:process.env.HOST,
      dialect:process.env.DIALECT,
      define: {
        timestamps: true
      }
  }
)
 
const DB = {};
DB.sequelize = sequelize;
DB.Sequelize = Sequelize;

module.exports = {DB, DataTypes};