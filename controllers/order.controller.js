const Sequelize = require("sequelize");
const op = Sequelize.Op;

const orderModel = require("../models/order.model");
const orderDetailModel = require("../models/order_detail.model");
const productModel = require("../models/product.model");
const adminModel = require("../models/admin.model");

// add new
exports.addNew = async (req, res) => {
	const orderCode = Date.now() + "GD" + Math.floor(Math.random() * 100);

	try {
		const newOrder = await orderModel.tbl_order.build({
			order_code: orderCode,
			user_id: req.body.user_id,
			order_name: req.body.order_name,
			order_phone: req.body.order_phone,
			order_address: req.body.order_address,
			tinhthanhpho_id: req.body.tinhthanhpho_id,
			tinhthanhpho_name: req.body.tinhthanhpho_name,
			quanhuyen_id: req.body.quanhuyen_id,
			quanhuyen_name: req.body.quanhuyen_name,
			xaphuongthitran_id: req.body.xaphuongthitran_id,
			xaphuongthitran_name: req.body.xaphuongthitran_name,
			order_status: 1,
			shipper_id: null,
			order_total: req.body.order_total,
			payment_method: req.body.payment_method,
			createdAt: new Date(),
			updatedAt: null,
		});
		const result = await newOrder.save();
		const order = await orderModel.tbl_order.findOne({
			where: { order_code: orderCode },
		});
		req.body.cart.forEach((cart) => {
			const newOrderDetail = orderDetailModel.tbl_order_detail.build({
				order_code: orderCode,
				product_id: cart.id,
				product_name: cart.product_name,
				product_image: cart.product_image_1,
				sale_qty: cart.qty,
			});

			const orderDetail = newOrderDetail.save();
		});
		return res.status(200).send({ success: true, message: "success" });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// get all
exports.getAll = async (req, res) => {
	try {
		const data = await orderModel.tbl_order.findAll({
			order: [["id", "DESC"]],
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(400).send({ success: true, message: error });
	}
};
// get details
exports.getDetails = async (req, res) => {
	try {
		const data = await orderDetailModel.tbl_order_detail.findAll({
			where: { order_code: req.params.code },
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(400).send({ success: true, message: error });
	}
};
// get quanhuyen
exports.getQuanhuyen = async (req, res) => {
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
// get by shipper id
exports.getByShipperId = async (req, res) => {
	try {
		const data = await orderModel.tbl_order.findAll({
			where: {
				shipper_id: req.params.id,
			},
			order: [["order_status", "DESC"]],
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// get by code
exports.getByCode = async (req, res) => {
	try {
		const data = await orderModel.tbl_order.findOne({
			where: {
				order_code: req.params.code,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// assigned
exports.assigned = async (req, res) => {
	try {
		const data = await orderModel.tbl_order.findByPk(req.body.order_id);
		data.update({
			shipper_id: req.body.shipper_id,
		});
		const shipper = await adminModel.tbl_admin.findByPk(req.body.shipper_id);
		shipper.update({
			admin_status: 0,
		});
		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// handle order
exports.handleOrder = async (req, res) => {
	try {
		const data = await orderModel.tbl_order.findByPk(req.body.order_id);
		data.update({
			order_status: req.body.order_status,
			updatedAt: new Date(),
		});
		if (req.body.order_status == 0) {
			const shipper = await adminModel.tbl_admin.findByPk(req.body.shipper_id);
			shipper.update({
				admin_status: 1,
			});
			const orderDetail = await orderDetailModel.tbl_order_detail.findAll({
				where: {
					order_code: data.order_code,
				},
			});
			orderDetail.forEach(async (order) => {
				const product = await productModel.tbl_product.findByPk(order.product_id);
				product.update({
					product_qty: (product.product_qty -= order.sale_qty),
					product_sold_qty: (product.product_sold_qty += order.sale_qty),
				});
			});
		}
		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: error });
	}
};
// get total sale
exports.getTotal = async (req, res) => {
	console.log(req.params.from_date);
	try {
		const data = await orderModel.tbl_order.findAll({
			where: {
				order_status: 0,
				updated_at: { [op.between]: [req.params.from_date, req.params.to_date] },
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(400).send({ success: false, message: error });
	}
};
// delete order
exports.delete = async (req, res) => {
	try {
		const deleteData = await orderModel.tbl_order.destroy({
			where: { order_code: req.params.code },
		});
		const deleOrderDetail = await orderDetailModel.tbl_order_detail.destroy({
			where: { order_code: req.params.code },
		});
		return res.status(200).send({ success: true, message: "Data deleted successfully" });
	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: "Data not found" });
	}
};
