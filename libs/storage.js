var multer = require("multer");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let path = req.originalUrl;		
		cb(null, url(path));
	},
	filename: function (req, file, cb) {		
		cb(null, Date.now() + "-" + file.originalname);
	},
});

function url(path) {
	console.log(path)
	switch (true) {
		case path.includes("families"):
			return "public/images/families";
		case path.includes("materials"):
			return "public/images/materials";
		case path.includes("zones"):
			return "public/images/zones";		
		default:
			return "public/images";
			
	}
}

var upload = multer({ storage });

module.exports = upload;
