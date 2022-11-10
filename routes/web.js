const express = require("express");
const router = express.Router();
/******************************** Admin route **************************/
const adminController = require("../controllers/admin.controller");
const adminUploadImg = require("../config/multer/adminMulter");
// register
router.post("/admin/register", adminUploadImg, adminController.addNew);
// login
router.get("/admin/login/:username/:password", adminController.login);
// on/off line
router.put("/admin/updateonl", adminController.online);
// check duplicate username
router.get("/admin/checkusername/:username", adminController.checkDulicate);
// get all
router.get("/admin/getall", adminController.getAll);
// get by status
router.get("/admin/getadminbystatus", adminController.getByStatus);
// delete
router.delete("/admin/delete/:filename/:id", adminController.delete);
// update
router.put("/edit", adminController.update);
/******************************** User route **************************/
const userController = require("../controllers/user.controller");
const userUploadImg = require("../config/multer/userMulter");
// login
router.get("/user/login/:user_username/:user_userpassword", userController.login);
// register
router.post("/user/registation", userController.addNew);
// update
router.put("/user/update", userUploadImg, userController.update);
//check duplicate
router.get("/user/checkusername/:username", userController.checkDulicate);
/******************************** Category route **************************/
const categoryController = require("../controllers/category.controller");
const categoryUploadImg = require("../config/multer/categoryMulter");
// add new
router.post("/category/addnew", categoryUploadImg, categoryController.addNew);
// list category
router.get("/category/getall", categoryController.getAll);
// getOne
router.get("/category/getone/:id", categoryController.getOne);
// update
router.put("/category/update", categoryUploadImg, categoryController.update);
// delete
router.delete("/category/delete/:filename/:id", categoryController.delete);
/******************************** Brand route **************************/
const brandController = require("../controllers/brand.controller");
const brandUploadImg = require("../config/multer/brandMulter");
// add new
router.post("/brand/addnew", brandUploadImg, brandController.addNew);
// list brand
router.get("/brand/getall/:limit", brandController.getAll);
// getOne
router.get("/brand/getone", brandController.getOne);
// update
router.put("/brand/update", brandUploadImg, brandController.update);
// delete
router.delete("/brand/delete/:filename/:id", brandController.delete);
/******************************** Product route **************************/
const productController = require("../controllers/product.controller");
const productUploadImg = require("../config/multer/productMulter");
// add new
router.post("/product/addnew", productUploadImg, productController.addNew);
// list product
router.get("/product/getall", productController.getAll);
// get limit
router.get("/product/getlimit", productController.getLimit);

router.get("/product/getalladmin", productController.getAllAdmin);
// getOne
router.get("/product/getone/:id", productController.getOne);
// update
router.put("/product/update", productUploadImg, productController.update);
// delete
router.delete("/product/delete/:id", productController.delete);
// get by category
router.get("/product/getbycategory/:id", productController.getByCategory);
// search
router.get("/product/search/:str", productController.search);
/******************************** Order route **************************/
const orderController = require("../controllers/order.controller");
/* ------------------------------------ tinhthanhpho ------------------------------------*/
// get all
router.get("/order/getall", orderController.getAll);
// get details
router.get("/order/orderdetail/:code", orderController.getDetails);
// add new
router.post("/order/addnew", orderController.addNew);
// get quan huyen
router.get("/order/quanhuyenbyid/:id", orderController.getQuanhuyen);
// get thi tran
router.get("/order/xaphuongthitran/:id", orderController.getThitran);
// get thi tran by id
router.get("/order/xaphuongthitranbyid/:id", orderController.getThitranById);

// get address
router.get("/order/getaddress/:id", orderController.getAddress);
// get by shipper id
router.get("/order/getbyid/:id", orderController.getByShipperId);
// get by code
router.get("/order/getbycode/:code", orderController.getByCode);
// assigned
router.put("/order/assigned", orderController.assigned);
// handle order
router.put("/order/handleorder", orderController.handleOrder);
// get total
router.get("/order/gettotal/:from_date/:to_date", orderController.getTotal);
// delete order
router.delete("/order/delete/:code", orderController.delete);
/******************************** News route **************************/
const newsController = require("../controllers/news.controller");
const newsUploadImg = require("../config/multer/newsMulter");
// add new
router.post("/news/addnew", newsUploadImg, newsController.addNew);
// list news
router.get("/news/getall/:limit", newsController.getAll);
// getOne
router.get("/news/getone/:id", newsController.getOne);
// update
router.put("/news/update", newsUploadImg, newsController.update);
// delete
router.delete("/news/delete/:filename/:id", newsController.delete);
/******************************** Content route **************************/
const contentController = require("../controllers/content.controller");
// add new
router.post("/content/addnew", contentController.addNew);
// list content
router.get("/content/getall", contentController.getAll);
// getOne
router.get("/content/getone", contentController.getOne);
// update
router.put("/content/update");
// delete
router.delete("/content/delete/:id", contentController.delete);
/******************************** Slide route **************************/
const slideController = require("../controllers/slide.controller");
const slideUploadImg = require("../config/multer/slideMulter");
// add new
router.post("/slide/addnew", slideUploadImg, slideController.addNew);
// list slide
router.get("/slide/getall/:limit", slideController.getAll);
// getOne
router.get("/slide/getone", slideController.getOne);
// update
router.put("/slide/update", slideUploadImg, slideController.update);
// delete
router.delete("/slide/delete/:filename/:id", slideController.delete);
/******************************** Address route **************************/
const addressController = require("../controllers/address.controller");
/// get thanh pho
router.get("/address/tinhthanhpho", addressController.getThanhpho);
// get thanh pho by id
router.get("/address/tinhthanhphobyid/:id", addressController.getThanhphoById);
// get quan huyen
router.get("/address/quanhuyen/:id", addressController.getQuanhuyen);
// get quan huyen by id
router.get("/address/quanhuyenbyid/:id", addressController.getQuanhuyenById);
// get thi tran
router.get("/address/xaphuongthitran/:id", addressController.getThitran);
// get thi tran by id
router.get("/address/xaphuongthitranbyid/:id", addressController.getThitranById);

// get address
router.get("/address/getaddress/:id", addressController.getAddress);

// delete address
router.delete("/address/detele/:id", addressController.delete);

module.exports = router;
