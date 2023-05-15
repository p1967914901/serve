const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const EquipCall = sequelize.define("equipCall", {
    activityId: DataTypes.INTEGER,
    equip: DataTypes.STRING,
});

const Activity = sequelize.define("activity", {
    activityType: DataTypes.STRING,
    status: DataTypes.STRING,
    reporterName: DataTypes.STRING,
    reporterPhone: DataTypes.STRING,
    reporterAddress: DataTypes.STRING,
    activityAddress: DataTypes.STRING,
    fund: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    userNumRequired: DataTypes.INTEGER,
    skillRequired: DataTypes.STRING,
    createTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    detail: DataTypes.STRING,
});

const PersonCall = sequelize.define("personCall", {
    activityId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    isSure: DataTypes.STRING,
});

module.exports = {
    EquipCall, Activity, PersonCall
};
