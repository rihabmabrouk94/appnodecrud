'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lines = sequelize.define('Lines', {
    line_id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: DataTypes.STRING
  }, {});
  Lines.associate = function(models) {
    // associations can be defined here
    Lines.hasMany(models.Boxes, {
      foreignKey: 'box_id',
      as: 'Boxes'
    });
  };
  return Lines;
};
