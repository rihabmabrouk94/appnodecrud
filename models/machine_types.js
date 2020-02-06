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
    MachineTypes.associate = function (models) {
        // associations can be defined here
        MachineTypes.hasMany(models.Machines, {
            foreignKey: 'id_machine',
            onDelete: 'CASCADE',
            as: 'machines'
        });
        MachineTypes.hasMany(models.Operations, {
            foreignKey: 'operation_id',
            onDelete: 'CASCADE',
            as: 'Operations'
        });

    };
    return MachineTypes;
};
