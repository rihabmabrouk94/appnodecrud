'use strict';
module.exports = (sequelize, DataTypes) => {
    const carteoperationsessionModel = sequelize.define('CarteOperationSessions', {
        carte_operation_session_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        carte_operation_id: {
            type: DataTypes.INTEGER
        },
        usersession_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.STRING
        },
        label: {
            type: DataTypes.STRING
        },
        end_time: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        start_time: {
            type: DataTypes.DATE
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

    carteoperationsessionModel.associate = function(models) {
        carteoperationsessionModel.belongsTo(models.CarteOperations, {
            foreignKey: 'carte_operation_id',
            as: 'CarteOperations'
        });
        carteoperationsessionModel.belongsTo(models.Usersessions, {
            foreignKey: 'usersession_id'
        });
    };
    return carteoperationsessionModel;
};
