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
const md5 = require("md5");

// register
app.post("/admin/register", adminUploadImg, async (req, res) => {
	return res.status(200).send({ success: true });
});
// login
app.get("/admin/login/:username/:password", async (req, res) => {
	const username = req.params.username;
	const password = md5(req.params.password);
	const data = {
		id: 103,
		admin_username: "nguyenbao2404",
		admin_password: "a8c2825b5806f00cf13e296a3527ca1d",
		admin_phone: 3455343,
		admin_name: "Bảo Bảo",
		admin_role: "admin",
		admin_status: 1,
		admin_onl: "no",
		admin_image: "admin_profile_1665734389034.jpeg",
		created_at: "2022-10-14",
		updated_at: "2022-11-17",
	};
	return res.status(200).send({ success: true, message: data });
});
// on/off line
app.put("/admin/updateonl", async (req, res) => {
	return res.status(200).send({ success: true, message: "Update Success fully!" });
});
// check duplicate username
app.get("/admin/checkusername/:username", async (req, res) => {
	const username = req.params.username;
	const data = [];
	return res.status(200).send({ success: false, message: data });
});
// get all
app.get("/admin/getall", async (req, res) => {
	const data = [
		{
			id: 103,
			admin_username: "nguyenbao2404",
			admin_password: "a8c2825b5806f00cf13e296a3527ca1d",
			admin_phone: 3455343,
			admin_name: "Bảo Bảo",
			admin_role: "admin",
			admin_status: 1,
			admin_onl: "no",
			admin_image: "admin_profile_1665734389034.jpeg",
			created_at: "2022-10-14",
			updated_at: "2022-11-17",
		},
		{
			id: 104,
			admin_username: "nguyenbao",
			admin_password: "a8c2825b5806f00cf13e296a3527ca1d",
			admin_phone: 3455343,
			admin_name: "Robot AI-01",
			admin_role: "shipper",
			admin_status: 1,
			admin_onl: "no",
			admin_image: "admin_profile_1665907248362.jpeg",
			created_at: "2022-10-16",
			updated_at: "2022-11-17",
		},
		{
			id: 107,
			admin_username: "Phoenix",
			admin_password: "a8c2825b5806f00cf13e296a3527ca1d",
			admin_phone: 342281231,
			admin_name: "baobao",
			admin_role: "shipper",
			admin_status: 1,
			admin_onl: "yes",
			admin_image: "admin_profile_1668679478289.jpeg",
			created_at: "2022-11-17",
			updated_at: "2022-11-17",
		},
	];

	return res.status(200).send({ success: true, message: data });
});
// get by status
app.get("/admin/getadminbystatus", async (req, res) => {
	const data = [
		{
			id: 103,
			admin_username: "nguyenbao2404",
			admin_password: "a8c2825b5806f00cf13e296a3527ca1d",
			admin_phone: 3455343,
			admin_name: "Bảo Bảo",
			admin_role: "admin",
			admin_status: 1,
			admin_onl: "no",
			admin_image: "admin_profile_1665734389034.jpeg",
			created_at: "2022-10-14",
			updated_at: "2022-11-17",
		},
		{
			id: 104,
			admin_username: "nguyenbao",
			admin_password: "a8c2825b5806f00cf13e296a3527ca1d",
			admin_phone: 3455343,
			admin_name: "Robot AI-01",
			admin_role: "shipper",
			admin_status: 1,
			admin_onl: "no",
			admin_image: "admin_profile_1665907248362.jpeg",
			created_at: "2022-10-16",
			updated_at: "2022-11-17",
		},
		{
			id: 107,
			admin_username: "Phoenix",
			admin_password: "a8c2825b5806f00cf13e296a3527ca1d",
			admin_phone: 342281231,
			admin_name: "baobao",
			admin_role: "shipper",
			admin_status: 1,
			admin_onl: "yes",
			admin_image: "admin_profile_1668679478289.jpeg",
			created_at: "2022-11-17",
			updated_at: "2022-11-17",
		},
	];

	return res.status(200).send({ success: true, message: data });
});
// delete
app.delete("/admin/delete/:filename/:id", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data deleted successfully" });
});
// update
app.put("/admin/edit", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data update successfully" });
});
/******************************** User route **************************/
// login
app.get("/user/login/:user_username/:user_userpassword", async (req, res) => {
	const username = req.params.user_username;
	const password = md5(req.params.user_userpassword);
	const result = [
		{
			id: 2,
			user_name: "Bảo Bảo",
			user_username: "baovippro01",
			user_password: "a8c2825b5806f00cf13e296a3527ca1d",
			user_image: "user_profile_1666498595091.jpeg",
			user_phone: "0342281231",
			created_at: "2022-10-01",
			updated_at: "2022-10-23",
		},
	];

	return res.status(200).send({ success: false, message: result });
});
// register
app.post("/user/registation", async (req, res) => {
	return res.status(200).send({ success: true });
});
// update
app.put("/user/update", async (req, res) => {
	return res.status(200).send({ success: true, message: "Update Successfully!" });
});
//check duplicate
app.get("/user/checkusername/:username", async (req, res) => {
	const username = req.params.username;

	const data = [];

	return res.status(200).send({ success: false, message: data });
});
/******************************** Category route **************************/

// add new
app.post("/category/addnew", async (req, res) => {
	return res.status(200).send({
		success: true,
		message: "Data added successfully!",
	});
});
// list category
app.get("/category/getall", async (req, res) => {
	const data = [
		{
			id: 17,
			category_name: "Kỹ thuật số",
			category_desc: "Kỹ thuật số",
			category_status: 1,
			category_image: "category_image_1665197632797.jpeg",
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 18,
			category_name: "Vật liệu",
			category_desc: "Vật liệu",
			category_status: 1,
			category_image: "category_image_1665197677482.jpeg",
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 19,
			category_name: "Implant",
			category_desc: "Implant",
			category_status: 1,
			category_image: "category_image_1665197716930.jpeg",
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 20,
			category_name: "Chỉnh nha",
			category_desc: "Chỉnh nha",
			category_status: 1,
			category_image: "category_image_1665197777510.jpeg",
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 21,
			category_name: "Thiết bị",
			category_desc: "Thiết bị",
			category_status: 1,
			category_image: "category_image_1665197844826.jpeg",
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 22,
			category_name: "Thiết bị labo",
			category_desc: "Thiết bị labo",
			category_status: 1,
			category_image: "category_image_1665197894225.png",
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 23,
			category_name: "Hệ thống CAD/CAM",
			category_desc: "Hệ thống CAD/CAM",
			category_status: 1,
			category_image: "category_image_1665197928895.jpeg",
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
	];

	return res.status(200).send({ success: true, message: data });
});
// getOne
app.get("/category/getone/:id", async (req, res) => {
	const data = {
		id: 17,
		category_name: "Kỹ thuật số",
		category_desc: "Kỹ thuật số",
		category_status: 1,
		category_image: "category_image_1665197632797.jpeg",
		created_at: "2022-10-08",
		updated_at: "2022-10-08",
	};

	return res.status(200).send({ success: true, message: data });
});
// update
app.put("/category/update", async (req, res) => {
	return res.status(200).send({ success: true, message: "Updated Sucessfully!" });
});
// delete
app.delete("/category/delete/:filename/:id", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data deleted successfully" });
});
/******************************** Brand route **************************/

// add new
app.post("/brand/addnew", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data added successfully!" });
});
// list brand
app.get("/brand/getall/:limit", async (req, res) => {
	const limit = Number(req.params.limit);

	if (limit > 0) {
		const data = [
			{
				id: 4,
				brand_name: "3Shape",
				brand_desc:
					"3Shape là nhà phát triển và sản xuất máy quét 3D và phần mềm CAD / CAM cho ngành nha khoa và âm thanh có trụ sở tại Copenhagen, Đan Mạch. Công ty có cơ sở sản xuất và văn phòng tại Trung Quốc, Châu Âu, Châu Mỹ Latinh và Hoa Kỳ.",
				brand_status: 1,
				brand_image: "brand_image_1665195555983.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 5,
				brand_name: "Roland",
				brand_desc: "thương hiệu Nhật Bản",
				brand_status: 1,
				brand_image: "brand_image_1665195866225.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 6,
				brand_name: "Doowonid ",
				brand_desc: "Thương hiệu Hàn Quốc",
				brand_status: 1,
				brand_image: "brand_image_1665195985706.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 7,
				brand_name: "KEYSTONE DENTAL",
				brand_desc: "Ngày thành lập: 2006\r\nCông ty con: Osteon Medical Pty Ltd, Keystone Dental Spa",
				brand_status: 1,
				brand_image: "brand_image_1665196112427.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
		];
		return res.status(200).send({ success: true, message: data });
	} else {
		const data = [
			{
				id: 4,
				brand_name: "3Shape",
				brand_desc:
					"3Shape là nhà phát triển và sản xuất máy quét 3D và phần mềm CAD / CAM cho ngành nha khoa và âm thanh có trụ sở tại Copenhagen, Đan Mạch. Công ty có cơ sở sản xuất và văn phòng tại Trung Quốc, Châu Âu, Châu Mỹ Latinh và Hoa Kỳ.",
				brand_status: 1,
				brand_image: "brand_image_1665195555983.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 5,
				brand_name: "Roland",
				brand_desc: "thương hiệu Nhật Bản",
				brand_status: 1,
				brand_image: "brand_image_1665195866225.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 6,
				brand_name: "Doowonid ",
				brand_desc: "Thương hiệu Hàn Quốc",
				brand_status: 1,
				brand_image: "brand_image_1665195985706.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 7,
				brand_name: "KEYSTONE DENTAL",
				brand_desc: "Ngày thành lập: 2006\r\nCông ty con: Osteon Medical Pty Ltd, Keystone Dental Spa",
				brand_status: 1,
				brand_image: "brand_image_1665196112427.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 8,
				brand_name: "HI-TEC IMPLANTS ",
				brand_desc: "Nhà cung cấp dịch vụ cấy ghép răng ở Herzliya, Israel",
				brand_status: 1,
				brand_image: "brand_image_1665196205551.png",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 9,
				brand_name: "Morelli ",
				brand_desc:
					"Morelli Orthodontic là công ty tiên phong trong việc sản xuất và cung cấp các sản phẩm vật liệu chỉnh nha tại Brazil. Các sản phẩm chỉnh nha của Morelli đã góp phần thay đổi nụ cười của hàng triệu người Brazil và trên 30 quốc gia trên thế giới. Công ty Mo",
				brand_status: 1,
				brand_image: "brand_image_1665196317008.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 10,
				brand_name: "STERLINK",
				brand_desc: "Xuất xứ : Hàn Quốc",
				brand_status: 1,
				brand_image: "brand_image_1665196526657.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 11,
				brand_name: "88DENT ",
				brand_desc: "Cửa hàng đồ nha khoa ở Pero, Milano, Italy",
				brand_status: 1,
				brand_image: "brand_image_1665196635890.png",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 12,
				brand_name: "Smaco ",
				brand_desc: "Xuất xứ : Trung Quốc",
				brand_status: 1,
				brand_image: "brand_image_1665196728238.png",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 13,
				brand_name: "KDF",
				brand_desc: "Xuất xứ : Nhật Bản",
				brand_status: 1,
				brand_image: "brand_image_1665196938022.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 14,
				brand_name: "Formlabs",
				brand_desc:
					"Formlabs là nhà phát triển và sản xuất công nghệ in 3D. Công ty có trụ sở tại Somerville, Massachusetts được thành lập vào tháng 9 năm 2011 bởi ba sinh viên MIT Media Lab. Công ty phát triển và sản xuất máy in 3D và phần mềm và vật tư tiêu hao có liên qua",
				brand_status: 1,
				brand_image: "brand_image_1665197035970.jpeg",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
			{
				id: 15,
				brand_name: "Ackuretta ",
				brand_desc: "ACKURETTA TECHNOLOGIES PVT. LTD.",
				brand_status: 1,
				brand_image: "brand_image_1665197168432.png",
				created_at: "2022-10-08",
				updated_at: "2022-10-08",
			},
		];

		return res.status(200).send({ success: true, message: data });
	}
});
// getOne
app.get("/brand/getone", async (req, res) => {
	const data = {
		id: 4,
		brand_name: "3Shape",
		brand_desc:
			"3Shape là nhà phát triển và sản xuất máy quét 3D và phần mềm CAD / CAM cho ngành nha khoa và âm thanh có trụ sở tại Copenhagen, Đan Mạch. Công ty có cơ sở sản xuất và văn phòng tại Trung Quốc, Châu Âu, Châu Mỹ Latinh và Hoa Kỳ.",
		brand_status: 1,
		brand_image: "brand_image_1665195555983.jpeg",
		created_at: "2022-10-08",
		updated_at: "2022-10-08",
	};

	return res.status(200).send({ success: true, message: data });
});
// update
app.put("/brand/update", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data updated successfully!" });
});
// delete
app.delete("/brand/delete/:filename/:id", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data deleted successfully" });
});
/******************************** Product route **************************/
// add new
app.post("/product/addnew", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data added successfully!" });
});
// list product
app.get("/product/getall", async (req, res) => {
	const data = [
		{
			id: 15,
			product_name: "Máy scan TRIOS 3 Pod",
			product_desc:
				"Tốc độ scan nhanh hơn 79% so với những hãng khác. Tốc độ scan nhanh hơn 39% so với model trước đó TRIOS color: Bắt hơn 1000 ảnh trên/giây",
			product_image_1: "product_image_1665198398194.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 537300000,
			product_listed_price: 537300000,
			product_qty: 10,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Đan Mạch",
			product_code: "Trios 3 Pod",
			brand_id: 4,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 16,
			product_name: "Máy scan TRIOS 3 Wireless",
			product_desc:
				"Tốc độ scan nhanh hơn 79% so với những hãng khác. Tốc độ scan nhanh hơn 39% so với model trước đó TRIOS color: Bắt hơn 1000 ảnh trên/giây",
			product_image_1: "product_image_1665198541488.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 801900000,
			product_listed_price: 798999999,
			product_qty: 49,
			product_sold_qty: 54,
			product_status: 1,
			product_origin: "Đan Mạch",
			product_code: "Trios 3 Wireless",
			brand_id: 4,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-18",
		},
		{
			id: 17,
			product_name: "Trios 3 Move",
			product_desc:
				"Tốc độ scan nhanh hơn 79% so với những hãng khác. Tốc độ scan nhanh hơn 39% so với model trước đó TRIOS color: Bắt hơn 1000 ảnh trên/giây",
			product_image_1: "product_image_1665198744628.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 621010000,
			product_listed_price: 618621499,
			product_qty: 66,
			product_sold_qty: 36,
			product_status: 1,
			product_origin: "Đan Mạch",
			product_code: "Trios 3 Move",
			brand_id: 4,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-18",
		},
		{
			id: 18,
			product_name: "Máy Cắt",
			product_desc:
				"DGSHAPE DWX-42W là máy cắt ướt , cắt được các loại vật liệu như Glass Ceramic, composite resin với độ chính xác cao.",
			product_image_1: "product_image_1665199016792.jpeg",
			product_image_2: "product_image_1665199021087.jpeg",
			product_image_3: "product_image_1665199021099.jpeg",
			product_price: 2147483647,
			product_listed_price: 990000000,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Nhật Bản",
			product_code: "DWX-42",
			brand_id: 5,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 19,
			product_name: "Arum 5x-300",
			product_desc:
				"Vật liệu: Zirconia, Lithium disilicate (E-max®, etc.), Nano composite (VericomMazic® duro, Lava Ultimate® etc.), PMMA, Wax, PEEK…..",
			product_image_1: "product_image_1665199160425.jpeg",
			product_image_2: "product_image_1665199160513.jpeg",
			product_image_3: "product_image_1665199160660.jpeg",
			product_price: 752000000,
			product_listed_price: 752000000,
			product_qty: 97,
			product_sold_qty: 3,
			product_status: 1,
			product_origin: "Hàn Quốc",
			product_code: "5x-300",
			brand_id: 6,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-18",
		},
		{
			id: 20,
			product_name: "IMPLANT PRIMA",
			product_desc: "Ứng dụng tốt nhất cho xương loại I, II, III, với bề mặt sử lý RBM",
			product_image_1: "product_image_1665199366263.jpeg",
			product_image_2: "product_image_1665199370425.jpeg",
			product_image_3: "product_image_1665199370426.jpeg",
			product_price: 812090,
			product_listed_price: 812089,
			product_qty: 97,
			product_sold_qty: 3,
			product_status: 1,
			product_origin: "USA",
			product_code: "PRIMA",
			brand_id: 7,
			category_id: 19,
			created_at: "2022-10-08",
			updated_at: "2022-10-18",
		},
		{
			id: 21,
			product_name: "IMPLANT HI-TEC",
			product_desc: "Ứng dụng tốt nhất cho xương loại II, III, IV, xử lý bề mặt SLA.",
			product_image_1: "product_image_1665199649322.jpeg",
			product_image_2: "product_image_1665199649322.jpeg",
			product_image_3: "product_image_1665199649323.jpeg",
			product_price: 213770750,
			product_listed_price: 213770749,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "ISRAEL",
			product_code: "HI-TEC",
			brand_id: 8,
			category_id: 19,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 22,
			product_name: "MẮC CÀI SỨ TỰ BUỘC",
			product_desc: "Mã sản phẩm: 10.12.900",
			product_image_1: "product_image_1665199931548.jpeg",
			product_image_2: "product_image_1665199931580.jpeg",
			product_image_3: "product_image_1665199931683.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.12.900",
			brand_id: 9,
			category_id: 19,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 23,
			product_name: "MẮC CÀI KIM LOẠI TỰ BUỘC SLI",
			product_desc: "Mã sản phẩm: 10.14.900",
			product_image_1: "product_image_1665200036395.jpeg",
			product_image_2: "product_image_1665200036460.jpeg",
			product_image_3: "product_image_1665200036546.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.14.900",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 24,
			product_name: "MẮC CÀI KIM LOẠI ACTUAL",
			product_desc: "Mã sản phẩm: 10.11.900",
			product_image_1: "product_image_1665200131050.jpeg",
			product_image_2: "product_image_1665200131051.jpeg",
			product_image_3: "product_image_1665200131438.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.11.900",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 25,
			product_name: "MẮC CÀI KIM LOẠI NANO",
			product_desc: "Mã sản phẩm: 10.15.906",
			product_image_1: "product_image_1665200245146.jpeg",
			product_image_2: "product_image_1665200245147.jpeg",
			product_image_3: "product_image_1665200249549.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.15.906",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 26,
			product_name: "MẮC CÀI KIM LOẠI MONOBLOC",
			product_desc: "Mã sản phẩm: 10.15.901",
			product_image_1: "product_image_1665200364138.jpeg",
			product_image_2: "product_image_1665200364139.jpeg",
			product_image_3: "product_image_1665200364213.jpeg",
			product_price: 650000,
			product_listed_price: 650000,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.15.901",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 27,
			product_name: "MẮC CÀI KIM LOẠI MAX",
			product_desc: "Mã sản phẩm: 10.15.903",
			product_image_1: "product_image_1665200444400.jpeg",
			product_image_2: "product_image_1665200444402.jpeg",
			product_image_3: "product_image_1665200448683.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.15.903",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 28,
			product_name: "MẮC CÀI COMPOSITE",
			product_desc: "Mã sản phẩm: 10.17.901",
			product_image_1: "product_image_1665200519668.jpeg",
			product_image_2: "product_image_1665200519669.jpeg",
			product_image_3: "product_image_1665200520026.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.17.901",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 29,
			product_name: "MẮC CÀI SỨ",
			product_desc: "Mã sản phẩm: 10.11.900",
			product_image_1: "product_image_1665200610329.jpeg",
			product_image_2: "product_image_1665200610329.jpeg",
			product_image_3: "product_image_1665200610331.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.11.900",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 30,
			product_name: "MẮC CÀI KIM LOẠI LIGHT",
			product_desc: "Mã sản phẩm: 10.35.903",
			product_image_1: "product_image_1665223655008.jpeg",
			product_image_2: "product_image_1665200714542.jpeg",
			product_image_3: "product_image_1665200718921.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.35.903",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 31,
			product_name: "MẮC CÀI KIM LOẠI LIGHT",
			product_desc: "Mã sản phẩm: 10.10.979",
			product_image_1: "product_image_1665200805184.jpeg",
			product_image_2: "product_image_1665200805559.jpeg",
			product_image_3: "product_image_1665200805656.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.10.979",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 32,
			product_name: "MẮC CÀI KIM LOẠI LIGHT",
			product_desc: "Mã sản phẩm: 10.10.978",
			product_image_1: "product_image_1665200888452.jpeg",
			product_image_2: "product_image_1665200888454.jpeg",
			product_image_3: "product_image_1665200892859.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Brazil",
			product_code: "10.10.978",
			brand_id: 9,
			category_id: 20,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 33,
			product_name: "FPS-15s Plus",
			product_desc:
				"Nồi tiệt trùng nhanh STERLINK FPS 15S là sản phẩm của hãng Plasmapp. Đây là sản phẩm bao gồm nhiều tính năng nổi bật giúp cho quá trình tiệt trùng nhanh hơn 10 lần, với thiết kế nhỏ gọn, hoạt động linh hoạt ở hai chế độ và hệ thống quản lý thông minh (ITS)",
			product_image_1: "product_image_1665201000413.jpeg",
			product_image_2: "product_image_1665201000414.jpeg",
			product_image_3: "product_image_1665201000805.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Hàn Quốc",
			product_code: " PM-8419.20.0000",
			brand_id: 10,
			category_id: 21,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 34,
			product_name: "Pocket Laser Advanced Kit PL-ADV-PLD6W",
			product_desc:
				"Pocket Laser là thiết bị phẫu thuật trong nha khoa sử dụng công nghệ Diode Lazer điều khiển bằng màn hình cảm ứng. ",
			product_image_1: "product_image_1665201083389.jpeg",
			product_image_2: "product_image_1665201083389.jpeg",
			product_image_3: "product_image_1665201087553.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Italia",
			product_code: "88-L09PLD06",
			brand_id: 11,
			category_id: 21,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 35,
			product_name: "Curing light Deep Blue SLC-8D",
			product_desc:
				'DEEP BLUE Thực sự là một thiết bị “xanh" được sản xuất theo tiêu chuẩn Châu Âu thân thiện với môi trường. Với mục đích bảo vệ môi trường, SMACO sử dụng nhựa có thể tái chế lại để sản xuất đèn quang',
			product_image_1: "product_image_1665223706795.jpeg",
			product_image_2: "product_image_1665201159608.jpeg",
			product_image_3: "product_image_1665201159610.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Trung Quốc",
			product_code: "HZ-L8D0F6D100",
			brand_id: 12,
			category_id: 21,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 36,
			product_name: "Máy cạo vôi di động có đèn",
			product_desc:
				"Máy cạo vôi .JADE S2 được thiết kế và chế tạo hoàn toàn bởi tập đoàn EMS, Thụy Sĩ - một nơi phát minh ra công nghệ Piezon.Là một công ty thuộc sở hữu của tập đoàn EMS, SMACO được kế thừa bề dày kinh nghiệm, kiến thức và công nghệ hàng đầu của EMS.",
			product_image_1: "product_image_1665201245156.jpeg",
			product_image_2: "product_image_1665201245157.jpeg",
			product_image_3: "product_image_1665201245158.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 99,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Trung Quốc",
			product_code: "HZ-JS20F6D500",
			brand_id: 12,
			category_id: 21,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 37,
			product_name: "Máy Nướng Sứ",
			product_desc:
				"Sản phẩm sứ sẽ là tuyệt vời sau khi nướng bởi máy nướng sứ KDF, 1 dòng máy với công nghệ cao và kích thước vô cùng nhỏ gọn.",
			product_image_1: "product_image_1665201360926.jpeg",
			product_image_2: "product_image_1665201360926.jpeg",
			product_image_3: null,
			product_price: 0,
			product_listed_price: 0,
			product_qty: 99,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Nhật Bản",
			product_code: "Master Plus",
			brand_id: 13,
			category_id: 22,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 38,
			product_name: "Máy in 3D",
			product_desc:
				"Máy in 3D Form2 sử dụng công nghệ in SLA ( Stereolithography) độ chính xác cao và bề mặc in hoàn hảo.\r\nĐiều khiển bằng màn hình cảm ứng và hệ thống nặp mực in tự động.",
			product_image_1: "product_image_1665201457604.jpeg",
			product_image_2: "product_image_1665201461928.jpeg",
			product_image_3: "product_image_1665201462028.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Mỹ",
			product_code: "Form 2",
			brand_id: 14,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 39,
			product_name: "Máy in 3D",
			product_desc:
				"Máy in 3D Ackuray A135 của hãng Ackuray – ĐÀI LOAN, sử dụng công nghệ DLP với tốc độ in nhanh , kích thước bản in lớn thiết kế lý tưởng cho bản in nha khoa bề mặc in mịn, rõ nét đến từng chi tiết. ",
			product_image_1: "product_image_1665201547725.jpeg",
			product_image_2: "product_image_1665201548096.jpeg",
			product_image_3: "product_image_1665201548097.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Đài Loan",
			product_code: "Ackuray A135",
			brand_id: 15,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 40,
			product_name: "MÁY IN 3D",
			product_desc: "Công suât in 4cm.hr, với hệ thống vật liệu mở và In được nhiều loại vật liệu",
			product_image_1: "product_image_1665201609402.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Đài Loan",
			product_code: "Ackuray A135",
			brand_id: 15,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 41,
			product_name: "MÁY SCAN E4",
			product_desc:
				"Máy Scan E4 là model mới nhất Scan Lab của hãng 3shape trong năm 2019 gấp đôi Cameras tăng tốc độ quét lên gấp 2 lần so với E3, và độ chính xác cũng tăng gấp 2 lần.",
			product_image_1: "product_image_1665201676598.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Đan Mạch",
			product_code: "E4",
			brand_id: 4,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 42,
			product_name: "MÁY SCAN E1",
			product_desc:
				"Với máy scan E1, 3Shape đã đưa hệ thống CAD/CAM đến với mọi lab từ qui mô nhỏ đến lớn với chi phí thấp và giải pháp tốt nhất.",
			product_image_1: "product_image_1665201755773.jpeg",
			product_image_2: "product_image_1665201755773.jpeg",
			product_image_3: "product_image_1665201755775.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Đan Mạch",
			product_code: "E1",
			brand_id: 4,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 43,
			product_name: "Máy Cắt",
			product_desc:
				"DWX -52 là model mới nhất của hãng roland. Sản phẩm vẫn giữa nguyên các tính năng nổi bật của thế hệ trước và phát triển thêm tính năng mới mang lại hiệu quả cao hơn cho người dung.",
			product_image_1: "product_image_1665202031070.jpeg",
			product_image_2: "product_image_1665202035332.jpeg",
			product_image_3: "product_image_1665202035403.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Nhật Bản",
			product_code: "DWX 52D",
			brand_id: 5,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 44,
			product_name: "Arum 4x 100",
			product_desc: "Tính năng nổi bật: Mài được Customized Abutment kim loại. Mài được 4 trục đồng thời",
			product_image_1: "product_image_1665202166066.jpeg",
			product_image_2: "product_image_1665202166066.jpeg",
			product_image_3: "product_image_1665202166210.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Hàn Quốc",
			product_code: "4x 100",
			brand_id: 6,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 45,
			product_name: "Arum 5x 200",
			product_desc:
				"Công suất spindle lớn, lên đến 3kW. Có thể cắt được nhiều loại vật liệu như: Zirconia, Co – Cr, Glassceramic, Pre – Milled Blank (Titanium). ",
			product_image_1: "product_image_1665202278212.jpeg",
			product_image_2: "product_image_1665202282466.jpeg",
			product_image_3: "product_image_1665202282677.jpeg",
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Hàn Quốc",
			product_code: "5x 200",
			brand_id: 6,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 46,
			product_name: "Lò Nung Nhanh",
			product_desc:
				"Lò nung nhanh  Zircom  của hãng KDF – Nhật bản với thiết kế nhỏ gọn và năng xuất hoạt động cao lò nung có  thể nung cùng lúc 75 đơn vị với 3 chén nung xếp chồng lên nhau.",
			product_image_1: "product_image_1665202376135.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 0,
			product_listed_price: 0,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Nhật Bản",
			product_code: "Zircom",
			brand_id: 13,
			category_id: 23,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
	];

	return res.status(200).send({ success: true, message: data });
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
app.put("/product/update", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data updated successfully!" });
});
// delete
app.delete("/product/delete/:id", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data deleted successfully" });
});
// get by category
app.get("/product/getbycategory/:id", async (req, res) => {
	const data = [
		{
			id: 15,
			product_name: "Máy scan TRIOS 3 Pod",
			product_desc:
				"Tốc độ scan nhanh hơn 79% so với những hãng khác. Tốc độ scan nhanh hơn 39% so với model trước đó TRIOS color: Bắt hơn 1000 ảnh trên/giây",
			product_image_1: "product_image_1665198398194.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 537300000,
			product_listed_price: 537300000,
			product_qty: 10,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Đan Mạch",
			product_code: "Trios 3 Pod",
			brand_id: 4,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 16,
			product_name: "Máy scan TRIOS 3 Wireless",
			product_desc:
				"Tốc độ scan nhanh hơn 79% so với những hãng khác. Tốc độ scan nhanh hơn 39% so với model trước đó TRIOS color: Bắt hơn 1000 ảnh trên/giây",
			product_image_1: "product_image_1665198541488.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 801900000,
			product_listed_price: 798999999,
			product_qty: 49,
			product_sold_qty: 54,
			product_status: 1,
			product_origin: "Đan Mạch",
			product_code: "Trios 3 Wireless",
			brand_id: 4,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-18",
		},
		{
			id: 17,
			product_name: "Trios 3 Move",
			product_desc:
				"Tốc độ scan nhanh hơn 79% so với những hãng khác. Tốc độ scan nhanh hơn 39% so với model trước đó TRIOS color: Bắt hơn 1000 ảnh trên/giây",
			product_image_1: "product_image_1665198744628.jpeg",
			product_image_2: null,
			product_image_3: null,
			product_price: 621010000,
			product_listed_price: 618621499,
			product_qty: 66,
			product_sold_qty: 36,
			product_status: 1,
			product_origin: "Đan Mạch",
			product_code: "Trios 3 Move",
			brand_id: 4,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-18",
		},
		{
			id: 18,
			product_name: "Máy Cắt",
			product_desc:
				"DGSHAPE DWX-42W là máy cắt ướt , cắt được các loại vật liệu như Glass Ceramic, composite resin với độ chính xác cao.",
			product_image_1: "product_image_1665199016792.jpeg",
			product_image_2: "product_image_1665199021087.jpeg",
			product_image_3: "product_image_1665199021099.jpeg",
			product_price: 2147483647,
			product_listed_price: 990000000,
			product_qty: 100,
			product_sold_qty: null,
			product_status: 1,
			product_origin: "Nhật Bản",
			product_code: "DWX-42",
			brand_id: 5,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-08",
		},
		{
			id: 19,
			product_name: "Arum 5x-300",
			product_desc:
				"Vật liệu: Zirconia, Lithium disilicate (E-max®, etc.), Nano composite (VericomMazic® duro, Lava Ultimate® etc.), PMMA, Wax, PEEK…..",
			product_image_1: "product_image_1665199160425.jpeg",
			product_image_2: "product_image_1665199160513.jpeg",
			product_image_3: "product_image_1665199160660.jpeg",
			product_price: 752000000,
			product_listed_price: 752000000,
			product_qty: 97,
			product_sold_qty: 3,
			product_status: 1,
			product_origin: "Hàn Quốc",
			product_code: "5x-300",
			brand_id: 6,
			category_id: 17,
			created_at: "2022-10-08",
			updated_at: "2022-10-18",
		},
	];

	return res.status(200).send({ success: true, message: data });
});
// search
app.get("/product/search/:str", async (req, res) => {
	const data = [];

	return res.status(200).send({ success: true, message: data });
});
/******************************** Order route **************************/

/* ------------------------------------ tinhthanhpho ------------------------------------*/
// get all
app.get("/order/getall", async (req, res) => {
	const data = [
		{
			id: 10,
			order_code: "1666532286953GD20",
			user_id: 2,
			order_name: "Bảo Bảo",
			order_phone: "0342281231",
			order_address: "ưewq",
			tinhthanhpho_id: 26,
			tinhthanhpho_name: "Tỉnh Vĩnh Phúc",
			quanhuyen_id: 246,
			quanhuyen_name: "Huyện Lập Thạch",
			xaphuongthitran_id: 8842,
			xaphuongthitran_name: "Xã Tiên Lữ",
			order_status: 1,
			shipper_id: null,
			order_total: 2147483647,
			payment_method: "COD",
			created_at: "2022-10-23",
			updated_at: "2022-10-23",
		},
		{
			id: 9,
			order_code: "1666069684385GD93",
			user_id: 2,
			order_name: "Bảo Bảo",
			order_phone: "0342281231",
			order_address: "ưewq",
			tinhthanhpho_id: 26,
			tinhthanhpho_name: "Tỉnh Vĩnh Phúc",
			quanhuyen_id: 246,
			quanhuyen_name: "Huyện Lập Thạch",
			xaphuongthitran_id: 8842,
			xaphuongthitran_name: "Xã Tiên Lữ",
			order_status: 1,
			shipper_id: null,
			order_total: 2147483647,
			payment_method: "COD",
			created_at: "2022-10-18",
			updated_at: "2022-10-18",
		},
		{
			id: 8,
			order_code: "1666060994680GD29",
			user_id: null,
			order_name: "Bảo Bảo",
			order_phone: "0342281231",
			order_address: "58/1k",
			tinhthanhpho_id: 24,
			tinhthanhpho_name: "Tỉnh Bắc Giang",
			quanhuyen_id: 221,
			quanhuyen_name: "Huyện Yên Dũng",
			xaphuongthitran_id: 7735,
			xaphuongthitran_name: "Xã Đức Giang",
			order_status: 0,
			shipper_id: 104,
			order_total: 2147483647,
			payment_method: "COD",
			created_at: "2022-10-18",
			updated_at: "2022-10-18",
		},
		{
			id: 7,
			order_code: "1665909772896GD48",
			user_id: null,
			order_name: "Nguyen Bao",
			order_phone: "934304324",
			order_address: "adad",
			tinhthanhpho_id: 20,
			tinhthanhpho_name: "Tỉnh Lạng Sơn",
			quanhuyen_id: 182,
			quanhuyen_name: "Huyện Văn Lãng",
			xaphuongthitran_id: 6169,
			xaphuongthitran_name: "Xã Nam La",
			order_status: 0,
			shipper_id: 104,
			order_total: 2147483647,
			payment_method: "COD",
			created_at: "2022-10-16",
			updated_at: "2022-10-18",
		},
	];

	return res.status(200).send({ success: true, message: data });
});
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
	return res.status(200).send({ success: true, message: "success" });
});
// get quan huyen
app.get("/order/quanhuyenbyid/:id", async (req, res) => {
	const data = { id: 17, name: "Huyện Đông Anh", type: "Huyện", matp: 1 };

	return res.status(200).send({ success: true, message: data });
});
// get thi tran
app.get("/order/xaphuongthitran/:id", async (req, res) => {
	const data = [
		{ id: 454, name: "Thị trấn Đông Anh", type: "Thị trấn", maqh: 17 },
		{ id: 457, name: "Xã Xuân Nộn", type: "Xã", maqh: 17 },
		{ id: 460, name: "Xã Thuỵ Lâm", type: "Xã", maqh: 17 },
		{ id: 463, name: "Xã Bắc Hồng", type: "Xã", maqh: 17 },
		{ id: 466, name: "Xã Nguyên Khê", type: "Xã", maqh: 17 },
		{ id: 469, name: "Xã Nam Hồng", type: "Xã", maqh: 17 },
		{ id: 472, name: "Xã Tiên Dương", type: "Xã", maqh: 17 },
		{ id: 475, name: "Xã Vân Hà", type: "Xã", maqh: 17 },
		{ id: 478, name: "Xã Uy Nỗ", type: "Xã", maqh: 17 },
		{ id: 481, name: "Xã Vân Nội", type: "Xã", maqh: 17 },
		{ id: 484, name: "Xã Liên Hà", type: "Xã", maqh: 17 },
		{ id: 487, name: "Xã Việt Hùng", type: "Xã", maqh: 17 },
		{ id: 490, name: "Xã Kim Nỗ", type: "Xã", maqh: 17 },
		{ id: 493, name: "Xã Kim Chung", type: "Xã", maqh: 17 },
		{ id: 496, name: "Xã Dục Tú", type: "Xã", maqh: 17 },
		{ id: 499, name: "Xã Đại Mạch", type: "Xã", maqh: 17 },
		{ id: 502, name: "Xã Vĩnh Ngọc", type: "Xã", maqh: 17 },
		{ id: 505, name: "Xã Cổ Loa", type: "Xã", maqh: 17 },
		{ id: 508, name: "Xã Hải Bối", type: "Xã", maqh: 17 },
		{ id: 511, name: "Xã Xuân Canh", type: "Xã", maqh: 17 },
		{ id: 514, name: "Xã Võng La", type: "Xã", maqh: 17 },
		{ id: 517, name: "Xã Tầm Xá", type: "Xã", maqh: 17 },
		{ id: 520, name: "Xã Mai Lâm", type: "Xã", maqh: 17 },
		{ id: 523, name: "Xã Đông Hội", type: "Xã", maqh: 17 },
	];

	return res.status(200).send({ success: true, message: data });
});
// get thi tran by id
app.get("/order/xaphuongthitranbyid/:id", async (req, res) => {
	const data = { id: 40, name: "Phường Đồng Xuân", type: "Phường", maqh: 2 };

	return res.status(200).send({ success: true, message: data });
});

// get address
app.get("/order/getaddress/:id", async (req, res) => {
	const data = [
		{
			id: 6,
			user_id: 2,
			user_address: "58/1k",
			tinhthanhpho_id: 14,
			tinhthanhpho_name: "Tỉnh Sơn La",
			quanhuyen_id: 122,
			quanhuyen_name: "Huyện Phù Yên",
			xaphuongthitran_id: 3934,
			xaphuongthitran_name: "Xã Mường Lang",
			ship_cost: 10000,
		},
		{
			id: 7,
			user_id: 2,
			user_address: "ưewq",
			tinhthanhpho_id: 26,
			tinhthanhpho_name: "Tỉnh Vĩnh Phúc",
			quanhuyen_id: 246,
			quanhuyen_name: "Huyện Lập Thạch",
			xaphuongthitran_id: 8842,
			xaphuongthitran_name: "Xã Tiên Lữ",
			ship_cost: 10000,
		},
	];

	return res.status(200).send({ success: true, message: data });
});
// get by shipper id
app.get("/order/getbyid/:id", async (req, res) => {
	const data = [
		{
			id: 7,
			order_code: "1665909772896GD48",
			user_id: null,
			order_name: "Nguyen Bao",
			order_phone: "934304324",
			order_address: "adad",
			tinhthanhpho_id: 20,
			tinhthanhpho_name: "Tỉnh Lạng Sơn",
			quanhuyen_id: 182,
			quanhuyen_name: "Huyện Văn Lãng",
			xaphuongthitran_id: 6169,
			xaphuongthitran_name: "Xã Nam La",
			order_status: 0,
			shipper_id: 104,
			order_total: 2147483647,
			payment_method: "COD",
			created_at: "2022-10-16",
			updated_at: "2022-10-18",
		},
		{
			id: 8,
			order_code: "1666060994680GD29",
			user_id: null,
			order_name: "Bảo Bảo",
			order_phone: "0342281231",
			order_address: "58/1k",
			tinhthanhpho_id: 24,
			tinhthanhpho_name: "Tỉnh Bắc Giang",
			quanhuyen_id: 221,
			quanhuyen_name: "Huyện Yên Dũng",
			xaphuongthitran_id: 7735,
			xaphuongthitran_name: "Xã Đức Giang",
			order_status: 0,
			shipper_id: 104,
			order_total: 2147483647,
			payment_method: "COD",
			created_at: "2022-10-18",
			updated_at: "2022-10-18",
		},
	];

	return res.status(200).send({ success: true, message: data });
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
	return res.status(200).send({ success: true, message: "Success!" });
});
// handle order
app.put("/order/handleorder", async (req, res) => {
	return res.status(200).send({ success: true, message: "Success!" });
});
// get total
app.get("/order/gettotal/:from_date/:to_date", async (req, res) => {
	const data = [
		{
			id: 7,
			order_code: "1665909772896GD48",
			user_id: null,
			order_name: "Nguyen Bao",
			order_phone: "934304324",
			order_address: "adad",
			tinhthanhpho_id: 20,
			tinhthanhpho_name: "Tỉnh Lạng Sơn",
			quanhuyen_id: 182,
			quanhuyen_name: "Huyện Văn Lãng",
			xaphuongthitran_id: 6169,
			xaphuongthitran_name: "Xã Nam La",
			order_status: 0,
			shipper_id: 104,
			order_total: 2147483647,
			payment_method: "COD",
			created_at: "2022-10-16",
			updated_at: "2022-10-18",
		},
		{
			id: 8,
			order_code: "1666060994680GD29",
			user_id: null,
			order_name: "Bảo Bảo",
			order_phone: "0342281231",
			order_address: "58/1k",
			tinhthanhpho_id: 24,
			tinhthanhpho_name: "Tỉnh Bắc Giang",
			quanhuyen_id: 221,
			quanhuyen_name: "Huyện Yên Dũng",
			xaphuongthitran_id: 7735,
			xaphuongthitran_name: "Xã Đức Giang",
			order_status: 0,
			shipper_id: 104,
			order_total: 2147483647,
			payment_method: "COD",
			created_at: "2022-10-18",
			updated_at: "2022-10-18",
		},
	];

	return res.status(200).send({ success: true, message: data });
});
// delete order
app.delete("/order/delete/:code", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data deleted successfully" });
});
// /******************************** News route **************************/

// add new
app.post("/news/addnew", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data added successfully!" });
});
// list news
app.get("/news/getall/:limit", async (req, res) => {
	const limit = Number(req.params.limit);

	if (limit <= 0) {
		const data = [
			{
				id: 9,
				news_name: "SỰ KIỆN GÌ SẼ DIỄN RA VÀO NGÀY 30/10/2019 TẠI BANGKOK",
				news_desc:
					"SỰ KIỆN GÌ SẼ DIỄN RA VÀO NGÀY 30/10/2019 TẠI BANGKOK\r\nCùng Chuyên gia Dr. IGOR RISTIC đến từ Serbia chia sẻ về những thủ thuật tạo phục hình với Composite, thủ thuật lấy dấu trên Crowns, Veneers và Implants được tổ chức bởi Trung Tâm DENTAL SIAM tại Bangkok.\r\n\r\nDr. IGOR RISTIC LÀ AI ?\r\n✔️ Tốt nghiệp tại Serbia vào năm 1996, Dr. Igor Ristic là người đã tìm ra những biên giới mới của các xu hướng mới nổi trong Nha khoa thẩm mỹ và Cấy ghép.\r\n✔️ Năm 1999, Dr. Ristic tốt nghiệp chuyên ngành Nha khoa về phục hình thẩm mỹ.\r\n✔️ Năm 2001 tại Belgrade, Serbia Dr. Ristic đã thành lập Trung tâm nha  thẩm mỹ và Cấy ghép( CDEI)\r\n✔️ Trong suốt sự nghiệp của mình, Dr. Ristic đã được trao học bổng từ Học viện Quốc tế về thẩm mỹ răng mặt tại New York.\r\n✔️ Trong năm 2018 Dr. Ristic là một giảng viên khách mời trong một module sau đại học về Thẩm mỹ và Cấy ghép Nha khoa tại Đại học BPP, London.\r\n✔️ Ông thành lập Hiệp hội Nha khoa thẩm mỹ Serbia và tổ chức các phòng khám tại Học viện hoa kỳ năm 2019.\r\n✔️ Dr. Ristic là thành viên hội đồng quản trị và là chủ tịch giáo dục của Hiệp hội Nha khoa thẩm mỹ Châu Âu( ESCD).\r\nHạn đăng ký: 20/10/2019.\r\nSố lượng Qúy Bác sĩ tham gia khóa học có hạn, để biết thêm thông tin xin vui lòng liên hệ hoặc inbox.",
				news_image: "news_image_1665656330561.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
			{
				id: 10,
				news_name: "CHƯƠNG TRÌNH KHÓA HỌC - NHA KHOA THẨM MỸ HIỆN ĐẠI TỪ THÔNG THƯỜNG ĐẾN KỸ THUẬT SỐ",
				news_desc:
					"Chỉ với 30TRIỆU khi mua sản phẩm KULZER\r\nCông Ty Gdent xin gửi đến Quý Bác sĩ chương trình Khóa học “ Nha khoa thẩm mỹ hiện đại từ thông thường đến kỹ thuật số” được tổ chức bởi Trung Tâm DENTAL SIAM tại Bangkok\r\nTham gia khóa học Quý Bác sĩ ĐƯỢC 3 TRONG 1 \r\n➡️ ĐƯỢC Chuyên gia Dr. IGOR RISTIC đến từ Serbia chia sẻ về những kỹ thuật tạo phục hình với Composite, kỹ thuật lấy dấu trên Crowns, Veneers và Implants \r\n➡️ ĐƯỢC tặng ngay 2 Tuýp composite Topaz của Kulzer trị giá 2.300.000đ\r\n➡️ ĐƯỢC tặng chuyến du lịch BANGKOK – PATTAYA 04 ngày 3 đêm \r\nHạn đăng ký: 20/10/2019.\r\nHãy liên hệ với Chúng tôi hôm nay, và bạn sẽ trải nghiệm sự khác biệt từ Kulzer mang lại!",
				news_image: "news_image_1665656372226.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
			{
				id: 11,
				news_name: "​VÌ SAO NGƯỜI VIỆT ĐÃ BẮT ĐẦU QUAN TÂM ĐẾN VIỆC CHĂM SÓC RĂNG Ê BUỐT",
				news_desc:
					"Nhiều người nói rằng, ăn uống là một trong những niềm vui lớn của con người. Nhưng thức ăn nhiều vị chua (nhiều tính axit) hay uống nước nóng hoặc lạnh thường xuyên cùng thói quen chăm sóc răng miệng chưa đúng cách khiến hơn 90% người Việt Nam bị các vấn đề về răng miệng, mà phổ biến nhất là trường hợp ê buốt răng.\r\nCó bao giờ bạn đang ăn ngon lành chợt buốt nhói trong răng khiến bạn muốn dừng lại ngay? Hay có khi nào bạn hẹn hò cùng bạn bè nhưng lại chối từ hết những món ngon chỉ bởi lo sợ ê buốt? Và cũng có lúc tinh thần bạn hay bực tức, cáu kỉnh vô cớ với mọi thứ xung quanh vì cơn ê buốt răng cứ đeo bám liên tục?\r\n\r\nHậu quả của tình trạng ê buốt răng không quá nghiêm trọng nhưng lại ảnh hưởng đáng kể đến chất lượng cuộc sống của bạn. Nhưng câu hỏi đặt ra “liệu người Việt đã bắt đầu quan tâm việc chăm sóc răng ê buốt?”\r\n\r\n\r\nLiệu người Việt đã bắt đầu quan tâm việc chăm sóc răng ê buốt?\r\nCó mặt tại một trong những địa chỉ tư vấn sức khỏe răng miệng trong chương trình “Tháng chăm sóc răng ê buốt”, chúng tôi đi từ thích thú đến ngỡ ngàng khi thấy rất nhiều người Việt đã thật sư quan tâm vấn đề chăm sóc răng ê buốt đăng ký tham gia\r\n\r\n\r\nNhiều người Việt đã thật sự quan tâm chăm sóc răng ê buốt\r\nCô Kim Yến, 37 tuổi – sinh sống tại quận 3, HCM - một khách hàng tham dự chương trình chia sẻ: “Cô thường xuyên bị ê buốt răng khi ăn đồ chua, cứng hay uống nước đá, cô đã tham khảo nhiều cách chữa trị nhưng tình trạng vẫn kéo dài, khi biết có sự kiện, cô đã đăng ký tham gia để được tư vấn điều trị. Giờ cô đã hiểu thêm về nguyên nhân khiến cô bị ê buốt và biết cách tự chăm sóc để giảm ê buốt răng”.\r\n\r\nTại sự kiện, ngoài việc khám và tư vấn chữa trị các bệnh về răng miệng, người tham gia còn nhận được các sản phẩm kem đánh răng dành riêng cho răng ê buốt do bác sỹ nha khoa tư vấn để nâng cao nhận thức bảo vệ răng miệng.",
				news_image: "news_image_1665656411169.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
			{
				id: 12,
				news_name: "DÙNG THUỐC CHỮA ALZHEIMER GIÚP RĂNG PHỤC HỒI",
				news_desc:
					"Thông thường khi gặp các vấn đề về răng miệng, người bệnh có xu hướng yêu cầu bác sĩ nha khoa trám lại hoặc nhổ bỏ hoàn toàn.\r\n\r\nTuy nhiên, theo kết quả do các nhà nghiên cứu tại đại học King London (Anh) công bố, trong tương lai các nha sĩ không cần phải can thiệp quá nhiều vào việc phục hồi răng hư tổn.\r\n\r\nThay vào đó, họ sẽ dùng một loại thuốc vốn được sử dụng để chữa Alzheimer nhằm kích thích các tế bào gốc trong răng tự phục hồi.\r\n\r\nKhi răng bị hư hỏng nhẹ, cơ thể sẽ tự sản xuất ra ngà răng để bảo vệ tủy răng không bị tổn thương nặng hơn. Tuy nhiên, nếu răng bị hư hại nặng, ngà răng thường bị ảnh hưởng theo và không còn đủ khả năng bảo vệ tủy răng.\r\n\r\nCác nhà nghiên cứu cho biết liệu pháp mới giúp cơ thể tự sản sinh ngà răng với số lượng đủ nhiều để có thể bảo vệ tủy răng, kể cả đối với những tổn thương nặng.\r\n\r\nBên cạnh đó, theo các nhà nghiên cứu, thực chất việc sử dụng các chất trám nhân tạo - thường làm bằng calcium hoặc một số sản phẩm có nguồn gốc từ silicon - sẽ ngăn chặn quá trình tự hồi phục hoàn toàn của răng.\r\n\r\nHiện nay, liệu pháp này đã được thông qua trong phòng thí nghiệm và sẽ nhanh chóng được ứng dụng tại các phòng khám nha khoa.",
				news_image: "news_image_1665656440639.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
			{
				id: 13,
				news_name: "TOP 9 THỰC PHẨM LÀM TRẮNG RĂNG CỰC HIỆU QUẢ",
				news_desc:
					"1. Dâu tây: Quả dâu tây làm sạch răng rất hiệu quả. Dâu tây có nhiều đặc tính giúp tẩy và làm sạch răng. Nó cũng loại quả rất hữu ích để loại bỏ trà, cà phê và các vết bẩn trên răng. Ngoài ra, dâu tây cũng có axit giúp làm trắng răng tự nhiên.\r\n\r\n2. Súp lơ: Súp lơ có tác dụng làm trắng răng vì thực phẩm này có chức năng mài mòn. Chúng cũng kích thích sản xuất nước bọt để tránh các mảng bám hình thành trên răng.\r\n\r\n3. Dưa hấu: 25% lượng vitamin C cần bổ sung cho cơ thể hàng ngày có thể thay bằng cách uống 2 cốc nước dưa hấu. Vitamin C có trong dưa hấu rất tốt cho răng và giúp hấp thu sắt. Dưa hấu cũng có đặc tính chống oxy hóa, giúp ngăn ngừa tổn thương tế bào bằng cách trung hòa phân tử gốc tự do có liên quan đến lão hóa răng miệng.\r\n\r\nCác nghiên cứu đã chỉ ra rằng những người thường xuyên ăn dưa hấu sẽ ít bị các bệnh về răng miệng. Những người ăn đủ rau quả và trái cây để cung cấp đủ vitamin C hàng ngày cho cơ thể có hàm răng khỏe mạnh hơn những người khác.\r\n\r\n4. Cam: Ăn nhiều cam sẽ có nhiều vitamin C giúp răng lợi khỏe mạnh và hỗ trợ hấp thu chất sắt.\r\n\r\n5. Táo: Ăn một quả táo thường xuyên mỗi ngày không chỉ giúp bạn ít phải đến gặp bác sỹ nha khoa mà còn có được bộ răng chắc khỏe lâu dài. Ăn trực tiếp táo thay vì uống nước ép táo sẽ làm cho răng và nướu khỏe mạnh. Khi ăn táo bạn thực sự kích thích và tăng cường việc làm sạch răng và giảm được lượng đường tiêu thụ.\r\n\r\n6. Các loại rau có lá: Các loại rau có lá xanh giàu beta carotene – một loại chất mà mà cơ thể chuyển hóa thành vitamin A giúp răng chắc khỏe.\r\n\r\n7. Các sản phẩm sữa: Sữa chua, sữa và pho mát cứng có chứa axit lactic giúp bảo vệ răng và chống lại sâu răng. Các nhà nghiên cứu cho rằng protein trong sữa chua có thể liên kết với răng và bảo vệ răng khỏi bị tấn công bởi các axit có hại gây ra sâu răng. Trong sữa cũng có nhiều canxi, giúp bảo vệ và tăng cường giúp răng chắc khỏe. Hơn nữa việc nhai pho mát cứng giúp tiết nước bọt loại bỏ các mảnh thức ăn còn bám lại trên răng.\r\n\r\n8. Đậu xanh: Loại thực phẩm lành mạnh này có thể giúp cọ rửa sạch miệng, và kích thích tiết nước bọt.\r\n\r\n9. Nho: Axit malic – một loại enzyme có nhiều trong quả nho giúp làm trắng răng.",
				news_image: "news_image_1665656473472.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
		];

		return res.status(200).send({ success: true, message: data });
	} else {
		const data = [
			{
				id: 9,
				news_name: "SỰ KIỆN GÌ SẼ DIỄN RA VÀO NGÀY 30/10/2019 TẠI BANGKOK",
				news_desc:
					"SỰ KIỆN GÌ SẼ DIỄN RA VÀO NGÀY 30/10/2019 TẠI BANGKOK\r\nCùng Chuyên gia Dr. IGOR RISTIC đến từ Serbia chia sẻ về những thủ thuật tạo phục hình với Composite, thủ thuật lấy dấu trên Crowns, Veneers và Implants được tổ chức bởi Trung Tâm DENTAL SIAM tại Bangkok.\r\n\r\nDr. IGOR RISTIC LÀ AI ?\r\n✔️ Tốt nghiệp tại Serbia vào năm 1996, Dr. Igor Ristic là người đã tìm ra những biên giới mới của các xu hướng mới nổi trong Nha khoa thẩm mỹ và Cấy ghép.\r\n✔️ Năm 1999, Dr. Ristic tốt nghiệp chuyên ngành Nha khoa về phục hình thẩm mỹ.\r\n✔️ Năm 2001 tại Belgrade, Serbia Dr. Ristic đã thành lập Trung tâm nha  thẩm mỹ và Cấy ghép( CDEI)\r\n✔️ Trong suốt sự nghiệp của mình, Dr. Ristic đã được trao học bổng từ Học viện Quốc tế về thẩm mỹ răng mặt tại New York.\r\n✔️ Trong năm 2018 Dr. Ristic là một giảng viên khách mời trong một module sau đại học về Thẩm mỹ và Cấy ghép Nha khoa tại Đại học BPP, London.\r\n✔️ Ông thành lập Hiệp hội Nha khoa thẩm mỹ Serbia và tổ chức các phòng khám tại Học viện hoa kỳ năm 2019.\r\n✔️ Dr. Ristic là thành viên hội đồng quản trị và là chủ tịch giáo dục của Hiệp hội Nha khoa thẩm mỹ Châu Âu( ESCD).\r\nHạn đăng ký: 20/10/2019.\r\nSố lượng Qúy Bác sĩ tham gia khóa học có hạn, để biết thêm thông tin xin vui lòng liên hệ hoặc inbox.",
				news_image: "news_image_1665656330561.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
			{
				id: 10,
				news_name: "CHƯƠNG TRÌNH KHÓA HỌC - NHA KHOA THẨM MỸ HIỆN ĐẠI TỪ THÔNG THƯỜNG ĐẾN KỸ THUẬT SỐ",
				news_desc:
					"Chỉ với 30TRIỆU khi mua sản phẩm KULZER\r\nCông Ty Gdent xin gửi đến Quý Bác sĩ chương trình Khóa học “ Nha khoa thẩm mỹ hiện đại từ thông thường đến kỹ thuật số” được tổ chức bởi Trung Tâm DENTAL SIAM tại Bangkok\r\nTham gia khóa học Quý Bác sĩ ĐƯỢC 3 TRONG 1 \r\n➡️ ĐƯỢC Chuyên gia Dr. IGOR RISTIC đến từ Serbia chia sẻ về những kỹ thuật tạo phục hình với Composite, kỹ thuật lấy dấu trên Crowns, Veneers và Implants \r\n➡️ ĐƯỢC tặng ngay 2 Tuýp composite Topaz của Kulzer trị giá 2.300.000đ\r\n➡️ ĐƯỢC tặng chuyến du lịch BANGKOK – PATTAYA 04 ngày 3 đêm \r\nHạn đăng ký: 20/10/2019.\r\nHãy liên hệ với Chúng tôi hôm nay, và bạn sẽ trải nghiệm sự khác biệt từ Kulzer mang lại!",
				news_image: "news_image_1665656372226.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
			{
				id: 11,
				news_name: "​VÌ SAO NGƯỜI VIỆT ĐÃ BẮT ĐẦU QUAN TÂM ĐẾN VIỆC CHĂM SÓC RĂNG Ê BUỐT",
				news_desc:
					"Nhiều người nói rằng, ăn uống là một trong những niềm vui lớn của con người. Nhưng thức ăn nhiều vị chua (nhiều tính axit) hay uống nước nóng hoặc lạnh thường xuyên cùng thói quen chăm sóc răng miệng chưa đúng cách khiến hơn 90% người Việt Nam bị các vấn đề về răng miệng, mà phổ biến nhất là trường hợp ê buốt răng.\r\nCó bao giờ bạn đang ăn ngon lành chợt buốt nhói trong răng khiến bạn muốn dừng lại ngay? Hay có khi nào bạn hẹn hò cùng bạn bè nhưng lại chối từ hết những món ngon chỉ bởi lo sợ ê buốt? Và cũng có lúc tinh thần bạn hay bực tức, cáu kỉnh vô cớ với mọi thứ xung quanh vì cơn ê buốt răng cứ đeo bám liên tục?\r\n\r\nHậu quả của tình trạng ê buốt răng không quá nghiêm trọng nhưng lại ảnh hưởng đáng kể đến chất lượng cuộc sống của bạn. Nhưng câu hỏi đặt ra “liệu người Việt đã bắt đầu quan tâm việc chăm sóc răng ê buốt?”\r\n\r\n\r\nLiệu người Việt đã bắt đầu quan tâm việc chăm sóc răng ê buốt?\r\nCó mặt tại một trong những địa chỉ tư vấn sức khỏe răng miệng trong chương trình “Tháng chăm sóc răng ê buốt”, chúng tôi đi từ thích thú đến ngỡ ngàng khi thấy rất nhiều người Việt đã thật sư quan tâm vấn đề chăm sóc răng ê buốt đăng ký tham gia\r\n\r\n\r\nNhiều người Việt đã thật sự quan tâm chăm sóc răng ê buốt\r\nCô Kim Yến, 37 tuổi – sinh sống tại quận 3, HCM - một khách hàng tham dự chương trình chia sẻ: “Cô thường xuyên bị ê buốt răng khi ăn đồ chua, cứng hay uống nước đá, cô đã tham khảo nhiều cách chữa trị nhưng tình trạng vẫn kéo dài, khi biết có sự kiện, cô đã đăng ký tham gia để được tư vấn điều trị. Giờ cô đã hiểu thêm về nguyên nhân khiến cô bị ê buốt và biết cách tự chăm sóc để giảm ê buốt răng”.\r\n\r\nTại sự kiện, ngoài việc khám và tư vấn chữa trị các bệnh về răng miệng, người tham gia còn nhận được các sản phẩm kem đánh răng dành riêng cho răng ê buốt do bác sỹ nha khoa tư vấn để nâng cao nhận thức bảo vệ răng miệng.",
				news_image: "news_image_1665656411169.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
			{
				id: 12,
				news_name: "DÙNG THUỐC CHỮA ALZHEIMER GIÚP RĂNG PHỤC HỒI",
				news_desc:
					"Thông thường khi gặp các vấn đề về răng miệng, người bệnh có xu hướng yêu cầu bác sĩ nha khoa trám lại hoặc nhổ bỏ hoàn toàn.\r\n\r\nTuy nhiên, theo kết quả do các nhà nghiên cứu tại đại học King London (Anh) công bố, trong tương lai các nha sĩ không cần phải can thiệp quá nhiều vào việc phục hồi răng hư tổn.\r\n\r\nThay vào đó, họ sẽ dùng một loại thuốc vốn được sử dụng để chữa Alzheimer nhằm kích thích các tế bào gốc trong răng tự phục hồi.\r\n\r\nKhi răng bị hư hỏng nhẹ, cơ thể sẽ tự sản xuất ra ngà răng để bảo vệ tủy răng không bị tổn thương nặng hơn. Tuy nhiên, nếu răng bị hư hại nặng, ngà răng thường bị ảnh hưởng theo và không còn đủ khả năng bảo vệ tủy răng.\r\n\r\nCác nhà nghiên cứu cho biết liệu pháp mới giúp cơ thể tự sản sinh ngà răng với số lượng đủ nhiều để có thể bảo vệ tủy răng, kể cả đối với những tổn thương nặng.\r\n\r\nBên cạnh đó, theo các nhà nghiên cứu, thực chất việc sử dụng các chất trám nhân tạo - thường làm bằng calcium hoặc một số sản phẩm có nguồn gốc từ silicon - sẽ ngăn chặn quá trình tự hồi phục hoàn toàn của răng.\r\n\r\nHiện nay, liệu pháp này đã được thông qua trong phòng thí nghiệm và sẽ nhanh chóng được ứng dụng tại các phòng khám nha khoa.",
				news_image: "news_image_1665656440639.jpeg",
				created_at: "2022-10-13",
				updated_at: "2022-10-13",
			},
		];

		return res.status(200).send({ success: true, message: data });
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
app.put("/news/update", async (req, res) => {
	return res.status(200).send({ success: true, message: "Update successfully!" });
});
// delete
app.delete("/news/delete/:filename/:id", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data deleted successfully" });
});
/******************************** Content route **************************/

// add new
app.post("/content/addnew", async (req, res) => {
	return res.status(200).send({
		success: true,
		message: "Sucessfully added",
	});
});
// list content
app.get("/content/getall", async (req, res) => {
	const data = [
		{
			id: 1,
			content_title: "Sứ mệnh",
			content_desc:
				"GDENT sẽ là đối tác tin cậy của nhiều công ty nha khoa trong và ngoài nước. Chúng tôi mong muốn sẽ là đối tác thân thiết với các bệnh viện nha khoa, trung tâm nha khoa, viện thẩm mỹ và các nha sĩ có chuyên môn. Vật liệu được nhập trực tiếp từ các hãng sản xuất trên thế giới có uy tín trong lĩnh vực Nha Khoa.",
		},
		{
			id: 2,
			content_title: "Giá trị cốt lõi",
			content_desc:
				"Trung thực: Chúng ta luôn làm những điều đúng đắn, công bằng và có đạo đức. Liên tục cải tiến để luôn dẫn đầu. Phát triển nhân lực: Con người với năng lực cao sẽ tạo ra lợi thế cạnh tranh và thành công vượt trội cho tổ chức. Tôn trọng: Chúng ta qua tâm đến mọi người qua những hành động thích hợp",
		},
		{
			id: 3,
			content_title: "Phương châm",
			content_desc:
				"Đơn giản hóa dịch vụ cho khách hàng từ khâu đặt hàng, vận chuyển, giao nhận hàng, phương thức thanh toán… Hạn chế hoạt động sử dụng nhiều lao động thủ công và thay thế bằng máy móc. Cải tiến công nghệ và quy mô nhằm đạt được năng suất và hiệu quả cao nhất. Luôn luôn lắng nghe mọi nhu cầu, đánh giá, góp ý từ khách hàng. Mong muốn hợp tác lâu dài với các đối tác, khách hàng, đặc biệt là các bạn hàng thể hiện nhiệt huyết đi chung con đường cùng mang lại lợi ích cho các bên. Tạo điều kiện liên lạc và hỗ trợ lẫn nhau trên mọi phương diện một cách tối đa nhất.",
		},
		{
			id: 5,
			content_title: "Triết Lý Kinh Doanh",
			content_desc:
				"Xây dựng đội ngũ cán bộ, công nhân viên có phong cách làm việc chuyên nghiệp, sáng tạo, giàu nhiệt huyết và giỏi chuyên môn.",
		},
	];

	return res.status(200).send({ success: true, message: data });
});
// getOne
app.get("/content/getone", async (req, res) => {
	const data = {
		id: 1,
		content_title: "Sứ mệnh",
		content_desc:
			"GDENT sẽ là đối tác tin cậy của nhiều công ty nha khoa trong và ngoài nước. Chúng tôi mong muốn sẽ là đối tác thân thiết với các bệnh viện nha khoa, trung tâm nha khoa, viện thẩm mỹ và các nha sĩ có chuyên môn. Vật liệu được nhập trực tiếp từ các hãng sản xuất trên thế giới có uy tín trong lĩnh vực Nha Khoa.",
	};

	return res.status(200).send({ success: true, message: data });
});
// update
app.put("/content/update", async (req, res) => {
	return res.status(200).send({ success: true, message: "Success" });
});
// delete
app.delete("/content/delete/:id", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data deleted successfully" });
});
/******************************** Slide route **************************/

// add new
app.post("/slide/addnew", async (req, res) => {
	return res.status(200).send({
		success: true,
		message: "Successfully!",
	});
});
// list slide
app.get("/slide/getall/:limit", async (req, res) => {
	const data = [
		{
			id: 12,
			slide_name: "slide01",
			slide_desc: "slide01",
			slide_status: 1,
			slide_image: "slide_image_1665632407017.png",
			created_at: "2022-10-13",
			updated_at: "2022-10-13",
		},
		{
			id: 13,
			slide_name: "slide02",
			slide_desc: "slide02",
			slide_status: 1,
			slide_image: "slide_image_1665632474969.png",
			created_at: "2022-10-13",
			updated_at: "2022-10-13",
		},
	];

	return res.status(200).send({ success: true, message: data });
});
// getOne
app.get("/slide/getone", async (req, res) => {
	const data = {
		id: 12,
		slide_name: "slide01",
		slide_desc: "slide01",
		slide_status: 1,
		slide_image: "slide_image_1665632407017.png",
		created_at: "2022-10-13",
		updated_at: "2022-10-13",
	};

	return res.status(200).send({ success: true, message: data });
});
// update
app.put("/slide/update", async (req, res) => {
	return res.status(200).send({ success: true, message: "Success" });
});
// delete
app.delete("/slide/delete/:filename/:id", async (req, res) => {
	return res.status(200).send({ success: true, message: "Data deleted successfully" });
});
/******************************** Address route **************************/

/// get thanh pho
app.get("/address/tinhthanhpho", async (req, res) => {
	const data = [
		{ id: 1, name: "Thành phố Hà Nội", type: "Thành phố Trung ương" },
		{ id: 2, name: "Tỉnh Hà Giang", type: "Tỉnh" },
		{ id: 4, name: "Tỉnh Cao Bằng", type: "Tỉnh" },
		{ id: 6, name: "Tỉnh Bắc Kạn", type: "Tỉnh" },
		{ id: 8, name: "Tỉnh Tuyên Quang", type: "Tỉnh" },
		{ id: 10, name: "Tỉnh Lào Cai", type: "Tỉnh" },
		{ id: 11, name: "Tỉnh Điện Biên", type: "Tỉnh" },
		{ id: 12, name: "Tỉnh Lai Châu", type: "Tỉnh" },
		{ id: 14, name: "Tỉnh Sơn La", type: "Tỉnh" },
		{ id: 15, name: "Tỉnh Yên Bái", type: "Tỉnh" },
		{ id: 17, name: "Tỉnh Hoà Bình", type: "Tỉnh" },
		{ id: 19, name: "Tỉnh Thái Nguyên", type: "Tỉnh" },
		{ id: 20, name: "Tỉnh Lạng Sơn", type: "Tỉnh" },
		{ id: 22, name: "Tỉnh Quảng Ninh", type: "Tỉnh" },
		{ id: 24, name: "Tỉnh Bắc Giang", type: "Tỉnh" },
		{ id: 25, name: "Tỉnh Phú Thọ", type: "Tỉnh" },
		{ id: 26, name: "Tỉnh Vĩnh Phúc", type: "Tỉnh" },
		{ id: 27, name: "Tỉnh Bắc Ninh", type: "Tỉnh" },
		{ id: 30, name: "Tỉnh Hải Dương", type: "Tỉnh" },
		{ id: 31, name: "Thành phố Hải Phòng", type: "Thành phố Trung ương" },
		{ id: 33, name: "Tỉnh Hưng Yên", type: "Tỉnh" },
		{ id: 34, name: "Tỉnh Thái Bình", type: "Tỉnh" },
		{ id: 35, name: "Tỉnh Hà Nam", type: "Tỉnh" },
		{ id: 36, name: "Tỉnh Nam Định", type: "Tỉnh" },
		{ id: 37, name: "Tỉnh Ninh Bình", type: "Tỉnh" },
		{ id: 38, name: "Tỉnh Thanh Hóa", type: "Tỉnh" },
		{ id: 40, name: "Tỉnh Nghệ An", type: "Tỉnh" },
		{ id: 42, name: "Tỉnh Hà Tĩnh", type: "Tỉnh" },
		{ id: 44, name: "Tỉnh Quảng Bình", type: "Tỉnh" },
		{ id: 45, name: "Tỉnh Quảng Trị", type: "Tỉnh" },
		{ id: 46, name: "Tỉnh Thừa Thiên Huế", type: "Tỉnh" },
		{ id: 48, name: "Thành phố Đà Nẵng", type: "Thành phố Trung ương" },
		{ id: 49, name: "Tỉnh Quảng Nam", type: "Tỉnh" },
		{ id: 51, name: "Tỉnh Quảng Ngãi", type: "Tỉnh" },
		{ id: 52, name: "Tỉnh Bình Định", type: "Tỉnh" },
		{ id: 54, name: "Tỉnh Phú Yên", type: "Tỉnh" },
		{ id: 56, name: "Tỉnh Khánh Hòa", type: "Tỉnh" },
		{ id: 58, name: "Tỉnh Ninh Thuận", type: "Tỉnh" },
		{ id: 60, name: "Tỉnh Bình Thuận", type: "Tỉnh" },
		{ id: 62, name: "Tỉnh Kon Tum", type: "Tỉnh" },
		{ id: 64, name: "Tỉnh Gia Lai", type: "Tỉnh" },
		{ id: 66, name: "Tỉnh Đắk Lắk", type: "Tỉnh" },
		{ id: 67, name: "Tỉnh Đắk Nông", type: "Tỉnh" },
		{ id: 68, name: "Tỉnh Lâm Đồng", type: "Tỉnh" },
		{ id: 70, name: "Tỉnh Bình Phước", type: "Tỉnh" },
		{ id: 72, name: "Tỉnh Tây Ninh", type: "Tỉnh" },
		{ id: 74, name: "Tỉnh Bình Dương", type: "Tỉnh" },
		{ id: 75, name: "Tỉnh Đồng Nai", type: "Tỉnh" },
		{ id: 77, name: "Tỉnh Bà Rịa - Vũng Tàu", type: "Tỉnh" },
		{ id: 79, name: "Thành phố Hồ Chí Minh", type: "Thành phố Trung ương" },
		{ id: 80, name: "Tỉnh Long An", type: "Tỉnh" },
		{ id: 82, name: "Tỉnh Tiền Giang", type: "Tỉnh" },
		{ id: 83, name: "Tỉnh Bến Tre", type: "Tỉnh" },
		{ id: 84, name: "Tỉnh Trà Vinh", type: "Tỉnh" },
		{ id: 86, name: "Tỉnh Vĩnh Long", type: "Tỉnh" },
		{ id: 87, name: "Tỉnh Đồng Tháp", type: "Tỉnh" },
		{ id: 89, name: "Tỉnh An Giang", type: "Tỉnh" },
		{ id: 91, name: "Tỉnh Kiên Giang", type: "Tỉnh" },
		{ id: 92, name: "Thành phố Cần Thơ", type: "Thành phố Trung ương" },
		{ id: 93, name: "Tỉnh Hậu Giang", type: "Tỉnh" },
		{ id: 94, name: "Tỉnh Sóc Trăng", type: "Tỉnh" },
		{ id: 95, name: "Tỉnh Bạc Liêu", type: "Tỉnh" },
		{ id: 96, name: "Tỉnh Cà Mau", type: "Tỉnh" },
	];

	return res.status(200).send({ success: true, message: data });
});
// get thanh pho by id
app.get("/address/tinhthanhphobyid/:id", async (req, res) => {
	const data = { id: 2, name: "Tỉnh Hà Giang", type: "Tỉnh" };

	return res.status(200).send({ success: true, message: data });
});
// get quan huyen
app.get("/address/quanhuyen/:id", async (req, res) => {
	const data = [
		{ id: 24, name: "Thành phố Hà Giang", type: "Thành phố", matp: 2 },
		{ id: 26, name: "Huyện Đồng Văn", type: "Huyện", matp: 2 },
		{ id: 27, name: "Huyện Mèo Vạc", type: "Huyện", matp: 2 },
		{ id: 28, name: "Huyện Yên Minh", type: "Huyện", matp: 2 },
		{ id: 29, name: "Huyện Quản Bạ", type: "Huyện", matp: 2 },
		{ id: 30, name: "Huyện Vị Xuyên", type: "Huyện", matp: 2 },
		{ id: 31, name: "Huyện Bắc Mê", type: "Huyện", matp: 2 },
		{ id: 32, name: "Huyện Hoàng Su Phì", type: "Huyện", matp: 2 },
		{ id: 33, name: "Huyện Xín Mần", type: "Huyện", matp: 2 },
		{ id: 34, name: "Huyện Bắc Quang", type: "Huyện", matp: 2 },
		{ id: 35, name: "Huyện Quang Bình", type: "Huyện", matp: 2 },
	];

	return res.status(200).send({ success: true, message: data });
});
// get quan huyen by id
app.get("/address/quanhuyenbyid/:id", async (req, res) => {
	const data = { id: 2, name: "Quận Hoàn Kiếm", type: "Quận", matp: 1 };

	return res.status(200).send({ success: true, message: data });
});
// get thi tran
app.get("/address/xaphuongthitran/:id", async (req, res) => {
	const data = [
		{ id: 37, name: "Phường Phúc Tân", type: "Phường", maqh: 2 },
		{ id: 40, name: "Phường Đồng Xuân", type: "Phường", maqh: 2 },
		{ id: 43, name: "Phường Hàng Mã", type: "Phường", maqh: 2 },
		{ id: 46, name: "Phường Hàng Buồm", type: "Phường", maqh: 2 },
		{ id: 49, name: "Phường Hàng Đào", type: "Phường", maqh: 2 },
		{ id: 52, name: "Phường Hàng Bồ", type: "Phường", maqh: 2 },
		{ id: 55, name: "Phường Cửa Đông", type: "Phường", maqh: 2 },
		{ id: 58, name: "Phường Lý Thái Tổ", type: "Phường", maqh: 2 },
		{ id: 61, name: "Phường Hàng Bạc", type: "Phường", maqh: 2 },
		{ id: 64, name: "Phường Hàng Gai", type: "Phường", maqh: 2 },
		{ id: 67, name: "Phường Chương Dương Độ", type: "Phường", maqh: 2 },
		{ id: 70, name: "Phường Hàng Trống", type: "Phường", maqh: 2 },
		{ id: 73, name: "Phường Cửa Nam", type: "Phường", maqh: 2 },
		{ id: 76, name: "Phường Hàng Bông", type: "Phường", maqh: 2 },
		{ id: 79, name: "Phường Tràng Tiền", type: "Phường", maqh: 2 },
		{ id: 82, name: "Phường Trần Hưng Đạo", type: "Phường", maqh: 2 },
		{ id: 85, name: "Phường Phan Chu Trinh", type: "Phường", maqh: 2 },
		{ id: 88, name: "Phường Hàng Bài", type: "Phường", maqh: 2 },
	];

	return res.status(200).send({ success: true, message: data });
});
// get thi tran by id
app.get("/address/xaphuongthitranbyid/:id", async (req, res) => {
	const data = { id: 4, name: "Phường Trúc Bạch", type: "Phường", maqh: 1 };

	return res.status(200).send({ success: true, message: data });
});

// get address
app.get("/address/getaddress/:id", async (req, res) => {
	const data = [
		{
			id: 6,
			user_id: 2,
			user_address: "58/1k",
			tinhthanhpho_id: 14,
			tinhthanhpho_name: "Tỉnh Sơn La",
			quanhuyen_id: 122,
			quanhuyen_name: "Huyện Phù Yên",
			xaphuongthitran_id: 3934,
			xaphuongthitran_name: "Xã Mường Lang",
			ship_cost: 10000,
		},
		{
			id: 7,
			user_id: 2,
			user_address: "ưewq",
			tinhthanhpho_id: 26,
			tinhthanhpho_name: "Tỉnh Vĩnh Phúc",
			quanhuyen_id: 246,
			quanhuyen_name: "Huyện Lập Thạch",
			xaphuongthitran_id: 8842,
			xaphuongthitran_name: "Xã Tiên Lữ",
			ship_cost: 10000,
		},
	];

	return res.status(200).send({ success: true, message: data });
});

// delete address
app.delete("/address/detele/:id", async (req, res) => {
	return res.status(200).send({ success: true, message: "Delete successfuly!" });
});

app.listen(4000, () => console.log(`running on port 4000`));
