const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "./public")));
// Routes middle
// const route = require("./routes/web");
// app.use("/", route);
app.get("/", (req, res) => {
	return res.status(200).send({ message: "server gdent-app" });
});

/******************************** Admin route **************************/
const Sequelize = require("sequelize");
const op = Sequelize.Op;
// models
const adminModel = require("./models/admin.model");
const userModel = require("./models/user.model");
const addressModel = require("./models/address.model");
const tinhthanhphoModel = require("./models/tinhthanhpho.model");
const xaphuongthitranModel = require("./models/xaphuongthitran.model");
const quanhuyenModel = require("./models/quanhuyen.model");
const brandModel = require("./models/brand.model");
const categoryModel = require("./models/category.model");
const contentModel = require("./models/content.model");
const newsModel = require("./models/news.model");
const orderModel = require("./models/order.model");
const orderDetailModel = require("./models/order_detail.model");
const productModel = require("./models/product.model");
const slideModel = require("./models/slide.model");
const md5 = require("md5");
const fs = require("fs");
const adminUploadImg = require("./config/multer/adminMulter");

// register
app.post("/admin/register", adminUploadImg, async (req, res) => {
	const body = req.body;
	const image = req.file.filename;

	if (!image || !body) {
		res.status(200).send({ success: false, message: "Please enter all fields." });
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
});
// login
app.get("/admin/login/:username/:password", async (req, res) => {
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
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
// on/off line
app.put("/admin/updateonl", async (req, res) => {
	try {
		const data = await adminModel.tbl_admin.findByPk(req.body.id);
		data.update({
			admin_onl: req.body.str,
		});
		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
// check duplicate username
app.get("/admin/checkusername/:username", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// get all
app.get("/admin/getall", async (req, res) => {
	try {
		const data = await adminModel.tbl_admin.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: error });
	}
});
// get by status
app.get("/admin/getadminbystatus", async (req, res) => {
	try {
		const data = await adminModel.tbl_admin.findAll({
			where: {
				admin_status: 1,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: error });
	}
});
// delete
app.delete("/admin/delete/:filename/:id", async (req, res) => {
	const id = req.params.id;
	const oldImage = req.params.filename;
	try {
		const data = await adminModel.tbl_admin.destroy({ where: { id: id } });
		fs.unlinkSync("./public/images/admin/" + oldImage);

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
// update
app.put("/edit", async (req, res) => {
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
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
/******************************** User route **************************/
const userController = require("./controllers/user.controller");
const userUploadImg = require("./config/multer/userMulter");
// login
app.get("/user/login/:user_username/:user_userpassword", async (req, res) => {
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

		return res.status(200).send({ success: false, message: "Data not found" });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: error });
	}
});
// register
app.post("/user/registation", async (req, res) => {
	const body = req.body;

	if (!body) {
		res.status(200).send({ success: false, message: "Please enter all fields." });
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
		return res.status(200).send({ success: false });
	}
});
// update
app.put("/user/update", userUploadImg, async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
//check duplicate
app.get("/user/checkusername/:username", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
/******************************** Category route **************************/
const categoryController = require("./controllers/category.controller");
const categoryUploadImg = require("./config/multer/categoryMulter");
// add new
app.post("/category/addnew", categoryUploadImg, async (req, res) => {
	const body = req.body;
	const image = req.file.filename;
	if (!image || !body) {
		res.status(200).send({
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
		return res.status(200).send({ success: false, message: error });
	}
});
// list category
app.get("/category/getall", async (req, res) => {
	try {
		const data = await categoryModel.tbl_category.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// getOne
app.get("/category/getone/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const data = await categoryModel.tbl_category.findByPk(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// update
app.put("/category/update", categoryUploadImg, async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// delete
app.delete("/category/delete/:filename/:id", async (req, res) => {
	const id = req.params.id;
	const oldImage = req.params.filename;
	try {
		const deleteData = await categoryModel.tbl_category.findByPk(id);
		const data = await categoryModel.tbl_category.destroy({ where: { id } });
		fs.unlinkSync("./public/images/category/" + oldImage);

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
/******************************** Brand route **************************/
const brandController = require("./controllers/brand.controller");
const brandUploadImg = require("./config/multer/brandMulter");
// add new
app.post("/brand/addnew", brandUploadImg, async (req, res) => {
	const body = req.body;
	const image = req.file.filename;
	if (!image || !body) {
		res.status(200).send({
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
		return res.status(200).send({ success: false, message: error });
	}
});
// list brand
app.get("/brand/getall/:limit", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// getOne
app.get("/brand/getone", async (req, res) => {
	const id = req.body.id;

	try {
		const data = await brandModel.tbl_brand.findOne(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// update
app.put("/brand/update", brandUploadImg, async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// delete
app.delete("/brand/delete/:filename/:id", async (req, res) => {
	const id = req.params.id;
	const oldImage = req.params.filename;
	try {
		const data = await brandModel.tbl_brand.destroy({ where: { id: id } });
		fs.unlinkSync("./public/images/brand/" + oldImage);

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
/******************************** Product route **************************/
const productController = require("./controllers/product.controller");
const productUploadImg = require("./config/multer/productMulter");
// add new
app.post("/product/addnew", productUploadImg, async (req, res) => {
	const body = req.body;
	console.log(body);
	const image_1 = req.files[0].filename;
	const image_2 = req?.files[1]?.filename || null;
	const image_3 = req?.files[2]?.filename || null;

	if (!image_1 || !body) {
		res.status(200).send({
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
		return res.status(200).send({ success: false, message: error });
	}
});
// list product
app.get("/product/getall", async (req, res) => {
	try {
		const data = await productModel.tbl_product.findAll({ where: { product_status: 1 } });

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// get limit
app.get("/product/getlimit", async (req, res) => {
	try {
		const data = await productModel.tbl_product.findAll({
			where: { product_status: 1 },
			order: [["product_sold_qty", "DESC"]],
			limit: 6,
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});

app.get("/product/getalladmin", async (req, res) => {
	try {
		const data = await productModel.tbl_product.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// getOne
app.get("/product/getone/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const data = await productModel.tbl_product.findByPk(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// update
app.put("/product/update", productUploadImg, async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// delete
app.delete("/product/delete/:id", async (req, res) => {
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
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
// get by category
app.get("/product/getbycategory/:id", async (req, res) => {
	try {
		const data = await productModel.tbl_product.findAll({
			where: { category_id: req.params.id },
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
// search
app.get("/product/search/:str", async (req, res) => {
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
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
/******************************** Order route **************************/
const orderController = require("./controllers/order.controller");
/* ------------------------------------ tinhthanhpho ------------------------------------*/
// get all
app.get("/order/getall", orderController.getAll);
// get details
app.get("/order/orderdetail/:code", async (req, res) => {
	try {
		const data = await orderDetailModel.tbl_order_detail.findAll({
			where: { order_code: req.params.code },
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(200).send({ success: true, message: error });
	}
});
// add new
app.post("/order/addnew", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// get quan huyen
app.get("/order/quanhuyenbyid/:id", async (req, res) => {
	try {
		const data = await quanhuyenModel.tbl_quanhuyen.findByPk(req.params.id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(200).send({ success: true, message: error });
	}
});
// get thi tran
app.get("/order/xaphuongthitran/:id", async (req, res) => {
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

		return res.status(200).send({ success: true, message: error });
	}
});
// get thi tran by id
app.get("/order/xaphuongthitranbyid/:id", async (req, res) => {
	try {
		const data = await xaphuongthitranModel.tbl_xaphuongthitran.findByPk(req.params.id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(200).send({ success: true, message: error });
	}
});

// get address
app.get("/order/getaddress/:id", async (req, res) => {
	try {
		const data = await addressModel.tbl_address.findAll({
			where: {
				user_id: req.params.id,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: error });
	}
});
// get by shipper id
app.get("/order/getbyid/:id", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// get by code
app.get("/order/getbycode/:code", async (req, res) => {
	try {
		const data = await orderModel.tbl_order.findOne({
			where: {
				order_code: req.params.code,
			},
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: error });
	}
});
// assigned
app.put("/order/assigned", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// handle order
app.put("/order/handleorder", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// get total
app.get("/order/gettotal/:from_date/:to_date", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// delete order
app.delete("/order/delete/:code", async (req, res) => {
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
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
// /******************************** News route **************************/
const newsController = require("./controllers/news.controller");
const newsUploadImg = require("./config/multer/newsMulter");
// add new
app.post("/news/addnew", newsUploadImg, async (req, res) => {
	const body = req.body;
	const image = req.file.filename;
	if (!image || !body) {
		res.status(200).send({
			success: "false",
			message: "Please enter whole field.",
		});
	}
	const newNews = newsModel.tbl_news.build({
		news_name: body.news_name,
		news_desc: body.news_desc,
		news_image: image,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	try {
		const result = await newNews.save();

		return res.status(200).send({
			success: true,
			message: result,
		});
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// list news
app.get("/news/getall/:limit", async (req, res) => {
	const limit = req.params.limit;

	if (limit <= 0) {
		try {
			const data = await newsModel.tbl_news.findAll();

			return res.status(200).send({ success: true, message: data });
		} catch (error) {
			return res.status(200).send({ success: false, message: error });
		}
	} else {
		try {
			const { count, rows } = await newsModel.tbl_news.findAndCountAll({
				limit: 4,
			});

			return res.status(200).send({ success: true, message: rows });
		} catch (error) {
			return res.status(200).send({ success: false, message: error });
		}
	}
});
// getOne
app.get("/news/getone/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const data = await newsModel.tbl_news.findByPk(id);
		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: error });
	}
});
// update
app.put("/news/update", newsUploadImg, async (req, res) => {
	const newImage = req?.file?.filename || null;
	const id = req.body.news_id;

	try {
		const data = await newsModel.tbl_news.findByPk(id);
		if (newImage) {
			data.update({
				news_name: req.body.news_name,
				news_desc: req.body.news_desc,
				news_image: newImage,
				updated_at: new Date(),
			});
			fs.unlinkSync("./public/images/news/" + req.body.old_iamge);
		} else {
			data.update({
				news_name: req.body.news_name,
				news_desc: req.body.news_desc,
				updated_at: new Date(),
			});
		}

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: error });
	}
});
// delete
app.delete("/news/delete/:filename/:id", async (req, res) => {
	const id = req.params.id;
	const oldImage = req.params.filename;
	try {
		const deleteData = await newsModel.tbl_news.findByPk(id);
		const data = await newsModel.tbl_news.destroy({ where: { id } });
		fs.unlinkSync("./public/images/news/" + oldImage);

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
/******************************** Content route **************************/
const contentController = require("./controllers/content.controller");
// add new
app.post("/content/addnew", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// list content
app.get("/content/getall", async (req, res) => {
	try {
		const data = await contentModel.tbl_content.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// getOne
app.get("/content/getone", async (req, res) => {
	const id = req.body.id;

	try {
		const data = await contentModel.tbl_content.findOne(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// update
app.put("/content/update", async (req, res) => {
	try {
		const data = await contentModel.tbl_content.findByPk(req.body.content_id);
		data.update({
			content_title: req.body.content_title,

			content_desc: req.body.content_desc,
		});

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: error });
	}
});
// delete
app.delete("/content/delete/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deleteData = await contentModel.tbl_content.findByPk(id);
		const data = await contentModel.tbl_content.destroy({ where: { id } });

		return res.status(200).send({ success: true, message: data /*"Data deleted successfully"*/ });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
/******************************** Slide route **************************/
const slideController = require("./controllers/slide.controller");
const slideUploadImg = require("./config/multer/slideMulter");
// add new
app.post("/slide/addnew", slideUploadImg, async (req, res) => {
	const body = req.body;
	const image = req.file.filename;

	if (!image || !body) {
		res.status(200).send({
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
		return res.status(200).send({ success: false, message: error });
	}
});
// list slide
app.get("/slide/getall/:limit", async (req, res) => {
	const limit = req.body.limit;
	if (limit <= 0) {
		try {
			const data = await slideModel.tbl_slide.findAll();

			return res.status(200).send({ success: true, message: data });
		} catch (error) {
			return res.status(200).send({ success: false, message: error });
		}
	} else {
		try {
			const { count, rows } = await slideModel.tbl_slide.findAndCountAll({
				where: { slide_status: 1 },
				limit: limit,
			});

			return res.status(200).send({ success: true, message: rows });
		} catch (error) {
			return res.status(200).send({ success: false, message: error });
		}
	}
});
// getOne
app.get("/slide/getone", async (req, res) => {
	const id = req.body.id;

	try {
		const data = await slideModel.tbl_slide.findOne(id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(200).send({ success: false, message: error });
	}
});
// update
app.put("/slide/update", slideUploadImg, async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});
// delete
app.delete("/slide/delete/:filename/:id", async (req, res) => {
	const id = req.params.id;
	const oldImage = req.params.filename;
	try {
		const deleteData = await slideModel.tbl_slide.findByPk(id);
		const data = await slideModel.tbl_slide.destroy({ where: { id } });
		fs.unlinkSync("./public/images/slide/" + oldImage);

		return res.status(200).send({ success: true, message: "Data deleted successfully" });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Data not found" });
	}
});
/******************************** Address route **************************/
const addressController = require("./controllers/address.controller");
/// get thanh pho
app.get("/address/tinhthanhpho", async (req, res) => {
	try {
		const data = await tinhthanhphoModel.tbl_tinhthanhpho.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(200).send({ success: true, message: error });
	}
});
// get thanh pho by id
app.get("/address/tinhthanhphobyid/:id", async (req, res) => {
	try {
		const data = await tinhthanhphoModel.tbl_tinhthanhpho.findByPk(req.params.id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(200).send({ success: true, message: error });
	}
});
// get quan huyen
app.get("/address/quanhuyen/:id", async (req, res) => {
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

		return res.status(200).send({ success: true, message: error });
	}
});
// get quan huyen by id
app.get("/address/quanhuyenbyid/:id", async (req, res) => {
	try {
		const data = await quanhuyenModel.tbl_quanhuyen.findByPk(req.params.id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(200).send({ success: true, message: error });
	}
});
// get thi tran
app.get("/address/xaphuongthitran/:id", async (req, res) => {
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

		return res.status(200).send({ success: true, message: error });
	}
});
// get thi tran by id
app.get("/address/xaphuongthitranbyid/:id", async (req, res) => {
	try {
		const data = await xaphuongthitranModel.tbl_xaphuongthitran.findByPk(req.params.id);

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		console.log(error);

		return res.status(200).send({ success: true, message: error });
	}
});

// get address
app.get("/address/getaddress/:id", async (req, res) => {
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
		return res.status(200).send({ success: false, message: error });
	}
});

// delete address
app.delete("/address/detele/:id", async (req, res) => {
	try {
		const deleteData = await addressModel.tbl_address.destroy({ where: { id: req.params.id } });
		return res.status(200).send({ success: true, message: "Delete successfuly!" });
	} catch (error) {
		console.log(error);
		return res.status(200).send({ success: false, message: "Delete false!" });
	}
});

app.listen(4000, () => console.log(`running on port 4000`));
