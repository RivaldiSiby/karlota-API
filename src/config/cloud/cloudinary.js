const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const cloudinaryConfig = (req, res, next) => {
  cloudinary;
  console.log("cloudinary Connected");
  next();
};

module.exports = { cloudinaryConfig, cloudinary };
