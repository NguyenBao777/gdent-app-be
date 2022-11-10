"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_order = sequelize.define(
	"tbl_order",
	{
		order_code: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
		order_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		order_phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		order_address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tinhthanhpho_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		tinhthanhpho_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quanhuyen_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		quanhuyen_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		xaphuongthitran_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		xaphuongthitran_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		order_status: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		shipper_id: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
		order_total: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		payment_method: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_order",
		createdAt: "created_at",
		updatedAt: "updated_at",
		indexes: [
			{
				unique: true,
				fields: ["order_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_order,
};
