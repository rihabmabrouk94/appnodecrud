'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Bundles', {
            bundle_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order_id: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            quantity: {
                allowNull: true,
                type: Sequelize.STRING
            },
            color: {
                allowNull: true,
                type: Sequelize.STRING
            },
            size: {
                allowNull: true,
                type: Sequelize.STRING
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
        return queryInterface.dropTable('Bundles');
    }
};
