'use strict';
module.exports = (sequelize, DataTypes) => {
    const operationModel = sequelize.define('Operations', {
        operation_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        bundle_id: {
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.STRING
        },
        label: {
            type: DataTypes.STRING
        },
        finished: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        quantity_total: {
            type: DataTypes.INTEGER
        },
        quantity_relised: {
            type: DataTypes.INTEGER
        },
        machine_type_id: {
            type: DataTypes.INTEGER
        }

    }, {});
    operationModel.associate = function(models) {
        operationModel.belongsTo(models.Bundles, {
            foreignKey: 'bundle_id',
            as: 'Bundles'
        });
        operationModel.belongsTo(models.MachineTypes, {
            foreignKey: 'machine_type_id',
            as: 'MachineTypes'
        });
    };
    return operationModel;
};
