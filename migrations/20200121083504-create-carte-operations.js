'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('CarteOperations', {
            carte_operation_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            operation_id: {
                type: Sequelize.INTEGER
            },
            time: {
                type: Sequelize.STRING
            },
            finished: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            label: {
                type: Sequelize.STRING
            },
            active: {
                type: Sequelize.STRING
            },
            datestart: {
                type: Sequelize.DATE
            },
            dateend: {
                type: Sequelize.DATE
            },
            in_progress: {
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
        return queryInterface.dropTable('CarteOperations');
    }
};
