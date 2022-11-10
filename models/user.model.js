"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_user = sequelize.define(
	"tbl_user",
	{
		user_name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		user_username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_password: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		user_image: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		user_phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "tbl_user",
		createdAt: "created_at",
		updatedAt: "updated_at",
		indexes: [
			{
				unique: true,
				fields: ["user_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_user,
};
