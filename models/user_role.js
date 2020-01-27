'use strict';

module.exports = (sequelize, DataTypes) => {

    const Userroles = sequelize.define('Userroles', {
        user_id: DataTypes.INTEGER,
        role_id: DataTypes.INTEGER
    }, {
        uniqueKeys: {
            actions_unique: {
                fields: ['user_id', 'role_id']
            }
        }
    });

    return Userroles;
};
