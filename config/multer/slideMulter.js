// multer
const multer = require("multer");

const multerConfig = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "public/images/slide/");
	},
	filename: (req, file, callback) => {
		const ext = file.mimetype.split("/")[1];
		callback(null, `slide_image_${Date.now()}.${ext}`);
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
const uploadImage = upload.single("slide_image");

module.exports = uploadImage;
