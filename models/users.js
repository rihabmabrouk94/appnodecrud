'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rf_id: DataTypes.STRING,
  },{});

  Users.associate = function(models) {
    Users.belongsToMany(models.Roles, {
      through: {
        model: models.Userroles
      },
      as: "Roles",
      foreignKey: "user_id",
      otherKey: "role_id"
    });

  };

  Users.prototype.getMeWithoutPassword = function() {
    const userData = this.toJSON();
    delete userData.password;
    return userData;
  };

  Users.prototype.getUserWithRoles = function() {
    const userData = this.getMeWithoutPassword();

    return new Promise((resolve, reject) => {
      this.getRoles().then( roles => {
        userData.roles = roles;
        resolve(userData);
      }).catch(error => reject(null))
    })
  };

  return Users;
};
