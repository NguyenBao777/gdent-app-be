const tinhthanhphoModel = require("../models/tinhthanhpho.model");
const xaphuongthitranModel = require("../models/xaphuongthitran.model");
const quanhuyenModel = require("../models/quanhuyen.model");
const addressModel = require("../models/address.model");
// get thanh pho
exports.getThanhpho = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	try {
		const data = await tinhthanhphoModel.tbl_tinhthanhpho.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(400).send({ success: true, message: error });
	}
};
// get thanh pho by id
exports.getThanhphoById = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	try {
		const data = await tinhthanhphoModel.tbl_tinhthanhpho.findByPk(req.params.id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(400).send({ success: true, message: error });
	}
};
// get quan huyen
exports.getQuanhuyen = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	const id = req.params.id;
	try {
		const data = await quanhuyenModel.tbl_quanhuyen.findAll({
			where: {
				matp: id,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(400).send({ success: true, message: error });
	}
};
// get quan huyen by id
exports.getQuanhuyenById = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	try {
		const data = await quanhuyenModel.tbl_quanhuyen.findByPk(req.params.id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(400).send({ success: true, message: error });
	}
};
// get thi tran
exports.getThitran = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	const id = req.params.id;
	try {
		const data = await xaphuongthitranModel.tbl_xaphuongthitran.findAll({
			where: {
				maqh: id,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(400).send({ success: true, message: error });
	}
};
// get thi tran by id
exports.getThitranById = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	try {
		const data = await xaphuongthitranModel.tbl_xaphuongthitran.findByPk(req.params.id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(400).send({ success: true, message: error });
	}
};
// get address
exports.getAddress = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	console.log(req.params.id);
	try {
		const data = await addressModel.tbl_address.findAll({
			where: {
				user_id: req.params.id,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// delete address
exports.delete = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
	try {
		const deleteData = await addressModel.tbl_address.destroy({ where: { id: req.params.id } });
		return res.status(200).send({ success: true, message: "Delete successfuly!" });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Delete false!" });
	}
};
