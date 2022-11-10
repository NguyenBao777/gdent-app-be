"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_order_detail = sequelize.define(
	"tbl_order_detail",
	{
		order_code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		product_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		product_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		product_image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sale_qty: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_order_detail",
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ["order_detail_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_order_detail,
};
