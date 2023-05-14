const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const Fund = sequelize.define("fund", {
    type: DataTypes.STRING,
    num: DataTypes.INTEGER,
    track: DataTypes.STRING,
    detail: DataTypes.STRING,
    createTime: DataTypes.STRING,
  });

module.exports = Fund;
