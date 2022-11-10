const md5 = require("md5");
const adminModel = require("../models/admin.model");
const fs = require("fs");
// add new
exports.addNew = async (req, res) => {
	const body = req.body;
	const image = req.file.filename;

	if (!image || !body) {
		res.status(422).send({ success: false, message: "Please enter all fields." });
	}

	const newAdmin = adminModel.tbl_admin.build({
		admin_username: body.admin_username,
		admin_password: md5(body.admin_password),
		admin_phone: body.admin_phone,
		admin_name: body.admin_name,
		admin_role: body.admin_role,
		admin_image: image,
		admin_status: 1,
		admin_onl: "no",
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	try {
		const result = await newAdmin.save();
		return res.status(200).send({ success: true });
	} catch (error) {
		console.log(error);
	}
};
// Login
exports.login = async (req, res) => {
	const username = req.params.username;
	const password = md5(req.params.password);

	try {
		const result = await adminModel.tbl_admin.findOne({
			where: { admin_username: username, admin_password: password },
		});
		if (result) {
			return res.status(200).send({ success: true, message: result });
		} else {
			return res.status(200).send({ success: false, message: result });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
// toggle on/off line
exports.online = async (req, res) => {
	try {
		const data = await adminModel.tbl_admin.findByPk(req.body.id);
		data.update({
			admin_onl: req.body.str,
		});
		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
// check duplicate username
exports.checkDulicate = async (req, res) => {
	const username = req.params.username;

	try {
		const data = await adminModel.tbl_admin.findAll({
			where: { admin_username: username },
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
// get all
exports.getAll = async (req, res) => {
	try {
		const data = await adminModel.tbl_admin.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};

// get admin status
exports.getByStatus = async (req, res) => {
	try {
		const data = await adminModel.tbl_admin.findAll({
			where: {
				admin_status: 1,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};

// delete admin
exports.delete = async (req, res) => {
	const id = req.params.id;
	const oldImage = req.params.filename;
	try {
		const data = await adminModel.tbl_admin.destroy({ where: { id: id } });
		fs.unlinkSync("./public/images/admin/" + oldImage);

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};

//update
exports.update = async (req, res) => {
	try {
		const data = await adminModel.tbl_admin.findByPk(req.body.admin_id);
		if (req.body.admin_password !== "") {
			data.update({
				admin_password: md5(req.body.admin_password),
				admin_role: req.body.admin_role,
			});
		} else {
			data.update({
				admin_role: req.body.admin_role,
			});
		}
		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
