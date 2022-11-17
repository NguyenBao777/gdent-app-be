const productModel = require("../models/product.model");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const fs = require("fs");
const vercelCross = require("../config/crosshandler");
//add new
exports.addNew = async (req, res) => {
	const body = req.body;
	console.log(body);
	const image_1 = req.files[0].filename;
	const image_2 = req?.files[1]?.filename || null;
	const image_3 = req?.files[2]?.filename || null;

	if (!image_1 || !body) {
		res.status(422).send({
			success: "false",
			message: "Please enter whole field.",
		});
	}
	const newProduct = productModel.tbl_product.build({
		product_name: body.product_name,
		product_desc: body.product_desc,
		product_image_1: image_1 || null,
		product_image_2: image_2 || null,
		product_image_3: image_3 || null,
		product_price: body.product_price,
		product_listed_price: body.product_listed_price,
		product_qty: body.product_qty,
		product_sold_qty: null,
		product_status: body.product_status,
		product_origin: body.product_origin || null,
		product_code: body.product_code,
		brand_id: body.product_brand,
		category_id: body.product_category,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	try {
		const result = await newProduct.save();
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
	try {
		const data = await productModel.tbl_product.findAll({ where: { product_status: 1 } });

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// get limit
exports.getLimit = async (req, res) => {
	try {
		const data = await productModel.tbl_product.findAll({
			where: { product_status: 1 },
			order: [["product_sold_qty", "DESC"]],
			limit: 6,
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// get one
exports.getOne = async (req, res) => {
	const id = req.params.id;
	try {
		const data = await productModel.tbl_product.findByPk(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
// update
exports.update = async (req, res) => {
	const files = req?.files;

	try {
		const data = await productModel.tbl_product.findByPk(req.body.product_id);

		switch (files.length) {
			case 1:
				data.update({
					product_name: req.body.product_name,
					product_desc: req.body.product_desc,
					product_image_1: files[0].filename,
					product_code: req.body.product_code,
					product_origin: req.body.product_origin,
					product_price: req.body.product_price,
					product_listed_price: req.body.product_listed_price,
					product_qty: req.body.product_qty,
					product_status: req.body.product_status,
					category_id: req.body.product_category,
					brand_id: req.body.product_brand,
					updatedAt: new Date(),
				});
				fs.unlinkSync("./public/images/product/" + req.body.old_images[0]);
				break;
			case 2:
				data.update({
					product_name: req.body.product_name,
					product_desc: req.body.product_desc,
					product_image_1: files[0].filename,
					product_image_2: files[1].filename,
					product_code: req.body.product_code,
					product_origin: req.body.product_origin,
					product_price: req.body.product_price,
					product_listed_price: req.body.product_listed_price,
					product_qty: req.body.product_qty,
					product_status: req.body.product_status,
					category_id: req.body.product_category,
					brand_id: req.body.product_brand,
					updatedAt: new Date(),
				});
				fs.unlinkSync("./public/images/product/" + req.body.old_images[0]);
				fs.unlinkSync("./public/images/product/" + req.body.old_images[1]);
				break;
			case 3:
				data.update({
					product_name: req.body.product_name,
					product_desc: req.body.product_desc,
					product_image_1: files[0].filename,
					product_image_2: files[1].filename,
					product_image_3: files[2].filename,
					product_code: req.body.product_code,
					product_origin: req.body.product_origin,
					product_price: req.body.product_price,
					product_listed_price: req.body.product_listed_price,
					product_qty: req.body.product_qty,
					product_status: req.body.product_status,
					category_id: req.body.product_category,
					brand_id: req.body.product_brand,
					updatedAt: new Date(),
				});
				fs.unlinkSync("./public/images/product/" + req.body.old_images[0]);
				fs.unlinkSync("./public/images/product/" + req.body.old_images[1]);
				fs.unlinkSync("./public/images/product/" + req.body.old_images[2]);
				break;
			default:
				data.update({
					product_name: req.body.product_name,
					product_desc: req.body.product_desc,
					product_code: req.body.product_code,
					product_origin: req.body.product_origin,
					product_price: req.body.product_price,
					product_listed_price: req.body.product_listed_price,
					product_qty: req.body.product_qty,
					product_status: req.body.product_status,
					category_id: req.body.product_category,
					brand_id: req.body.product_brand,
					updatedAt: new Date(),
				});
		}

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(422).send({ success: false, message: error });
	}
};
// delete
exports.delete = async (req, res) => {
	const oldImages = req.body;
	const id = req.params.id;

	try {
		const deleteData = await productModel.tbl_product.findByPk(id);
		const data = await productModel.tbl_product.destroy({ where: { id } });
		oldImages.forEach((oldImage) => {
			fs.unlinkSync("./public/images/product/" + oldImage);
		});

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
// getByCategory
exports.getByCategory = async (req, res) => {
	try {
		const data = await productModel.tbl_product.findAll({
			where: { category_id: req.params.id },
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
// search
exports.search = async (req, res) => {
	const str = req.params.str;

	try {
		const data = await productModel.tbl_product.findAll({
			where: {
				product_name: { [op.like]: `%${str}%` },
				product_status: 1,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
// getByAdmin
exports.getAllAdmin = async (req, res) => {
	try {
		const data = await productModel.tbl_product.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
};
