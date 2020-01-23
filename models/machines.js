'use strict';
module.exports = (sequelize, DataTypes) => {
    const Machines = sequelize.define('Machines', {
        id_machine: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        label: DataTypes.STRING,
        box_id: DataTypes.INTEGER,
        machine_model_id: DataTypes.INTEGER,
        machine_type_id: DataTypes.STRING

    }, {});
    Machines.associate = function (models) {
        // associations can be defined here
        /*Machines.belongsTo(models.Boxes, {
            foreignKey: 'box_id',
            onDelete: 'CASCADE',
            as: 'box'
        });*/
        Machines.belongsTo(models.MachineTypes, {
            foreignKey: 'machine_type_id',
            onDelete: 'CASCADE',
            as: 'machine_type'
        });
        Machines.belongsTo(models.MachineModels, {
            foreignKey: 'machine_model_id',
            onDelete: 'CASCADE',
            as: 'machine_model'
        });
    };
    return Machines;
};
