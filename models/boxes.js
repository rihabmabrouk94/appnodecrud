'use strict';
module.exports = (sequelize, DataTypes) => {
  const Boxes = sequelize.define('Boxes', {
    box_id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: {
      type: DataTypes.STRING
    },
    mac_address: {
      type: DataTypes.STRING
    },
    line_id: {
      type: DataTypes.INTEGER
    },
  }, {});
  Boxes.associate = function(models) {
    // associations can be defined here
    Boxes.belongsTo(models.Lines, {
      foreignKey: 'line_id',
      onDelete: 'CASCADE',
      as:'Line'
    });
  };
  return Boxes;
};
