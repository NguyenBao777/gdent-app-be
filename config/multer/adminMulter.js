// multer
const multer = require("multer");

const multerConfig = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "public/images/admin/");
	},
	filename: (req, file, callback) => {
		const ext = file.mimetype.split("/")[1];
		callback(null, `admin_profile_${Date.now()}.${ext}`);
	},
});
const isImage = (req, file, callback) => {
	if (file.mimetype.startsWith("image")) {
		callback(null, true);
	} else {
		callback(new Error("Only image is allowed"));
	}
};

const upload = multer({
	storage: multerConfig,
	fileFilter: isImage,
});
const uploadImage = upload.single("admin_profile");
module.exports = uploadImage;
