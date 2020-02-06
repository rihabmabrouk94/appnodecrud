'use strict';
module.exports = (sequelize, DataTypes) => {
    const orderModel = sequelize.define('Orders', {
        order_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        article_id: {
            type: DataTypes.INTEGER
        },
        client_id: {
            type: DataTypes.INTEGER
        },
        code: {
            type: DataTypes.STRING
        },


    }, {});
    orderModel.associate = function(models) {
        // associations can be defined here
        orderModel.belongsTo(models.Articles, {
            foreignKey: 'article_id',

        });
        orderModel.belongsTo(models.Clients, {
            foreignKey: 'client_id',
            as:"Clients"
        });

    };
    return orderModel;
};
