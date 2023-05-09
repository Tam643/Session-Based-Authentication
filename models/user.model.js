module.exports = (sequelize, Sequelize)=>{
    return sequelize.define('users', {
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        salt: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });
}
