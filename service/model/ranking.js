const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const Ranking = sequelize.define("ranking", {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    score: DataTypes.INTEGER,
});

module.exports = Ranking;
