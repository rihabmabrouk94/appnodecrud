'use strict';
module.exports = (sequelize, DataTypes) => {
    const works = sequelize.define('Works', {
        work_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        datestart: {
            allowNull: true,
            type: DataTypes.DATE
        },
        dateend: {
            allowNull: true,
            type: DataTypes.DATE
        },
            duration: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        type: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        }
    }, {
        timestamps: false
    },
        );
    works.associate = function(models) {
        // associations can be defined here
    };
    return works;
};
