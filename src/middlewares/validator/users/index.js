const response = require("../../../helpers/response/response");
const { rulesUpdatePassword, rulesUpdateProfile } = require("./rules");

const usersValidator = {};

usersValidator.profile = (req, res, next) => {
  console.log(req.body);
  const result = rulesUpdateProfile.validate(req.body);
  if (result.error) {
    return response.error(res, 400, result.error.message);
  }
  console.log(result);
  next();
};
usersValidator.password = (req, res, next) => {
  const result = rulesUpdatePassword.validate(req.body);
  if (result.error) {
    return response.error(res, 400, result.error.message);
  }
  next();
};

module.exports = usersValidator;
