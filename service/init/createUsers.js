const User = require('../model/user');
const data = require('./user');

module.exports = async () => {
    await User.sync({ force: true });
    await User.bulkCreate(data);
};
