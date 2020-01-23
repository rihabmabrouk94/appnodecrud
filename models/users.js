'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rf_id: DataTypes.STRING,
  },{});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
