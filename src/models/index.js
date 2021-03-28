const Sequelize = require('sequelize');
const RunModel = require('./run');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, CLEARDB_DATABASE_URL } = process.env;

const setupDatabase = () => {
    // const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    //     host: DB_HOST,
    //     port: DB_PORT,
    //     dialect: "mysql",
    //     logging: false
    // });

    const connection = CLEARDB_DATABASE_URL ?
	new Sequelize(CLEARDB_DATABASE_URL) :
	new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
        logging: false,
    });

    const Run = RunModel(connection, Sequelize);

    connection.sync({ alter: true });

    return {
        Run,
    };
};

module.exports = setupDatabase();