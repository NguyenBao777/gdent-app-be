"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_brand = sequelize.define(
	"tbl_brand",
	{
		brand_name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		brand_desc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		brand_status: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		brand_image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_brand",
		createdAt: "created_at",
		updatedAt: "updated_at",
		indexes: [
			{
				unique: true,
				fields: ["brand_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_brand,
};
