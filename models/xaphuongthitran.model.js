"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_xaphuongthitran = sequelize.define(
	"tbl_xaphuongthitran",
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
		maqh: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_xaphuongthitran",
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
	tbl_xaphuongthitran,
};
