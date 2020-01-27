'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Userroles', {
            user_role_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: Sequelize.INTEGER,
            role_id: Sequelize.INTEGER,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            uniqueKeys: {
                actions_unique: {
                    fields: ['user_id', 'role_id']
                }
            }
        });

    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Userroles');
    }
};
