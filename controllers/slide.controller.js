const slideModel = require("../models/slide.model");
const fs = require("fs");

//add new
exports.addNew = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	const body = req.body;
	const image = req.file.filename;

	if (!image || !body) {
		res.status(422).send({
			success: "false",
			message: "Please enter whole field.",
		});
	}
	const newslide = slideModel.tbl_slide.build({
		slide_name: body.slide_name,
		slide_desc: body.slide_desc,
		slide_status: body.slide_status,
		slide_image: image,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	try {
		const result = await newslide.save();

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
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	const limit = req.body.limit;
	if (limit <= 0) {
		try {
			const data = await slideModel.tbl_slide.findAll();

			return res.status(200).send({ success: true, message: data });
		} catch (error) {
			return res.status(422).send({ success: false, message: error });
		}
	} else {
		try {
			const { count, rows } = await slideModel.tbl_slide.findAndCountAll({
				where: { slide_status: 1 },
				limit: limit,
			});

			return res.status(200).send({ success: true, message: rows });
		} catch (error) {
			return res.status(422).send({ success: false, message: error });
		}
	}
};
// getOne
exports.getOne = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	const id = req.body.id;

	try {
		const data = await slideModel.tbl_slide.findOne(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// update
exports.update = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	const newImage = req?.file?.filename || null;
	const id = req.body.slide_id;
	console.log(id);

	try {
		const data = await slideModel.tbl_slide.findByPk(id);
		if (newImage) {
			data.update({
				slide_name: req.body.slide_name,
				slide_desc: req.body.slide_desc,
				slide_image: newImage,
				slide_status: req.body.slide_status,
				updated_at: new Date(),
			});
			fs.unlinkSync("./public/images/slide/" + req.body.old_iamge);
		} else {
			data.update({
				slide_name: req.body.slide_name,
				slide_desc: req.body.slide_desc,
				slide_status: req.body.slide_status,
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
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	const id = req.params.id;
	const oldImage = req.params.filename;
	try {
		const deleteData = await slideModel.tbl_slide.findByPk(id);
		const data = await slideModel.tbl_slide.destroy({ where: { id } });
		fs.unlinkSync("./public/images/slide/" + oldImage);

		return res.status(200).send({ success: true, message: "Data deleted successfully" });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
