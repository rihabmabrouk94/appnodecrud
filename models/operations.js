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
        description: {
            type: DataTypes.STRING
        },

    }, {});
    operationModel.associate = function(models) {
        operationModel.belongsTo(models.Bundles, {
            foreignKey: 'bundle_id',
            as: 'Bundles'
        });
    };
    return operationModel;
};
