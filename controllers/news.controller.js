const newsModel = require("../models/news.model");
const fs = require("fs");
//add new
exports.addNew = async (req, res) => {
	const body = req.body;
	const image = req.file.filename;
	if (!image || !body) {
		res.status(422).send({
			success: "false",
			message: "Please enter whole field.",
		});
	}
	const newNews = newsModel.tbl_news.build({
		news_name: body.news_name,
		news_desc: body.news_desc,
		news_image: image,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	try {
		const result = await newNews.save();

		return res.status(200).send({
			success: true,
			message: result,
		});
	} catch (error) {
		return res.status(400).send({ success: false, message: error });
	}
};
//get all
exports.getAll = async (req, res) => {
	const limit = req.params.limit;

	if (limit <= 0) {
		try {
			const data = await newsModel.tbl_news.findAll();

			return res.status(200).send({ success: true, message: data });
		} catch (error) {
			return res.status(422).send({ success: false, message: error });
		}
	} else {
		try {
			const { count, rows } = await newsModel.tbl_news.findAndCountAll({
				limit: 4,
			});

			return res.status(200).send({ success: true, message: rows });
		} catch (error) {
			return res.status(422).send({ success: false, message: error });
		}
	}
};
// get one
exports.getOne = async (req, res) => {
	const id = req.params.id;

	try {
		const data = await newsModel.tbl_news.findByPk(id);
		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(422).send({ success: false, message: error });
	}
};
// update
exports.update = async (req, res) => {
	const newImage = req?.file?.filename || null;
	const id = req.body.news_id;

	try {
		const data = await newsModel.tbl_news.findByPk(id);
		if (newImage) {
			data.update({
				news_name: req.body.news_name,
				news_desc: req.body.news_desc,
				news_image: newImage,
				updated_at: new Date(),
			});
			fs.unlinkSync("./public/images/news/" + req.body.old_iamge);
		} else {
			data.update({
				news_name: req.body.news_name,
				news_desc: req.body.news_desc,
				updated_at: new Date(),
			});
		}

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// delete
exports.delete = async (req, res) => {
	const id = req.params.id;
	const oldImage = req.params.filename;
	try {
		const deleteData = await newsModel.tbl_news.findByPk(id);
		const data = await newsModel.tbl_news.destroy({ where: { id } });
		fs.unlinkSync("./public/images/news/" + oldImage);

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
