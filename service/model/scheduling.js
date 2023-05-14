const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const Scheduling = sequelize.define("scheduling", {
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    username1: DataTypes.STRING,
    name1: DataTypes.STRING,
    username2: DataTypes.STRING,
    name2: DataTypes.STRING,
});

module.exports = Scheduling;
