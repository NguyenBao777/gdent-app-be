const brandModel = require("../models/brand.model");
const fs = require("fs");
const vercelCross = require("../config/crosshandler");

// add new
exports.addNew = async (req, res) => {
	const body = req.body;
	const image = req.file.filename;
	if (!image || !body) {
		res.status(422).send({
			success: "false",
			message: "Please enter whole field.",
		});
	}
	const newbrand = brandModel.tbl_brand.build({
		brand_name: body.brand_name,
		brand_desc: body.brand_desc,
		brand_status: body.brand_status,
		brand_image: image,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	try {
		const result = await newbrand.save();

		return res.status(200).send({
			success: true,
			message: result,
		});
	} catch (error) {
		return res.status(400).send({ success: false, message: error });
	}
};
//get All
exports.getAll = async (req, res) => {
	const limit = req.params.limit;
	try {
		if (limit > 0) {
			const data = await brandModel.tbl_brand.findAll({
				where: { brand_status: 1 },
				limit: 4,
			});
			return res.status(200).send({ success: true, message: data });
		} else {
			const data = await brandModel.tbl_brand.findAll();

			return res.status(200).send({ success: true, message: data });
		}
	} catch (error) {
		console.log(error);
		return res.status(422).send({ success: false, message: error });
	}
};
//get one
exports.getOne = async (req, res) => {
	const id = req.body.id;

	try {
		const data = await brandModel.tbl_brand.findOne(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// update
exports.update = async (req, res) => {
	const newImage = req?.file?.filename || null;
	const id = req.body.brand_id;
	console.log(id);

	try {
		const data = await brandModel.tbl_brand.findByPk(id);
		if (newImage) {
			data.update({
				brand_name: req.body.brand_name,
				brand_desc: req.body.brand_desc,
				brand_image: newImage,
				brand_status: req.body.brand_status,
				updated_at: new Date(),
			});
			fs.unlinkSync("./public/images/brand/" + req.body.old_iamge);
		} else {
			data.update({
				brand_name: req.body.brand_name,
				brand_desc: req.body.brand_desc,
				brand_status: req.body.brand_status,
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
		const data = await brandModel.tbl_brand.destroy({ where: { id: id } });
		fs.unlinkSync("./public/images/brand/" + oldImage);

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
