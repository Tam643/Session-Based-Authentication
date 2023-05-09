const { DB, DataTypes } = require("../configs/dbconfig");

DB.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

DB.User = require("./user.model")(DB.sequelize, DB.Sequelize);

DB.sequelize.sync().then(() => {
  console.log("Create Table is successfuly");
})
.catch((error) => {
  console.error("Can't to create table  :", error);
});


module.exports = DB;
