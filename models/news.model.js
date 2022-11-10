"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// table [extension]
const tbl_news = sequelize.define(
	"tbl_news",
	{
		news_name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		news_desc: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		news_image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "tbl_news",
		createdAt: "created_at",
		updatedAt: "updated_at",
		indexes: [
			{
				unique: true,
				fields: ["news_id"],
			},
		],
		charset: "utf8",
		collate: "utf8_unicode_ci",
	}
);

module.exports = {
	tbl_news,
};
