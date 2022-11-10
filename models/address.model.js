"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_address = sequelize.define(
	"tbl_address",
	{
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tinhthanhpho_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		tinhthanhpho_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		quanhuyen_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		quanhuyen_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		xaphuongthitran_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		xaphuongthitran_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ship_cost: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
	},
	{
		tableName: "tbl_address",
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ["address_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_address,
};
