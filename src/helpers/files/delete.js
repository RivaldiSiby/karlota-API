const { cloudinary } = require("../../config/cloud/cloudinary");

const deleteFile = async (url) => {
  try {
    let path = url.split("/");
    await cloudinary.uploader.destroy(`karlota/${path[8].split(".")[0]}`);
    return;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = deleteFile;
