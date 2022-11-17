const userModel = require("../models/user.model");
const addressModel = require("../models/address.model");
const fs = require("fs");
const md5 = require("md5");
const vercelCross = require("../config/crosshandler");
// login
exports.login = async (req, res) => {
	const username = req.params.user_username;
	const password = md5(req.params.user_userpassword);

	try {
		const result = await userModel.tbl_user.findAll({
			where: {
				user_username: username,
				user_password: password,
			},
			limit: 1,
		});
		if (result.length > 0) {
			return res.status(200).send({ success: true, message: result });
		}

		return res.status(400).send({ success: false, message: "Data not found" });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// register
exports.addNew = async (req, res) => {
	const body = req.body;

	if (!body) {
		res.status(422).send({ success: false, message: "Please enter all fields." });
	}

	const newUser = userModel.tbl_user.build({
		user_name: body.user_name,
		user_username: body.user_username,
		user_password: md5(body.user_password),
		user_phone: null,
		user_image: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	try {
		const result = await newUser.save();
		return res.status(200).send({ success: true });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false });
	}
};
// update
exports.update = async (req, res) => {
	const filename = req?.file?.filename || null;

	try {
		const data = await userModel.tbl_user.findByPk(req.body.user_id);
		if (filename) {
			data.update({
				user_phone: req.body.user_phone,
				user_image: filename,
				updatedAt: new Date(),
			});
			if (req.body.old_image !== null) fs.unlinkSync(`./public/images/user/${req.body.old_image}`);
		} else {
			data.update({
				user_phone: req.body.user_phone,
				updatedAt: new Date(),
			});
		}
		if (req.body.user_address) {
			const newAddress = addressModel.tbl_address.build({
				user_id: req.body.user_id,
				user_address: req.body.user_address,
				tinhthanhpho_id: req.body.tinhthanhpho_id,
				tinhthanhpho_name: req.body.tinhthanhpho_name,
				quanhuyen_id: req.body.quanhuyen_id,
				quanhuyen_name: req.body.quanhuyen_name,
				xaphuongthitran_id: req.body.xaphuongthitran_id,
				xaphuongthitran_name: req.body.xaphuongthitran_name,
				ship_cost: 10000,
			});

			newAddress.save();
		}

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
//check duplicate
exports.checkDulicate = async (req, res) => {
	const username = req.params.username;

	try {
		const data = await userModel.tbl_user.findAll({
			where: { user_username: username },
		});
		if (data.length > 0) {
			return res.status(200).send({ success: true, message: data });
		}

		return res.status(200).send({ success: false, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
