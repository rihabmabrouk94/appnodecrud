'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('CarteOperationSessions', {
            carte_operation_session_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            carte_operation_id: {
                type: Sequelize.INTEGER
            },

            usersession_id: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            label: {
                type: Sequelize.STRING
            },
            time: {
                type: Sequelize.STRING
            },
            start_time: {
                type: Sequelize.DATE
            },
            end_time: {
                type: Sequelize.DATE
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
        return queryInterface.dropTable('CarteOperationSessions');
    }
};
