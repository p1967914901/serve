const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const User = sequelize.define('user', {
    name: DataTypes.TEXT,
    username: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    birthday: DataTypes.STRING,
    idNo: DataTypes.STRING,
    workingSeniority: DataTypes.INTEGER,
    conditions: DataTypes.INTEGER,
    job: DataTypes.STRING,
    workPlace: DataTypes.STRING,
    skill: DataTypes.STRING,
    advantage: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    isLeave: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    password: DataTypes.STRING,
    createTime: DataTypes.STRING
});

module.exports = User;
