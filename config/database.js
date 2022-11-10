const Sequelize = require("sequelize");
const op = Sequelize.Op;
const operatorsAliases = {
	$like: op.like,
	$not: op.not,
};
require("dotenv/config");

const sequelize = new Sequelize(
	process.env.DB_NAME || "gdent-app",
	process.env.DB_USER || "root",
	process.env.DB_PASSWORD || null,
	{
		host: process.env.DB_HOST || "localhost",
		dialect: "mysql",
		operatorsAliases,
	}
);

module.exports = sequelize;
