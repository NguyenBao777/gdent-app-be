const contentModel = require("../models/content.model");
const vercelCross = require("../config/crosshandler");
// add new
exports.addNew = async (req, res) => {
	vercelCross;
	const newContent = contentModel.tbl_content.build({
		content_title: req.body.content_title,
		content_desc: req.body.content_desc,
	});

	try {
		const result = await newContent.save();

		return res.status(200).send({
			success: true,
			message: result,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// get all
exports.getAll = async (req, res) => {
	vercelCross;
	try {
		const data = await contentModel.tbl_content.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// getOne
exports.getOne = async (req, res) => {
	const id = req.body.id;

	try {
		const data = await contentModel.tbl_content.findOne(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// update
exports.update = async (req, res) => {
	vercelCross;
	try {
		const data = await contentModel.tbl_content.findByPk(req.body.content_id);
		data.update({
			content_title: req.body.content_title,

			content_desc: req.body.content_desc,
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(422).send({ success: false, message: error });
	}
};
// delete
exports.delete = async (req, res) => {
	vercelCross;
	const id = req.params.id;
	try {
		const deleteData = await contentModel.tbl_content.findByPk(id);
		const data = await contentModel.tbl_content.destroy({ where: { id } });

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
