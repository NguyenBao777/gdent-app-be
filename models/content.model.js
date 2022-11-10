"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_content = sequelize.define(
	"tbl_content",
	{
		content_title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content_desc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_content",
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ["content_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_content,
};
