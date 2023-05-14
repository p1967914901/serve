const { Sequelize } = require('sequelize');

const database = 'recue';
const username = 'root';
const password = 'panxiaan196';
const host = 'localhost';
const dialect = 'mysql';

const sequelize = new Sequelize(database, username, password, {
    host, dialect
});

try {
    sequelize.authenticate();
    console.log('connection has been established successfully...');
} catch (error) {
    console.log('unable to connect to the database:', error);
}

module.exports = sequelize;