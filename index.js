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
// const adminController = require("./controllers/admin.controller");
// const adminUploadImg = require("./config/multer/adminMulter");
// // register
// app.post("/admin/register", adminUploadImg, adminController.addNew);
// // login
// app.get("/admin/login/:username/:password", adminController.login);
// // on/off line
// app.put("/admin/updateonl", adminController.online);
// // check duplicate username
// app.get("/admin/checkusername/:username", adminController.checkDulicate);
// // get all
// app.get("/admin/getall", adminController.getAll);
// // get by status
// app.get("/admin/getadminbystatus", adminController.getByStatus);
// // delete
// app.delete("/admin/delete/:filename/:id", adminController.delete);
// // update
// app.put("/edit", adminController.update);
/******************************** User route **************************/
// const userController = require("./controllers/user.controller");
// const userUploadImg = require("./config/multer/userMulter");
// // login
// app.get("/user/login/:user_username/:user_userpassword", userController.login);
// // register
// app.post("/user/registation", userController.addNew);
// // update
// app.put("/user/update", userUploadImg, userController.update);
// //check duplicate
// app.get("/user/checkusername/:username", userController.checkDulicate);
/******************************** Category route **************************/
// const categoryController = require("./controllers/category.controller");
// const categoryUploadImg = require("./config/multer/categoryMulter");
// // add new
// app.post("/category/addnew", categoryUploadImg, categoryController.addNew);
// // list category
app.get("/category/getall", async (req, res) => {
	try {
		const data = await categoryModel.tbl_category.findAll();

		return res.status(200).send({ success: true, message: data });
	} catch (error) {
		return res.status(422).send({ success: false, message: error });
	}
});
// // getOne
// app.get("/category/getone/:id", categoryController.getOne);
// // update
// app.put("/category/update", categoryUploadImg, categoryController.update);
// // delete
// app.delete("/category/delete/:filename/:id", categoryController.delete);
/******************************** Brand route **************************/
// const brandController = require("./controllers/brand.controller");
// const brandUploadImg = require("./config/multer/brandMulter");
// // add new
// app.post("/brand/addnew", brandUploadImg, brandController.addNew);
// // list brand
// app.get("/brand/getall/:limit", brandController.getAll);
// // getOne
// app.get("/brand/getone", brandController.getOne);
// // update
// app.put("/brand/update", brandUploadImg, brandController.update);
// // delete
// app.delete("/brand/delete/:filename/:id", brandController.delete);
/******************************** Product route **************************/
// const productController = require("./controllers/product.controller");
// const productUploadImg = require("./config/multer/productMulter");
// // add new
// app.post("/product/addnew", productUploadImg, productController.addNew);
// // list product
// app.get("/product/getall", productController.getAll);
// // get limit
// app.get("/product/getlimit", productController.getLimit);

// app.get("/product/getalladmin", productController.getAllAdmin);
// // getOne
// app.get("/product/getone/:id", productController.getOne);
// // update
// app.put("/product/update", productUploadImg, productController.update);
// // delete
// app.delete("/product/delete/:id", productController.delete);
// // get by category
// app.get("/product/getbycategory/:id", productController.getByCategory);
// // search
// app.get("/product/search/:str", productController.search);
/******************************** Order route **************************/
// const orderController = require("./controllers/order.controller");
/* ------------------------------------ tinhthanhpho ------------------------------------*/
// // get all
// app.get("/order/getall", orderController.getAll);
// // get details
// app.get("/order/orderdetail/:code", orderController.getDetails);
// // add new
// app.post("/order/addnew", orderController.addNew);
// // get quan huyen
// app.get("/order/quanhuyenbyid/:id", orderController.getQuanhuyen);
// // get thi tran
// app.get("/order/xaphuongthitran/:id", orderController.getThitran);
// // get thi tran by id
// app.get("/order/xaphuongthitranbyid/:id", orderController.getThitranById);

// // get address
// app.get("/order/getaddress/:id", orderController.getAddress);
// // get by shipper id
// app.get("/order/getbyid/:id", orderController.getByShipperId);
// // get by code
// app.get("/order/getbycode/:code", orderController.getByCode);
// // assigned
// app.put("/order/assigned", orderController.assigned);
// // handle order
// app.put("/order/handleorder", orderController.handleOrder);
// // get total
// app.get("/order/gettotal/:from_date/:to_date", orderController.getTotal);
// // delete order
// app.delete("/order/delete/:code", orderController.delete);
// /******************************** News route **************************/
// const newsController = require("./controllers/news.controller");
// const newsUploadImg = require("./config/multer/newsMulter");
// // add new
// app.post("/news/addnew", newsUploadImg, newsController.addNew);
// // list news
// app.get("/news/getall/:limit", newsController.getAll);
// // getOne
// app.get("/news/getone/:id", newsController.getOne);
// // update
// app.put("/news/update", newsUploadImg, newsController.update);
// // delete
// app.delete("/news/delete/:filename/:id", newsController.delete);
/******************************** Content route **************************/
// const contentController = require("./controllers/content.controller");
// // add new
// app.post("/content/addnew", contentController.addNew);
// // list content
// app.get("/content/getall", contentController.getAll);
// // getOne
// app.get("/content/getone", contentController.getOne);
// // update
// app.put("/content/update");
// // delete
// app.delete("/content/delete/:id", contentController.delete);
// /******************************** Slide route **************************/
// const slideController = require("./controllers/slide.controller");
// const slideUploadImg = require("./config/multer/slideMulter");
// // add new
// app.post("/slide/addnew", slideUploadImg, slideController.addNew);
// // list slide
// app.get("/slide/getall/:limit", slideController.getAll);
// // getOne
// app.get("/slide/getone", slideController.getOne);
// // update
// app.put("/slide/update", slideUploadImg, slideController.update);
// // delete
// app.delete("/slide/delete/:filename/:id", slideController.delete);
/******************************** Address route **************************/
// const addressController = require("./controllers/address.controller");
// /// get thanh pho
// app.get("/address/tinhthanhpho", addressController.getThanhpho);
// // get thanh pho by id
// app.get("/address/tinhthanhphobyid/:id", addressController.getThanhphoById);
// // get quan huyen
// app.get("/address/quanhuyen/:id", addressController.getQuanhuyen);
// // get quan huyen by id
// app.get("/address/quanhuyenbyid/:id", addressController.getQuanhuyenById);
// // get thi tran
// app.get("/address/xaphuongthitran/:id", addressController.getThitran);
// // get thi tran by id
// app.get("/address/xaphuongthitranbyid/:id", addressController.getThitranById);

// // get address
// app.get("/address/getaddress/:id", addressController.getAddress);

// // delete address
// app.delete("/address/detele/:id", addressController.delete);

app.listen(4000, () => console.log(`running on port 4000`));
