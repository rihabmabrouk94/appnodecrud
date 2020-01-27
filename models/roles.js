'use strict';

module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('Roles', {
        role_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        role_name: DataTypes.STRING,
    }, {});

    Roles.associate = function (models) {
        Roles.belongsToMany(models.Users, {
            through: {
                model: models.Userroles
            },
            as: "Users",
            foreignKey: "role_id",
            otherKey: "user_id"
        });
    };

    return Roles;
};
