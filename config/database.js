const Sequelize = require("sequelize");
const op = Sequelize.Op;
const operatorsAliases = {
	$like: op.like,
	$not: op.not,
};
require("dotenv/config");

const sequelize = new Sequelize(
	process.env.DB_NAME || "bpc92kgfz0jacuegej03",
	process.env.DB_USER || "unzuyt7gqtftgznq",
	process.env.DB_PASSWORD || "wyTgT8Z9GyXM73Y1y065",
	{
		host: process.env.DB_HOST || "bpc92kgfz0jacuegej03-mysql.services.clever-cloud.com",
		dialect: "mysql",
		operatorsAliases,
	}
);

module.exports = sequelize;
