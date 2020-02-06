'use strict';
module.exports = (sequelize, DataTypes) => {
    const operationTemplateModel = sequelize.define('OperationTemplates', {
        operation_type_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        article_id: {
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.STRING
        },
        label: {
            type: DataTypes.STRING
        },
        machine_type_id: {
            type: DataTypes.INTEGER
        }

    }, {});
    operationTemplateModel.associate = function(models) {
        operationTemplateModel.belongsTo(models.Articles, {
            foreignKey: 'article_id',
            as: 'Articles'
        });
        operationTemplateModel.belongsTo(models.MachineTypes, {
            foreignKey: 'machine_type_id',
            as: 'MachineTypes'
        });
    };
    return operationTemplateModel;
};
