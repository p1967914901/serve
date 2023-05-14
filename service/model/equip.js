const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const Equip = sequelize.define("equip", {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    reason: DataTypes.STRING,
    status: DataTypes.STRING,
    createTime: DataTypes.STRING,
});

module.exports = Equip;
