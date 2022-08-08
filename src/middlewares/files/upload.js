const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const ClientError = require("../../helpers/exceptions/ClientError");

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "karlota",
  },
});
const limit = {
  fileSize: 1e6,
};

const imgFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  const allowedExt = /jpg|jpeg|png|JPG|JPEG|PNG/;
  if (!allowedExt.test(ext)) {
    return cb(new ClientError("Image should be .jpg, .jpeg, or .png"), false);
  }
  cb(null, true);
};

const imgUpload = multer({
  storage: cloudStorage,
  limits: limit,
  fileFilter: imgFilter,
});

module.exports = imgUpload;
