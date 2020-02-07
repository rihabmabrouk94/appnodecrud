'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Operations', {
            operation_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bundle_id: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            machine_type_id: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            time: {
                allowNull: true,
                type: Sequelize.STRING
            },
            label: {
                allowNull: true,
                type: Sequelize.STRING
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING
            },
            finished: {
                allowNull: true,
                type: Sequelize.STRING
            },
            quantity_total: {
                type: Sequelize.INTEGER
            },
            quantity_relised: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Operations');
    }
};
