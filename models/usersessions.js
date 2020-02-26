'use strict';
const users = require('./users');
const boxes = require('./boxes');
module.exports = (sequelize, DataTypes) => {
    const Usersessions = sequelize.define('Usersessions', {
        usersession_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        box_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        /*active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },*/
        user_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        time_start: {
            allowNull: true,
            type: DataTypes.DATE
        },
        time_finish: {
            allowNull: true,
            type: DataTypes.DATE
        },
    });
    Usersessions.associate = function(models) {
        Usersessions.belongsTo(models.Users, {
            foreignKey:'user_id',
                as:'User'
        });
        Usersessions.belongsTo(models.Boxes, {
            foreignKey:'box_id',
            as:'box'
        });
    };
    return Usersessions;
};
