"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_slide = sequelize.define(
	"tbl_slide",
	{
		slide_name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		slide_desc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		slide_status: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		slide_image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_slide",
		createdAt: "created_at",
		updatedAt: "updated_at",
		indexes: [
			{
				unique: true,
				fields: ["slide_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_slide,
};
