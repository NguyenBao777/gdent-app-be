"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_tinhthanhpho = sequelize.define(
	"tbl_tinhthanhpho",
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
	},
	{
		tableName: "tbl_tinhthanhpho",
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
	tbl_tinhthanhpho,
};
