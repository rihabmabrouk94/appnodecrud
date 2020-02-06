'use strict';
module.exports = (sequelize, DataTypes) => {
    const articleModel = sequelize.define('Articles', {
        article_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        label: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },

    }, {});
    articleModel.associate = function(models) {
        // associations can be defined here

    };
    return articleModel;
};
