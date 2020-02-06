'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('OperationTemplates', {
            operation_type_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            article_id: {
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
        return queryInterface.dropTable('OperationTemplates');
    }
};
