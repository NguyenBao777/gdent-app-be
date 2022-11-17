const tinhthanhphoModel = require("../models/tinhthanhpho.model");
const xaphuongthitranModel = require("../models/xaphuongthitran.model");
const quanhuyenModel = require("../models/quanhuyen.model");
const addressModel = require("../models/address.model");
const vercelCross = require("../config/crosshandler");
// get thanh pho
exports.getThanhpho = async (req, res) => {
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
	try {
		const deleteData = await addressModel.tbl_address.destroy({ where: { id: req.params.id } });
		return res.status(200).send({ success: true, message: "Delete successfuly!" });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Delete false!" });
	}
};
