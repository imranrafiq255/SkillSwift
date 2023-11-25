const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        fileExtension
    );
  },
});

const image = multer({ storage: storage });

module.exports = image;
