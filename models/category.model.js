"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_category = sequelize.define(
	"tbl_category",
	{
		category_name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		category_desc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category_status: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		category_image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_category",
		createdAt: "created_at",
		updatedAt: "updated_at",
		indexes: [
			{
				unique: true,
				fields: ["category_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_category,
};
