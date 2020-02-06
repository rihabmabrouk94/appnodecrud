'use strict';
module.exports = (sequelize, DataTypes) => {
    const ClientModel = sequelize.define('Clients', {
        client_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        tel: {
            type: DataTypes.INTEGER
        },

    }, {});
    ClientModel.associate = function(models) {
        // associations can be defined here

    };
    return ClientModel;
};
