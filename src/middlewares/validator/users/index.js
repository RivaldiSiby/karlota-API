const deleteFile = require("../../../helpers/files/delete");
const response = require("../../../helpers/response/response");
const { rulesUpdatePassword, rulesUpdateProfile } = require("./rules");

const userValidator = {};

userValidator.profile = (req, res, next) => {
  const result = rulesUpdateProfile.validate(req.body);
  if (result.error) {
    const { file = null } = req;
    if (file !== null) {
      deleteFile(file.path);
    }
    return response.error(res, 400, result.error.message);
  }
  console.log(result);
  next();
};
userValidator.password = (req, res, next) => {
  const result = rulesUpdatePassword.validate(req.body);
  if (result.error) {
    return response.error(res, 400, result.error.message);
  }
  next();
};

module.exports = userValidator;
