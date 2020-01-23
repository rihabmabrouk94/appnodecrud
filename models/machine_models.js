'use strict';
module.exports = (sequelize, DataTypes) => {
  const MachineModels = sequelize.define('MachineModels', {
    machine_model_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: DataTypes.STRING,
  }, {});
  MachineModels.associate = function(models) {
    // associations can be defined here
    MachineModels.hasMany(models.Machines, {
      foreignKey: 'machine_model_id',
      onDelete: 'CASCADE',
      as: 'machines'
    });
  };
  return MachineModels;
};
