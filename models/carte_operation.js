'use strict';
module.exports = (sequelize, DataTypes) => {
    const carteoperationModel = sequelize.define('CarteOperations', {
        carte_operation_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        operation_id: {
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
        quantity: {
            type: DataTypes.INTEGER
        },
        quantity_total: {
            type: DataTypes.INTEGER
        },
        datestart: {
            type: DataTypes.DATE
        },
        dateend: {
            type: DataTypes.DATE
        },
        in_progress: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'N'
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }

    }, {});

    carteoperationModel.associate = function(models) {
        carteoperationModel.belongsTo(models.Operations, {
            foreignKey: 'operation_id',
            as: 'Operations'
        });
    };
    return carteoperationModel;
};
