'use strict';
module.exports = (sequelize, DataTypes) => {
  const MachineTypes = sequelize.define('MachineTypes', {
    machine_type_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: DataTypes.STRING,
  }, {});
  MachineTypes.associate = function(models) {
    // associations can be defined here
    MachineTypes.hasMany(models.Machines, {
      foreignKey: 'machine_type_id',
      onDelete: 'CASCADE',
      as: 'machines'
    });
  };
  return MachineTypes;
};
