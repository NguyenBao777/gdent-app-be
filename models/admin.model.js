"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_admin = sequelize.define(
	"tbl_admin",
	{
		admin_username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		admin_password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin_phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin_role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin_status: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		admin_onl: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin_image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_admin",
		createdAt: "created_at",
		updatedAt: "updated_at",
		indexes: [
			{
				unique: true,
				fields: ["admin_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_admin,
};
