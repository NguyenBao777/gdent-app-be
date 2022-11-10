const multer = require("multer");
const upload = multer({
	dest: "public/images/admin",
});

exports.uploadImage = upload.single("photo");
