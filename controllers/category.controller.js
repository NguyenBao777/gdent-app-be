const categoryModel = require("../models/category.model");
const fs = require("fs");
const vercelCross = require("../config/crosshandler");
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
	const newCategory = categoryModel.tbl_category.build({
		category_name: body.category_name,
		category_desc: body.category_desc,
		category_status: body.category_status,
		category_image: image,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	try {
		const result = await newCategory.save();

		return res.status(200).send({
			success: true,
			message: result,
		});
	} catch (error) {
		return res.status(400).send({ success: false, message: error });
	}
};
// get all
exports.getAll = async (req, res) => {
	try {
		const data = await categoryModel.tbl_category.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// getOne
exports.getOne = async (req, res) => {
	const id = req.params.id;

	try {
		const data = await categoryModel.tbl_category.findByPk(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// update
exports.update = async (req, res) => {
	const newImage = req?.file?.filename || null;
	const id = req.body.category_id;

	try {
		const data = await categoryModel.tbl_category.findByPk(id);
		if (newImage) {
			data.update({
				category_name: req.body.category_name,
				category_desc: req.body.category_desc,
				category_image: newImage,
				category_status: req.body.category_status,
				updated_at: new Date(),
			});
			fs.unlinkSync("./public/images/category/" + req.body.old_iamge);
		} else {
			data.update({
				category_name: req.body.category_name,
				category_desc: req.body.category_desc,
				category_status: req.body.category_status,
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
		const deleteData = await categoryModel.tbl_category.findByPk(id);
		const data = await categoryModel.tbl_category.destroy({ where: { id } });
		fs.unlinkSync("./public/images/category/" + oldImage);

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
