"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_product = sequelize.define(
	"tbl_product",
	{
		product_name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		product_desc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		product_image_1: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		product_image_2: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		product_image_3: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		product_price: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		product_listed_price: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		product_qty: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		product_sold_qty: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
		product_status: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		product_origin: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		product_code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		brand_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		category_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_product",
		createdAt: "created_at",
		updatedAt: "updated_at",
		indexes: [
			{
				unique: true,
				fields: ["product_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_product,
};
