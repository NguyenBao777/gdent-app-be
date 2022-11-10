"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_quanhuyen = sequelize.define(
	"tbl_quanhuyen",
	{
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		matp: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_quanhuyen",
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ["id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_quanhuyen,
};
