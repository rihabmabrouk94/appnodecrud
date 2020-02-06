'use strict';
module.exports = (sequelize, DataTypes) => {
    const bundleModel = sequelize.define('Bundles', {
        bundle_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        order_id: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        color: {
            type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.STRING
        },

    }, {});
    bundleModel.associate = function(models) {
        bundleModel.belongsTo(models.Orders, {
            foreignKey: 'order_id'
        });

    };
    return bundleModel;
};
